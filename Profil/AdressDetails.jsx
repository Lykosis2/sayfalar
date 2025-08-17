'use client'
import React, { useEffect, useState } from 'react'

export default function AdressDetails() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [width, setWidth] = useState('48')
  const [height, setHeight] = useState('48')
  const [openAddCard, setOpenAddCard] = useState(false)
  const [allCards, setAllCards] = useState({})



  const handleButtonClick = () => {
    setIsFlipped(!isFlipped)

    if (isFlipped) {
      setWidth('48')
      setHeight('48')
    }
    else {
      setWidth('full')
      setHeight('full')
    }
  }

  return (
        <div
            className={`flip-card-component ${isFlipped ? 'flipped' : ''} w-${width} h-${height}`}

        >
            <div className="flip-card-component-inner">
                <div className="flip-card-component-front">
                    <div className={'w-full h-full rounded-2xl bg-white border border-gray-400 shadow-lg justify-center items-center cursor-pointer select-none'} onClick={handleButtonClick}>
                        <div className='w-full h-full flex justify-center items-center flex-col'>

                            <div className='w-full h-20 flex justify-center '>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 items-center">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                                </svg>

                            </div>
                            <span className='font-serif text-lg w-full flex justify-center  '>

          Adres Detayları
                            </span>
                        </div>

                    </div>
                </div>
                <div className="flip-card-component-back ">
                    <div className=' absolute left-0 top-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer select-none' onClick={() => {
                      if (openAddCard)
                        setOpenAddCard(false)

                      else
                        handleButtonClick()
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>

                    </div>
                    <div className={`${openAddCard ? '' : 'hidden'} w-full h-full flex justify-center items-center flex-col`}>

                    </div>
                    <div className='flex gap-4 ml-8 mt-6'>

                        <div className={`${openAddCard ? 'hidden' : ''}`}>

                            <div className='w-48 h-48 flex justify-center items-center flex-col rounded-xl bg-white border-2 border-gray-400 ' onClick={() => {
                              setOpenAddCard(true)
                            }}>

                                <div className='w-full h-20 flex justify-center relative'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" color='blue' />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute bottom-4 right-16">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" color='blue'/>
                                    </svg>

                                </div>
                                <span className='font-serif text-lg w-full flex justify-center text-blue-400'>

  Kredi Kartı Ekle
                                </span>
                            </div>
                        </div>

                        {

                        }
                        <div className={`${openAddCard ? 'hidden' : ''} flex gap-4`}>

                            {
                                Object.keys(allCards).map((key) => {
                                  return (
                                        <div className='w-48 h-48 flex justify-center items-center flex-col rounded-xl bg-white border-2 border-gray-400 relative' key={key} >
                                            <div className='w-5 h-5 rounded-full bg-red-600 absolute -top-2 -right-2 cursor-pointer' onClick={() => {
                                              // delete code here
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                                </svg>

                                            </div>

                                            <div className='w-full h-20 flex justify-center relative'>

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 ">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" color='blue' />
                                                </svg>

                                            </div>
                                            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png' className='w-12 h-12 absolute top-8 right-2'>
                                            </img>
                                            <span className='font-serif text-sm w-full flex justify-center text-blue-400  '>

                                                {
                                                    allCards[key].name
                                                }
   &nbsp;ile biten kart
                                            </span>
                                        </div>
                                  )
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>

        </div>
  )
}
