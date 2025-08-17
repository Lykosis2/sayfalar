import crypto from 'crypto'
export default async function akposCallbackHandle(req,order) {

    if(req.ClientId !== process.env.AKPOS_CLIENT_ID) return false
    if(req.BankResponseCode !== '00') return false
    if(req.RequestStatus !== '1' ) return false
    if(req.HashParameters !== 'ClientId,ApiUser,OrderId,MdStatus,BankResponseCode,BankResponseMessage,RequestStatus') return false
    const hashCorrect = await checkHashReal(req.Hash,order,req)
    if(!hashCorrect) return false

    return true
}


async function checkHashReal(hash,order,req){
    const sha512 =crypto.createHash('sha512');
    console.log(`${process.env.AKPOS_PASSWORD}${process.env.AKPOS_CLIENT_ID}${process.env.AKPOS_USER}${req.OrderId}${req.MdStatus}${req.BankResponseCode}${req.BankResponseMessage}${req.RequestStatus}`);
    const deneme = sha512.update(`${process.env.AKPOS_PASSWORD}${process.env.AKPOS_CLIENT_ID}${process.env.AKPOS_USER}${req.OrderId}${req.MdStatus}${req.BankResponseCode}${req.BankResponseMessage}${req.RequestStatus}`,"utf-8").digest('base64');
    const denemeInBytes = deneme.toString('base64');
    return hash === denemeInBytes;
}



async function checkHash(hash,order,req){
    console.log(`${process.env.AKPOS_PASSWORD}${process.env.AKPOS_CLIENT_ID}${process.env.AKPOS_USER}${order.randomString}${order.timeSpan}`);
    const sha512 =crypto.createHash('sha512');
    const deneme = sha512.update(`${process.env.AKPOS_CLIENT_ID}${process.env.AKPOS_USER}${order.id}${req.MdStatus}${req.BankResponseCode}${req.BankResponseMessage}${req.RequestStatus}`,"utf-8").digest('base64');
    const denemeInBytes = deneme.toString('base64');
    console.log(denemeInBytes);


    console.log(deneme);
    console.log(hash);
    return deneme === hash;
}