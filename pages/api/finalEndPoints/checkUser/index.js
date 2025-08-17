import checkAndFixIfProblemInTree from "../../../../lib/errorHandle/CheckTree/checkAndFixIfProblemInTree"
import checkAndSolveProblems from "../../../../lib/errorHandle/CheckTree/checkAndSolveProblems"
import importantPanic from "../../../../lib/errorHandle/importantPanic"
import informTheAdmin from "../../../../lib/errorHandle/informTheAdmin"
import Invitation from "../../../../models/invitation"
import saleAccount from "../../../../models/saleAccount"
import Sponsors from "../../../../models/sponsors"
import User from "../../../../models/user"

const user = User()
const sponsors = Sponsors()
export default async function handler(req,res) {
    switch(req.method){
        case 'POST':
            await POST(req,res)
            break
        default:
            res.status(405).end()
            break
    }
}
async function POST(req,res) {
    const userAccount = await user.findOne({where:{id:req.body.id}})
    console.log(userAccount);
    const usersSponsors = await sponsors.findOne({where:{owner_id:req.body.id}})
    if(!userAccount){
        return res.status(400).json({message:'User not found'})
    }
    const ola = await checkAndSolveProblems(req.body.id)
    console.log(ola);
    return res.status(200).json({message:'done'})
}
