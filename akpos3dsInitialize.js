import crypto from "crypto"

export default async function akpos3dsInitialize(orderId, amount,cardHolderName,cardNo,expireDate,cvv,order,TimeSpan,randomString) {
    try{
        const hash = await getHash(randomString, TimeSpan);
        console.log(hash,"hash");
        console.log(randomString,"random string");
        console.log(TimeSpan,"time span");



        console.log(`${process.env.AKPOS_URL}ThreeDPayment`);
        console.log(`${process.env.AKPOS_CLIENT_ID}`);
        console.log(`${process.env.AKPOS_USER}`);
        console.log(`${process.env.NEXT_PUBLIC_URL}/api/payment/callback`);
        
        const nonAsyncOne = await fetch(`${process.env.AKPOS_URL}ThreeDPayment`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                ClientId:process.env.AKPOS_CLIENT_ID,
                ApiUser:process.env.AKPOS_USER,
                Rnd:randomString,
                TimeSpan:TimeSpan,
                Hash:hash,
                CallbackUrl:`${process.env.NEXT_PUBLIC_URL}/api/payment/callback`,
                OrderId:orderId,
                Amount:amount,
                Currency:949,
                InstallmentCount:0,
                Description:"test",
            }),
        })
    
        const sessionRequest = await nonAsyncOne.json()

        console.log(sessionRequest); // <---- 3D Session Id geliyor success ile örnek response 
        /*
         {
    ThreeDSessionId:
      'P5E6317A97C8F40C1804BD62FB*******************************',
    TransactionId: '2***********',
    Code: 0,
    Message: 'Başarılı'
  } 
        */


        const threeDSessionId =sessionRequest.ThreeDSessionId;
        const formData = new FormData();
        formData.append("ThreeDSessionId",threeDSessionId);
        formData.append("CardHolderName",cardHolderName);
        formData.append("CardNo",cardNo);
        formData.append("ExpireDate",expireDate);
        formData.append("Cvv",cvv);
    
        const threeDPayment = await fetch(`${process.env.AKPOS_URL}ProcessCardForm`,{
            method:"POST",
            body:formData,
        })
        
       
        const responseClone = threeDPayment.clone();
        const response = await responseClone.text()
        console.log(response); // <---- Inputlar hidden geliyor 
        return {status:"success",threeDSHtmlContent:response}
    }
    catch(err){
        console.log(err)
        return {status:"error",message:"<h1>3D Secure işlemi başlatılamadı</h1>"}
    }


}

async function getHash(randomString, TimeSpan) {
    console.log(`${process.env.AKPOS_PASSWORD}${process.env.AKPOS_CLIENT_ID}${process.env.AKPOS_USER}${randomString}${TimeSpan}`);
    const sha512 =crypto.createHash('sha512');
    const hashInBytes = sha512.update(`${process.env.AKPOS_PASSWORD}${process.env.AKPOS_CLIENT_ID}${process.env.AKPOS_USER}${randomString}${TimeSpan}`,"utf-8").digest();
    const hash = hashInBytes.toString('base64');
    return hash;
}
