import SaleAccountModel from '@/models/saleAccount'
import { getAllProducts } from '@/lib/admin/products'
import getServerSession from '@/lib/getServerSession'
import safeMemberDiscount from '@/lib/safeMemberDiscount'

export default async function handler(req, res) {
  const saleAccountModel = await SaleAccountModel()

  const session = await getServerSession(req, res)
  let isMember = false
  if (session) {
    const saleAccount = await saleAccountModel.findOne({ where: { owner_id: session?.payload?.id } })
    isMember = !!saleAccount
  }

  switch (req.method) {
    case 'GET':
      const allProducts = await getAllProducts()
      const parsedProducts = allProducts.map((p) => {
        return {
          ...p,
          price: isMember ? safeMemberDiscount(p.price) : p.price,
        }
      })
      
      console.log(parsedProducts, 'parsprod')
      return res.status(200).json({ products: parsedProducts })
    default:
      return res.status(405).end() // Method Not Allowed
  }
}
// // Works
// async function GET(req,res){
//     try{
//         const result = await Product.findAll();
//         res.status(200).json({products:result})
//     }
//     catch(error){
//         console.log(error);
//         res.status(500).json({error:"Internal Server Error"})
//     }
// }

// async function POST(req,res){
//     try{
//         const result = await Product.create(req.body);
//         res.status(200).json({product:result})
//     }
//     catch(error){
//         res.status(500).json({error:"Internal Server Error"})
//     }
// }
// async function PUT(req,res){
//     try{
//         //validate admin or return 401
//         const {id} = req.query;
//         const result = await Product.update(req.body,{where:{id}});
//         res.status(200).json({product:result})
//     }
//     catch(error){
//         res.status(500).json({error:"Internal Server Error"})
//     }
// }
// async function DELETE(req,res){
//     try{
//         //validate admin or return 401
//         const {id} = req.query;
//         const result = await Product.destroy({where:{id}});
//         res.status(200).json({product:result})
//     }
//     catch(error){
//         res.status(500).json({error:"Internal Server Error"})
//     }
// }
