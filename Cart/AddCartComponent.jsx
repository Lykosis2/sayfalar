import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import CreditCard from '../Profil/CreditCardComponent'
import { ofetch } from 'ofetch'

function AddCardComponent() {
  const [cardNumber, setCardNumber] = useState('################')
  const [cardName, setCardName] = useState('Your Name')
  const [cardDate, setCardDate] = useState('##/##')
  const [cardCvv, setCardCvv] = useState('###')
  const [cardType, setCardType] = useState(0)

  async function addCard() {
    await ofetch('/api/user/card', {
      method: 'POST',
      body: JSON.stringify({
        cardAlias: 'Kart 1',
        cardHolderName: cardName,
        cardNumber: cardNumber,
        expireMonth: cardDate.split('/')[0],
        expireYear: cardDate.split('/')[1],
      })
    })
  }

  return (
        <Dialog.Root>
          <Dialog.Trigger asChild>
          <button onClick={addCard} className='min-w-[7rem] h-12 rounded-full bg-button-green '>
            <span className='text-white'>
                Kart Ekle
            </span>

            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="" />
            <Dialog.Content className="bg-white rounded-3xl shadow-sm border-2 shadow-gray-600 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[90vh] max-w-[800px] h-[600px] animateAdress focus:outline-none" >
              <Dialog.Title className="m-0 text-3xl text-primary text-center mt-8 font-bold">Kart Ekle</Dialog.Title>
              <div className='w-full h-full flex justify-center items-start mt-6'>

              <CreditCard cardNumber={cardNumber} cardName={cardName} cardDate={cardDate} cardCvv={cardCvv} cardType={cardType} setCardNumber={setCardNumber} setCardName={setCardName} setCardDate={setCardDate} setCardCvv={setCardCvv} setCardType={setCardType} />
              </div>

              <Dialog.Close asChild>
                <button className="IconButton" aria-label="Close">
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
  )
}

export default AddCardComponent
