import React, { useState } from 'react'
import CartProfilSettingsAddresses from './CartProfilSettingsAdresses'
import { useRouter } from 'next/router'


// TODO ADD MAKE IT SO ITS POSSIBLE TO 
export default function NewAddAdressComponent({setSelectedAdress,selectedAdress,session}) {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  return (
    <>
   <button className='min-w-[5rem] h-10  rounded-full bg-button-green ' onClick={() => {
    console.log(session);
    if(!session.data) {router.push("/login");return}
     setShowModal(true)
   }}>
            <span className='text-white text-xs'>
                Adres Ekle
            </span>

            </button>
{
    showModal

      ? <div className='absolute lg:min-w-[1000px] md:min-w-[500px] min-w-[350px] min-h-[625px] lg:right-1/4 top-1/4 md:max-h-[700px] max-h-[1200px] overflow-y-auto bg-white m-auto border border-black rounded-xl p-4'>
        <CartProfilSettingsAddresses setShowModal={setShowModal} setSelectedAdress={setSelectedAdress} selectedAdress={selectedAdress} />
    </div>
      : null
}
    </>
  )
}
