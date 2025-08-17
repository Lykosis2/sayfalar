import akpos3dsInitialize from "../../../lib/akpos3dsInitialize";
import informTheAdmin from "../../../lib/errorHandle/informTheAdmin";

export default async function handler(req,res){
    await akpos3dsInitialize(req.body.orderId,req.body.amount).then((data)=>{
        res.status(200).json(data)
    })
}