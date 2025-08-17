import React, { useState } from 'react'
import CartProfilSettingsCard from './CartProfilSettingsCard'
import XmarkIcon from '../icons/XmarkIcon'
import { useRouter } from 'next/router';


// TODO ADD MAKE IT SO ITS POSSIBLE TO 
export default function CreditCardComponent({setSelectedCard,selectedCard,session}) {
  const [showModal, setShowModal] = useState(false)
  console.log(selectedCard);
  const router = useRouter()
  return (
    <>
     <button className='min-w-[5rem] h-10 rounded-full bg-button-green ' onClick={() => {
      if(!session.data){router.push("/login"); return}
     setShowModal(true)
   }}>
            <span className='text-white text-xs' >
                Kart Ekle
            </span>

            </button>
{
    showModal

      ? <div className='absolute lg:min-w-[1000px] md:min-w-[500px] min-w-[350px] min-h-[625px] lg:right-1/4 top-1/4 md:max-h-[700px] max-h-[1200px] overflow-y-auto bg-white m-auto border border-black rounded-xl p-4'>
 <div className='w-8  h-8 border border-gray-600 rounded-full absolute top-4 right-4 text-button-red select-none cursor-pointer' onClick={() => {
          setShowModal(false)
        }}>
          <XmarkIcon/>

        </div>
  
        <CartProfilSettingsCard setSelectedCard={setSelectedCard} selectedCard={selectedCard} />
    </div>
      : null
}
    </>
  )
}
