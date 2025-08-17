import { getAdminSession } from "@/lib/admin/session"
import bulusmaTarihi from "@/models/bulusmaTarihleri"

export default async function handler(req, res) {  
    if(req.method === "OPTIONS") return res.status(204).end()

    switch (req.method) {
        case 'GET':
            await GET(req, res)
            break
        case 'POST':
            const post = await POST(req, res)
            console.log(post)
    }

}
async function GET(req,res){
    const bulusmaTarihis = await bulusmaTarihi()
    const allBulusmaTarihi = await bulusmaTarihis.findAll()
    const retunVal = []
    allBulusmaTarihi.forEach((bulusmaTarihi) => {
        retunVal.push(bulusmaTarihi.dataValues)
    })
    res.status(200).json({ bulusmaTarihi: retunVal })

}
async function POST(req,res){
    try{


        const session = await getAdminSession(req.headers.userid,req.headers.randomstr)
        console.log(session);
        if(!session) return res.status(401).end()
        const bulusmaTarihis = await bulusmaTarihi()
        let body = req.body
        if (typeof body === 'string') {
            try {
                body = JSON.parse(body)
            } catch (e) {
                return res.status(400).json({ error: 'Invalid JSON' })
            }
        }
        
        const {time,link,title,type} = body;
        console.log(time,link,title,type);
        const dateData = new Date(time)
        console.log(dateData);
        const createdBulusma = await bulusmaTarihis.create({time:dateData,link,title:title,type})
        console.log(createdBulusma);
        return res.status(201).json({message:"Bulusma kaydedildi",createdBulusma})
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }
}