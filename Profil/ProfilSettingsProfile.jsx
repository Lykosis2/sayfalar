import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ofetch } from 'ofetch'
import { useRouter } from 'next/router'
import ProfilSettingsInput from '@/components/Profil/ProfilSettingsInput'
import Link from 'next/link'

export default function ProfilSettingsProfile({generalData }) {
  const email = generalData.email
  const phone = generalData.phoneNumber
  const router = useRouter()
  console.log(generalData);
  

 


  return (
        <>
            <div className="relative flex flex-col gap-2">
                
            </div>
            <ProfilSettingsInput isDisabled={true} title="E-Mail" type="mail"
                                 placeholder="Mail adresinizi giriniz" value={email} />
    <div className="flex  justify-center items-center flex-col lg:flex-row">
    <p>
      Şifrenizi sıfırlamak için müşteri hizmetleri ile iletişime geçin. 
    </p>

      <Link className="bg-blue-500 p-4 rounded-lg" href='/iletisim' >Müşteri Hizmetleri</Link>
    </div>
    <div className='flex gap-4 flex-col lg:flex-row items-center justify-center w-full'>

            <ProfilSettingsInput isDisabled={true} title="Sponsor Adresi" type="text"
                                 placeholder="Sponsor Adresi" value="Sponsor Adresi"/>
            <ProfilSettingsInput isDisabled={true} title="Telefon Numarası" type="tel"
                                 placeholder="Telefon Numaranızı Giriniz." value={phone} />
    </div>
    <div className='flex  justify-center items-center flex-col lg:flex-row'> 

    <p>
      Telefon numaranızı değiştirmek için müşteri hizmetleri ile iletişime geçin.
    </p>
      <Link className="bg-blue-500 p-4 rounded-lg" href='/iletisim' >Müşteri Hizmetleri</Link>
    </div>
        </>
  )
}