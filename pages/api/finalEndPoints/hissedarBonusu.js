import hissedarBonusu from "@/models/hissedarBonusu"

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
        const get =await  GET(req, res)
        return get
        default:
        res.status(405).end() // Method Not Allowed

    }
}
async function GET(req, res) {
    const hissedarBonusuModel = hissedarBonusu()
    const returnHissedarBonusu = await hissedarBonusuModel.findOne({where:{id:1}})
    return res.status(200).json({value:returnHissedarBonusu.this_months_money})
}
