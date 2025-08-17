import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import ReorderComponent from './ReorderComponent'

export default function ReOrderFullPageComponent() {
  return (
<Swiper
spaceBetween={50}
slidesPerView={1}
navigation={true}
modules={[Navigation]}
breakpoints={{
  400: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  680: {
    slidesPerView: 2,
    spaceBetween: 10,

  },
  1340: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
}}
className='w-full h-full translate-y-[10%]'
>
  <SwiperSlide>
    <div className='h-[80%] w-full bg-white rounded-xl'>
  <span className='text-xl font-serif w-full h-12 justify-center items-center flex '>
    Popüler Siparişler
  </span>
  <div className='w-full h-[calc(100%-3rem)] flex items-center'>

  <div className='h-full w-full bg-red-500 flex  items-center gap-4 flex-col'>
    <ReorderComponent
    title={'Lykosis Cilt Kremi'}
    explain={'Yumuşak ve hassas ciltler için ideal'}
    id={1234}
    />
    <div className=' h-24 rounded-xl w-[90%] bg-white'>

</div>
<div className=' h-24 rounded-xl w-[90%] bg-white'>

</div>
<div className=' h-24 rounded-xl w-[90%] bg-white'>

</div>
<div className=' h-24 rounded-xl w-[90%] bg-white'>

</div>
<div className=' h-24 rounded-xl w-[90%] bg-white'>

</div>

  </div>
  </div>

</div>
  </SwiperSlide>
   <SwiperSlide>
    <div className='h-[80%] w-full bg-white rounded-xl'>
  <span className='text-xl font-serif w-full h-12 justify-center items-center flex '>
    Popüler Siparişler
  </span>
  <div className='w-full h-[calc(100%-3rem)] flex items-center'>

  <div className='h-full w-full bg-red-500 flex  items-center gap-4 flex-col'>
    <ReorderComponent
    title={'Lykosis Cilt Kremi'}
    explain={'Yumuşak ve hassas ciltler için ideal'}
    id={1234}
    />
    <div className=' h-24 rounded-xl w-[90%] bg-white'>

</div>
<div className=' h-24 rounded-xl w-[90%] bg-white'>

</div>
<div className=' h-24 rounded-xl w-[90%] bg-white'>

</div>
<div className=' h-24 rounded-xl w-[90%] bg-white'>

</div>
<div className=' h-24 rounded-xl w-[90%] bg-white'>

</div>

  </div>
  </div>

</div>
  </SwiperSlide>
   <SwiperSlide>
    <div className='h-[80%] w-full bg-white rounded-xl'>
  <span className='text-xl font-serif w-full h-12 justify-center items-center flex '>
    Popüler Siparişler
  </span>
  <div className='w-full h-[calc(100%-3rem)] flex items-center'>

  <div className='h-full w-full bg-red-500 flex  items-center gap-4 flex-col'>
    <ReorderComponent
    title={'Lykosis Cilt Kremi'}
    explain={'Yumuşak ve hassas ciltler için ideal'}
    id={1234}
    />
    <div className=' h-24 rounded-xl w-[90%] bg-white'>

</div>
<div className=' h-24 rounded-xl w-[90%] bg-white'>

</div>
<div className=' h-24 rounded-xl w-[90%] bg-white'>

</div>
<div className=' h-24 rounded-xl w-[90%] bg-white'>

</div>
<div className=' h-24 rounded-xl w-[90%] bg-white'>

</div>

  </div>
  </div>

</div>
  </SwiperSlide>

</Swiper>)
}
