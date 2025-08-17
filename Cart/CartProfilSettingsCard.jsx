import { useEffect, useState } from 'react'
import LeftArrowSmallIcon from '../icons/LeftArrowSmallIcon'
import CreditCard from '../Profil/CreditCardComponent'
import CreditCardBox from '../Profil/CreditCartBox'

export default function CartProfilSettingsCard({ setSelectedCard,selectedCard }) {

  const [addingCard, setAddingCard] = useState(false)
  const [cardNumber, setCardNumber] = useState('################')
  const [cardName, setCardName] = useState('Your Name')
  const [cardDate, setCardDate] = useState('##/##')
  const [cardCvv, setCardCvv] = useState('###')
  const [cardType, setCardType] = useState(0)
  const [deleted, setDeleted] = useState(false)
   


  async function addCard() {
    const expireMonth = cardDate.split('/')[0]
    const expireYear = cardDate.split('/')[1]
console.log(cardNumber);  
    if(cardNumber.includes("#") || cardName.includes("#") || expireMonth.includes("#") || expireYear.includes("#")|| cardCvv.includes("#")){
      alert("Lütfen kart bilgilerinizi kontrol ediniz.")
      return
    }

    setSelectedCard({
      cardNo: cardNumber,
      cardUserName: cardName,
      cardEndDate: `${expireMonth}/${expireYear}`,
      cardCvc: cardCvv
    })
    setAddingCard(false)
  }

  async function deleteCard() {
      setSelectedCard(e=>{
        return{
        cardNo: "",
        cardUserName: "",
        cardEndDate: "",
        cardCvc: ""
      }})
      setDeleted(true)
  }
  useEffect(() => {
    if(deleted){
      setDeleted(false)
    }
    setSelectedCard(e=>{
      return{
      cardNo: "",
      cardUserName: "",
      cardEndDate: "",
      cardCvc: ""
    }})
  }
  , [deleted])



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

<div className='w-full h-full flex gap-5 flex-wrap'>
                        <div
            className="flex p-5 flex-col h-fit gap-3 w-full md:w-[45%] min-h-[150px] border border-black rounded-lg text-center items-center">
                <h2 className="text-xl font-semibold">
                    Kart Ekle
                </h2>
              <button className="bg-button-green rounded-lg px-3 w-24 text-white py-2 mx-auto" onClick={() => setAddingCard(true)}>Ekle</button>

            </div>
            



             {
               console.log(selectedCard)
             }
             <>
             {
              (!selectedCard.cardNo && !selectedCard.cardUserName && !selectedCard.cardEndDate && !selectedCard.cardCvc ) ?  <></> :
            <div  className={`border-4 ${(!selectedCard.cardNo && !selectedCard.cardUserName && !selectedCard.cardEndDate && !selectedCard.cardCvc ) ? "":"border-orange-500" } rounded-xl cursor-pointer`} >
              <CreditCardBox card={selectedCard} deleteCard={() => deleteCard()} />
            </div>
             }
            </>

            </div>

            </>
        }

        </>
  )
}
