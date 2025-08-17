import flagedBehavior from "../../../../lib/flagedBehavior"
import flagedBehaviorForAll from "../../../../lib/flagedBehaviorForAll"
import getImportantPanic from "../../../../lib/getImportantPanic"

export default function handler(req, res) {
    switch (req.method) {
        case 'POST':
        const post = POST(req, res)
        break
        default:
        res.status(405).end() // Method Not Allowed
    }
    }
async function POST(req, res) {
    const start = Date.now()
    const nowUTC = new Date(); 
    const inImportantPanic =await getImportantPanic()
    console.log(inImportantPanic);
    if(inImportantPanic) return res.status(400).json({ message: 'Refunds are closed' })
    const nowUTCPlus3 = new Date(nowUTC.getTime() + (3 * 60 * 60 * 1000));
    console.log(nowUTCPlus3)
    const hoursUTCPlus3 = nowUTCPlus3.getUTCHours();
    const isBetween2And3UTCPlus3 = hoursUTCPlus3 >= 2 && hoursUTCPlus3 < 3;
    console.log(isBetween2And3UTCPlus3)
    if(isBetween2And3UTCPlus3){
        return res.status(400).json({ message: 'Refunds are closed' })
    }
        // cumartesileri 3.30 4.30 arası 

        // 27lerinde 23.45 28 06.00 arasında reddet 

    flagedBehaviorForAll().then((result) => {
        const end = Date.now()
        console.log(end - start)
        return res.status(200).json({message:"All flaged behavior is done"})
    })
    

}
