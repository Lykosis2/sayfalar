import React, { useContext, useEffect, useState } from 'react'
import MembershipLayout from '@/components/layout/MembershipLayout'
import Map from '@/components/Profile/Map'
import turnRealTitleIntegerToString from '@/lib/turnRealTitleIntegerToString'
import { SharedContext } from '@/components/layout/AgacDataSharer'
import CopyIcon from '../../components/icons/CopyIcon'
import TickIcon from '../../components/icons/TickIcon'

export default function Uyeleriniz() {
  const [uyeler, setUyeler] = useState([])
  const [isCopied,setIsCopied] = useState(false)
  const{mapData,session} = useContext(SharedContext)
  console.log(session);

  useEffect(() => {
    if (!mapData)
      return
    let maxLength = 100
    if (Object.keys(mapData).length <= 100)
      maxLength = Object.keys(mapData).length
    console.log(mapData)
    const data = []
    for (let i = 0; i < maxLength; i++) {
      data.push({
        id: i + 1,
        name: mapData[i.toString()].name,
        rank: turnRealTitleIntegerToString(mapData[i.toString()].real_title),
      })
    }

    setUyeler(data)
  }, [mapData])

  return (
        <MembershipLayout navbarText={'Üyeleriniz'}>
          <div className='flex flex-col w-full h-full'>
              <div className="w-full h-[20%] flex justify-center items-center text-white bg-primary rounded-t-xl ">
                  <h1 className="text-2xl font-semibold text-white mt-1">Referans Numaranız: {session?.data?.user?.referenceNumber} </h1>
                  <div className='border rounded-md ml-1 p-1 mt-1 cursor-pointer select-none transition-all'onClick={async()=>{
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

                  }} >
                     {
                      isCopied ? <TickIcon/> : <CopyIcon/>
                     }
                  </div>
              </div>
              <div className='flex w-full h-full lg:flex-row flex-col gap-4 lg:gap-0    '>
                <div className="w-full lg:w-[30%] lg:max-h-[725px] max-h-[350px] lg:h-full items-center px-5 py-2 flex gap-2 flex-col bg-primary rounded-bl-lg ">
                    <h2 className="text-2xl text-white font-semibold">Üyeler</h2>

                    <div className="flex flex-col gap-3 overflow-y-auto items-center w-full">
                        {uyeler.map((uye, index) => (
                            <button className="w-[95%] hover:bg-[#D3D3D3] transition-colors bg-white min-h-[50px] max-h-[50px] drop-shadow-lg text-xl flex justify-between items-center px-5 rounded-2xl" key={index}>
                                <span>{uye.id}.</span>
                                <span>{uye.name}</span>
                                <span>{uye.rank}</span>

                            </button>
                        ))}
                    </div>
                </div>
                <div className="w-full lg:w-[70%] h-full min-h-[600px] gap-5 bg-primary rounded-br-lg items-center px-5 py-2 flex flex-col">
                    <h2 className="text-3xl text-white font-semibold">Harita</h2>
                    <div className="w-full h-full rounded-xl">
                        <Map mapData={mapData} />
                    </div>
                </div>

              </div>

          </div>
        </MembershipLayout>
  )
}
