import order from '@/models/order'

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await GET(req, res)
  }
}
async function GET(req, res) {
  const { id } = req.query
  console.log(id)
  const Orders = await order()

  // const session = await getServerSession(req,res);
  // console.log(session);

  // if (!session) {
  //     res.status(401).json({ message: 'Unauthorized' });
  //     return;
  // }
  // if(session.user.id !== id){
  //     res.status(401).json({ message: 'Unauthorized' });
  //     return;
  // }
  const orders = await Orders.findAll({ where: { owner_id: id[0] } }).catch((err) => {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  })
  const returnVal = []
  orders.forEach((order) => {
    const dataValues = {...order.dataValues}
    delete dataValues.timeSpan
    delete dataValues.randomString
    returnVal.push(dataValues)
  })
  console.log(returnVal);
  return res.status(200).json({ orders: returnVal })
}
