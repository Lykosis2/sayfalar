import React, { useContext, useEffect, useState } from 'react'
import { ofetch } from 'ofetch'
import { SharedContext } from '../layout/AgacDataSharer'
import Item from './Item'

function KanbanBoard() {
  const { changeableUsers,session } = useContext(SharedContext)
  console.log(changeableUsers)
  if (Object.keys(changeableUsers).length <= 0)
    return <div className='flex w-full h-full justify-center items-center text-3xl font-bold'>
    Değişebilir kimse yok
    </div>
  const [uzunLimit, setUzunLimit] = useState(changeableUsers.bigSide)
  const [kisaLimit, setKisaLimit] = useState(changeableUsers.smallSide)
  const [uzunAgac, setUzunAgac] = useState(changeableUsers.bigSideChangeables)
  const [kisaAgac, setKisaAgac] = useState(changeableUsers.shortSideChangeables)
  const [changed, setChanged] = useState([])
  const [showError, setShowError] = useState(false)
  const errorMessageRef = React.useRef(null)

  useEffect(() => {
    console.log(uzunLimit)
    console.log(kisaLimit)
  }
  , [uzunLimit, kisaLimit])
  useEffect(() => {
    console.log(uzunAgac)
    console.log(kisaAgac)
  }
  , [uzunAgac, kisaAgac])
  useEffect(() => {
    console.log(showError)
    if (showError) {
      if (errorMessageRef.current) {
        errorMessageRef.current.style.display = 'block' // Show the error message
        errorMessageRef.current.classList.add('shake-animation-error-message-of-adress-component') // Apply the shake animation

        const interval = setTimeout(() => {
          if (errorMessageRef.current) {
            errorMessageRef.current.style.display = 'none'
            // Hide the error message after 5 seconds
            errorMessageRef.current.classList.remove('shake-animation-error-message-of-adress-component')
          }
        }, 2000)
      }
    }
    setShowError(false)
  }
  , [showError])

  useEffect(() => {
    console.log(changed)
  }
  , [changed])

  console.log(uzunAgac)
  return (
    <>
    <div className='w-full h-screen flex justify-center items-center relative -translate-y-4' >
      <div className='absolute hidden top-5 text-red-600' ref={errorMessageRef}>
        Hata Limitiniz 0&apos;ın altına düşemez.
      </div>
        <div className='w-full h-[600px]  rounded-xl flex gap-2'>
            <div className='flex w-1/2 h-full bg-custom-gray pb-2 flex-col rounded-xl'>
                <span className='w-full h-12 text-lg flex justify-evenly font-bold  items-center '>
                    <span className=''>

                    Uzun ağaç
                    </span>
                    <span>
                        Limit: {uzunLimit}
                    </span>
                </span>
                <div className='w-full h-full flex flex-col gap-4 py-2 px-4 overflow-auto tree-container overflow-x-hidden'>
                    {
                        console.log(uzunAgac)
                    }
                    {
                        uzunAgac.map((item, index) => {
                          return <Item key={`${index}uzuasd`} item={item} setKisaLimit={setKisaLimit} setUzunLimit={setUzunLimit} setUzunAgac={setUzunAgac} setKisaAgac={setKisaAgac} agacTipi={1} limit={kisaLimit} setShowError={setShowError} setChanged={setChanged} changed={changed} />
                        })
                    }

                </div>

            </div>
            <div className='flex w-1/2 h-full flex-col rounded-xl pb-2 bg-custom-gray '>
                <span className='w-full h-12 text-lg flex justify-evenly font-bold items-center '>
                    <span>

                    Kısa ağaç
                    </span>
                    <span>
                        Limit: {kisaLimit}
                    </span>
                </span>
                <div className='w-full h-full flex flex-col gap-4 py-2 px-4 overflow-auto tree-container overflow-x-hidden'>
                    {
                        kisaAgac.map((item, index) => {
                          return <Item key={`${index}kisa`} item={item} setKisaLimit={setKisaLimit} setUzunLimit={setUzunLimit} setUzunAgac={setUzunAgac} setKisaAgac={setKisaAgac} agacTipi={2} limit={uzunLimit} setShowError={setShowError} setChanged={setChanged} changed={changed} />
                        })
                    }

                </div>

            </div>

        </div>
    </div>
    <button className={`w-24 h-8 rounded-xl ${changed.length > 0 ? 'bg-primary ' : 'bg-gray-400 '} border-black  absolute bottom-1 right-1/2 translate-x-12 `}
    onClick={async () => {
      console.log(session)
      const res = await ofetch('/api/finalEndPoints/uye/changeTreePositions', {
        method: 'PUT',
        body: {
          sale_account_id: session.data.user.saleAccountId,
          changed,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(res)
      console.log(res.status)
      if (res.message === 'success')
        alert('Değiştirme başarılı')

      else
        alert('Değiştirme başarısız')
    }}

    >
Değiştir
    </button>
    </>

  )
}

export default KanbanBoard
