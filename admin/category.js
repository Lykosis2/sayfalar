import CategoryModel from '@/models/category'
import CategoryProductModel from '@/models/category-product'
import minioClient from '@/lib/providers/minio'

const categoryModel = CategoryModel()
const categoryProductModel = CategoryProductModel()

/**
  * @returns {Promise<Array>}
*/
export function getAllCategories() {
  return categoryModel.findAll()
}

/**
  * @typedef {Object} CreateCategoryOpts
  * @property {string} name
  * @property {Object} attributes
*/

/**
  * @param {CreateCategoryOpts} createCategoryOpts
*/
export function createCategory(createCategoryOpts) {
  return categoryModel.create(createCategoryOpts)
}

/**
  * @param {number} id
  * @param {Partial<CreateCategoryOpts>} updateCategoryOpts
*/
export function updateCategory(id, updateCategoryOpts) {
  return categoryModel.update(updateCategoryOpts, { where: { id } })
}

/**
  * @param {number} id
  * @returns {Promise<CategoryModel>}
*/
export function getCategoryById(id) {
  return categoryModel.findOne({ where: { id } })
}

/**
  * @param {number} id
  * @returns {Promise<CategoryModel>}
*/
export async function deleteCategory(id) {
  await categoryProductModel.destroy({ where: { category_id: id } })
  return categoryModel.destroy({ where: { id } })
}

/**
  * @property {number} category_id
  * @property {number} product_id
*/
export async function addCategoryToProduct(category_id, product_id) {
  const alreadyExist = await categoryProductModel.findOne({ where: { category_id, product_id } })
  if (alreadyExist) return
  return categoryProductModel.create({ category_id, product_id })
}

/**
  * @param {number} category_id
  * @param {number} product_id
*/
export async function removeCategoryFromProduct(category_id, product_id) {
  return await categoryProductModel.destroy({ where: { category_id, product_id } })
}

export function removeAllCategoriesFromProduct(product_id) {
  return categoryProductModel.destroy({ where: { product_id } })
}

/**
  * @param {number} product_id
*/
export function getCategoriesByProductId(product_id) {
  return categoryProductModel.findAll({ where: { product_id } }).catch(e => console.log(e))
}

/**
  * @param {number} category_id
*/
export function getProductsByCategoryId(category_id) {
  return categoryProductModel.findAll({ where: { category_id } })
}

// --- minIO/S3 section ---

/**
  * @param {number} id
*/
export async function uploadCategoryImage(file, id, mimetype) {
  return minioClient.fPutObject(process.env.MINIO_BUCKET_PUBLIC, `categories/${id}`, file, {
    "Content-Type": mimetype,
  })
}
