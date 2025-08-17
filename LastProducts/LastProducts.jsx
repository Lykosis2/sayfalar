import React, { useContext, useEffect, useState } from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Image from 'next/image'
import LastProductsToast from '../Toast/LastProductsToast'
import { SharedContext } from '../layout/AgacDataSharer'

export default function LastProducts() {
  const {products} = useContext(SharedContext)
  const [firstTenProducts, setFirstTenProducts] = useState([])
  useEffect(() => {
    setFirstTenProducts(products.slice(0, 10))
  }
  , [products])


  return (
    <div className='lg:px-16 px-0 flex w-full h-[320px] overflow-hidden mt-6' >

        <div className='flex w-full justify-start h-full min-w-0  items-center rounded-xl flex-col customBorder'>

        <div className='flex w-full h-16 rounded-t-xl justify-start gap-2 '>

        <div className={`flex w-48 bg-primary text-white border border-primary translate-x-12 text-xl justify-center items-center rounded-t-lg cursor-pointer select-none `} >
                <span className='py-1'>

                Çok Satılanlar
                </span>
            </div>
          

        </div>
          {/* <div className='w-[13%] h-[90%] bg-gray-500 flex flex-col '>

          </div> */}
          <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        style={{ width: '100%', height: '100%', padding: '25px', border: '1px solid black',boxSizing: 'border-box', borderRadius: '10px' }}
        pagination={{ clickable: true }}
        breakpoints={{
          450: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          520: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          815: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
          1315: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
          1600: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {firstTenProducts
        && firstTenProducts.length > 0
            && firstTenProducts.map((product, index) => {
              return (
                    <SwiperSlide className='no-border full-opacity border border-black' key={index}>
                          <div className='flex flex-col h-[95%] items-center bg-white rounded-xl '>
                    <div className='h-[60%] max-h-[180px] flex justify-center mt-2'>
                      

                    <Image loading='lazy' src={`${process.env.NEXT_PUBLIC_CDN_URL}/products/${product?.id}`} width={150} height={150} alt="" className='w-[150px] h-[150px]'  />
                    </div>
                    <div className=''>

                    <div className='flex justify-center min-w-[200px] lg:max-w-[275px] w-full'>
                        <Link href={`/products/${product?.id}`} className='text-sm font-medium text-center whitespace-nowrap overflow-hidden text-ellipsis mt-2 w-full'>
                        {
                            product?.name
                        }
                        </Link>

                    </div>
                    <div className='flex min-w-[200px] max-w-[260px] w-full justify-center px-6 items-center gap-4 h-12'>

                        <span className='text-base mt-[1px] flex font-semibold'>
                            {
                                product?.price
                            } TL

                        </span>
                        <span className="text-sm flex items-center justify-center font-semibold">
                                <div className="w-3 h-3 rounded-full bg-orange-400 flex mr-0.5">
                                </div>
                                <span className='mt-[1px] text-xs font-medium '>

                                {
                                    product?.point1.toFixed(2)
                                }
                                </span>
                            </span>
                            <LastProductsToast
                            id={product?.id}
                            name={product?.name}
                            productCount={1}
                            />
                    </div>
                    </div>

                </div>
                    </SwiperSlide>
              )
            })
        }

      </Swiper>
          </div>

    </div>
  )
}
