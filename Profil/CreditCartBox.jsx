import React from 'react'

export default function CreditCardBox({ card, deleteCard }) {
    if(!card)return
    if(!card.cardNo && !card.cardUserName && !card.cardEndDate && !card.cardCvc ) return
  return (
    <div
                className="flex p-5 flex-col gap-3 w-full h-full border border-black rounded-lg text-center">
                <h3>{card.cardAlias}</h3>
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <div className="flex flex-col lg:flex-row">
                            <p className="font-semibold">Kart Numarası: </p>
                            <p className="ml-2">{ card.cardNo.substring(0,6) }##########</p>
                        </div>
                        <div className="flex flex-col lg:flex-row">
                            <p className="font-semibold">Kartın ismi: </p>
                            <p className="ml-2">{  card.cardUserName}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-end items-center">
                        <button onClick={deleteCard}
                            className="bg-custom-button-red text-white rounded-lg px-3 py-2">Kaldır
                        </button>
                    </div>
                </div>
            </div>
  )
}
