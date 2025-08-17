import categoryProduct from "../../../models/category-product"

const categoryProductModel = categoryProduct()
export default async function handler(req, res) {
  if(req.method === 'GET'){
    const all = await categoryProductModel.findAll()
    const parsedInfo = all.map(item => item.dataValues)
    res.status(200).json({ connectedCategories:parsedInfo })
  }
  else{
    res.status(405).end() // Method Not Allowed
  }
}