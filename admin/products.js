import ProductModel from '@/models/product'
import minioClient from '@/lib/providers/minio'
import { addCategoryToProduct, getCategoriesByProductId, getCategoryById, removeAllCategoriesFromProduct, removeCategoryFromProduct } from '@/lib/admin/category'
import CategoryProductModel from '@/models/category-product'

// --- Database section ---

const productModel = ProductModel()
const categoryProductModel = CategoryProductModel()

/**
  * @returns {Array} products
*/
export async function getAllProducts() {
  try{

    const products = await productModel.findAll()
    const categoryProducts = await categoryProductModel.findAll()
  
    const linkedProducts = products.map(({ dataValues: product }) => {
      const categories = categoryProducts.filter(({ dataValues: categoryProduct }) => categoryProduct.product_id === product.id).map(({ dataValues: categoryProduct }) => categoryProduct.category_id)
  
      return {
        ...product,
        categories,
      }
    })
  
    return linkedProducts
  }
  catch(error){
    console.log(error);
  }
  
}

/**
 * @param {number} id
 * @returns {Object} product
 */
export async function getProductById(id) {
  const product = await productModel.findOne({
    where: {
      id,
    },
  })
  const categories = await getCategoriesByProductId(id)
  return {
    ...product,
    categories,
  }
}

/**
  * @typedef {Object} ProductCreateOpts
  * @property {string} name
  * @property {string} description
  * @property {number} price
  * @property {number} ratio
  * @property {number} stock
  * @property {string} video
  * @property {number} stars
  * @property {number} popularity
  * @property {number} gender
  * @property {string} size
  * @property {Array} categoryIds
  * @property {Array} attributes
  * @property {Array} comments
*/

/**
  * @param {ProductCreateOpts} productCreateOpts
  *
  * @returns {Object} createdProduct
*/
export async function createProduct(productCreateOpts) {
  const point1 = productCreateOpts.price / 13
  const categories = []
  for (const categoryId of productCreateOpts.categoryIds) {
    const category = await getCategoryById(categoryId)
    if (!category)
      throw new Error('Category not found')
    categories.push(category)
  }

  const createdProduct = await productModel.create({
    ...productCreateOpts,
    point1,
    point2: 0,
    point3: 0,
  })

  for (const category of categories)
    await addCategoryToProduct(category.id, createdProduct.id)

  return createdProduct
}

/**
  * @typedef {Object} ProductUpdateOpts
  * @property {string} name
  * @property {string} description
  * @property {number} price
  * @property {number} ratio
  * @property {number} stock
  * @property {string} video
  * @property {number} stars
  * @property {number} popularity
  * @property {number} gender
  * @property {string} size
  * @property {Array} categoryIds
  * @property {Array} attributes
  * @property {Array} comments
*/

/**
  * @param {number} id
  * @param {ProductUpdateOpts} productUpdateOpts
  * @returns {Object} updatedProduct
*/
export async function updateProduct(id, productUpdateOpts) {
  if (productUpdateOpts.categoryIds) {

    const existingCategories = await categoryProductModel.findAll({
      where:{
        product_id: id
      }
    })
    const allIds = existingCategories.map(category => category.dataValues.category_id)
    
    let newOnes = [];
    let deleteList = [];
    
    productUpdateOpts.categoryIds.forEach(id => {
      if (!allIds.includes(id)) {
        newOnes.push(id);
      }
    });
    
    allIds.forEach(id => {
      if (!productUpdateOpts.categoryIds.includes(id)) {
        deleteList.push(id);
      }
    });
    console.log(newOnes, deleteList);
    await Promise.all(newOnes.map(async categoryId => await addCategoryToProduct(categoryId , id)))
    console.log(id);
    console.log(deleteList);
    
    await Promise.all(deleteList.map(async categoryId => await removeCategoryFromProduct(categoryId  , id)))
    
  }

  const price = productUpdateOpts.price ?? (await getProductById(id)).price

  let point1
  if (productUpdateOpts.ratio || productUpdateOpts.price)
    point1 = price / 13

  const updatedProduct = await productModel.update({
    ...productUpdateOpts,
    point1,
  }, {
    where: {
      id,
    },
  })
  return updatedProduct
}

/**
  * @param {number} id
*/
export async function deleteProduct(id) {
  const number = await productModel.destroy({
    where: {
      id,
    },
  })
  await removeAllCategoriesFromProduct(id)
  return number
}

// --- minIO/S3 section ---

/**
  * @param {number} id
*/
export async function uploadProductImage(file, id, mimetype) {
  return minioClient.fPutObject(process.env.MINIO_BUCKET_PUBLIC, `products/${id}`, file, {
    "Content-Type": mimetype,
  })
}

/**
  * @param {number} id
  * @returns {Object} product
*/
export function getProductImage(id) {
  return minioClient.getObject(process.env.MINIO_BUCKET_PUBLIC, `products/${id}`)
}

/**
  * @param {number} id
*/
export async function uploadProductPDF(file, id) {
  return minioClient.fPutObject(process.env.MINIO_BUCKET_PUBLIC, `products/pdf/${id}.pdf`, file, {
    "Content-Type": 'application/pdf',
  })
}

/**
  * @param {import('next').NextApiRequest} req
  * @param {import('next').NextApiResponse} res
  * @returns {Promise<void>}
*/
export async function sendProductImage(req, res) {
  // Extract the product ID from the request (e.g., from query or params)
  const id = req.query.id

  if (!id) {
    res.status(400).send('Product ID is required.')
    return
  }

  try {
    const imageBuffer = await getProductImage(id)

    res.setHeader('Content-Type', 'image/jpeg')
    res.end(imageBuffer, 'binary')
  }
  catch (error) {
    // Handle error (e.g., image not found or server error)
    console.error('Failed to retrieve product image:', error)
    res.status(500).send('Failed to retrieve product image.')
  }
}
