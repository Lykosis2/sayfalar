import React, { useContext, useEffect, useState } from 'react'
import ProfilLayout from '@/components/layout/ProfilLayout'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import ProductComponent2 from '@/components/ProductComponents2'
import { SharedContext } from '@/components/layout/AgacDataSharer'

export default function Oneriler() {
 const {products} = useContext(SharedContext)

  return (
        <ProfilLayout navbarTitle="Önerilerim" navbarSearchPlaceholder="Önerilerde Ara..">
                {/* <div className="flex flex-col items-center gap-5">
    <h3 className="text-2xl font-semibold text-gray-800">Yağlı Cilt Ürünleri</h3>
    <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        spaceBetween={'50px'}
        modules={[Pagination]}
        className="w-full h-full flex"
    >
        {products.map(product => (
            <SwiperSlide className="no-border" key={`${product.id}first`}>
                <ProductComponent2 product={product} key={`${product.id}first`} namedToast={`${product.id}first`}/>
            </SwiperSlide>
        ))}
    </Swiper>
</div>
<div className="flex flex-col items-center gap-5">
    <h3 className="text-2xl font-semibold text-gray-800">Yağlı Cilt Ürünleri</h3>
    <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        spaceBetween={'50px'}
        modules={[Pagination]}
        className="w-full h-full flex"
    >
        {products.map(product => (
            <SwiperSlide className="no-border" key={`${product.id}second`}>
                <ProductComponent2 product={product} key={`${product.id}second`} namedToast={`${product.id}second`}/>
            </SwiperSlide>
        ))}
    </Swiper>
</div> */}
<h2 className='text-2xl font-bold'>
  Henüz öneri algoritması geliştirilmedi.
</h2>

        </ProfilLayout>
  )
}
