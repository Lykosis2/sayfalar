import { useContext, useEffect, useState } from 'react'
import { ofetch } from 'ofetch'
import LeftArrowSmallIcon from '../icons/LeftArrowSmallIcon'
import CreditCard from './CreditCardComponent'
import CreditCardBox from './CreditCartBox'
import { SharedContext } from '../layout/AgacDataSharer'

export default function ProfilSettingsCards({ cards,setCards }) {
  const [addingCard, setAddingCard] = useState(false)

  const [cardNumber, setCardNumber] = useState('################')
  const [cardName, setCardName] = useState('Your Name')
  const [cardDate, setCardDate] = useState('##/##')
  const [cardCvv, setCardCvv] = useState('###')
  const [cardType, setCardType] = useState(0)


  async function addCard() {
    await ofetch('/api/finalEndPoints/user/card', {
      method: 'POST',
      body: JSON.stringify({
        cardAlias: `Kart ${cards.length + 1}`,
        cardHolderName: cardName,
        cardNumber,
        expireMonth: cardDate.split('/')[0],
        expireYear: cardDate.split('/')[1],
      }),
    })
    setAddingCard(false)
    refreshCards()
  }

  async function deleteCard(id) {
    await ofetch('/api/finalEndPoints/user/card', {
      method: 'DELETE',
      query: { id },
    })
    refreshCards()
  }

  async function refreshCards() {
    ofetch('/api/finalEndPoints/user/card').then((cards) => {
      console.log('cards', cards)
      setCards(cards)
    })
  }


  return (
        <>
        {
            addingCard
              ? <div className="m-auto">
                <button className="w-6 h-6 rounded-full border border-black absolute left-0 -top-8 flex items-center justify-center" onClick={() => setAddingCard(false)}>
                    <LeftArrowSmallIcon/>
                </button>
                <CreditCard cardNumber={cardNumber} cardName={cardName} cardDate={cardDate} cardCvv={cardCvv} cardType={cardType} setCardNumber={setCardNumber} setCardName={setCardName} setCardDate={setCardDate} setCardCvv={setCardCvv} setCardType={setCardType} addCard={addCard} />
            </div>
              : <>

                        <div
            className="flex p-5 flex-col h-fit gap-3 w-full md:w-[45%] min-h-[150px] border border-black rounded-lg text-center items-center">
                <h2 className="text-xl font-semibold">
                    Kart Ekle
                </h2>
              <button className="bg-button-green rounded-lg px-3 w-24 text-white py-2 mx-auto" onClick={() => setAddingCard(true)}>Ekle</button>

            </div>
            {cards.map(card => <CreditCardBox card={card} deleteCard={() => deleteCard(card.id)} />)}
            </>
        }

        </>
  )
}
