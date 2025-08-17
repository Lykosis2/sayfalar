import React from 'react'
import Map from '../staticGoogleMap'
import StaticInfos from './StaticInfos'

export default function MainComponent() {
  return (
    <main className='w-full flex lg:px-14 lg:h-[calc(100vh-11rem)] h-screen translate-y-0 lg:-translate-y-0 '>
        <div className='w-full h-full  flex lg:flex-row flex-col'>
        <div className='flex lg:w-1/2 w-full lg:h-full h-1/2 lg:p-12 pt-2 px-2'>
        <Map/>
        </div>
        <div className='flex lg:w-1/2 w-full lg:h-full h-1/2 lg:p-12 pt-2 px-2'>

<StaticInfos/>
        </div>

        </div>
    </main>
  )
}
