import { CopyIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import TickIcon from "../icons/TickIcon";
import { useState } from "react";

export default function ProfilSettingsMembership({ session }) {
  const router = useRouter()
  const [isCopied, setIsCopied] =useState(false);
  if(!session?.data?.user) return <div className="flex flex-col w-full h-full justify-center items-center gap-10">
    Giriş Yapınız...
  </div>
  if(!session.data.user.has_saleAccount) return <div className="flex flex-col w-full h-full justify-center items-center gap-10">
  <h1 className="text-3xl font-semibold">Henüz Üye Değilsiniz</h1>
  <button
      className="bg-button-green text-white text-lg rounded-lg px-5 py-2 w-60" onClick={()=>router.push("/uye")}>Üye Ol
  </button>
</div>
  return (
        <>
            {
               <>
      <label>
        Iban
      </label>
      <div className="flex items-center w-full">
        <input
          type="text"
          name="iban"
          className="border-2 border-gray-200 rounded-lg w-full px-5 py-2 mr-2"
          disabled
          value={session.data.user.iban}
        />
      </div>

      <label>
        Referans Kodunuz
      </label>
      <div className="flex items-center w-full">
        <input
          type="text"
          name="sponsor_code"
          className="border-2 border-gray-200 rounded-lg w-full px-5 py-2 mr-2"
          disabled
          value={session.data.user.referenceNumber}
        />
        <button onClick={async()=>{
                    try{

                      await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/register?sponsorId=${session?.data?.user?.referenceNumber}`)
                      setIsCopied(true);

                      setTimeout(() => {
                          setIsCopied(false);
                      }, 4000); // 4 seconds delay
          
                    }
                    catch(err){
                      console.log(err);
                    }

                  }}>
                    {isCopied ? <TickIcon /> : <CopyIcon />}
        </button>
      </div>
      <div>
        Ibanınızı değiştirmek istiyorsanız müsteri hizmetlerimizle iletişime geçiniz.
      </div>



                </>
            
            }
        </>
  )
}
