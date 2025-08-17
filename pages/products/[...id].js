import { useRouter } from 'next/router'
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { Controller, FreeMode, Navigation, Thumbs } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import Image from 'next/image'
import { ofetch } from 'ofetch'
import { NavbarTextContext } from '@/components/NavbarProvider'
import Layout from '@/components/layout/NavbarandProviderLayout'
import ProductPartToast from '@/components/Toast/ProductPartToast'
import { 
  SharedContext } from '@/components/layout/AgacDataSharer'
import useFilterable from '@/components/hooks/useFilterable'
import { signOut } from 'next-auth/react'

// TIODO SERVER SIDEDA GEREK VAR MI GETE  BAK 
function MyPage() {
  const router = useRouter()
  const filterable = useFilterable()
  const { id } = router.query
  const [serverSideData, setServerSideData] = useState({product:{
    id: 404,
    name: 'Ürün Yükleniyor',
    smalldescription: 'Ürün Yükleniyor',
    longdescription: 'Ürün Yükleniyor',
    price: '0',
    point1: '0',
    point2: '0',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKhE3JRxKocKCTJf4jZTq1qHIzmqTwasFfDHAciepRFLlRKbpzyK30O2k5HWk8htMxZ_E&usqp=CAU', 'https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_640.png'],
    categories: ['Ürün Bulunamadı', 'Ürün Bulunamadi'],
  }})
  const [thumbsSwiper, setThumbsSwiper] = useState()
  const [firstSwiper, setFirstSwiper] = useState()
  const [secondSwiper, setSecondSwiper] = useState()
  const [favorite, setFavorite] = useState(false)
  const { favoriteProducts,categories,session,connectedCategories } = useContext(SharedContext)
  console.log(connectedCategories);
  const swiper1Ref = useRef(null)
  const swiper2Ref = useRef()
  const [counter, setCounter] = useState(1) 
  const [parseCategories, setParseCategories] = useState([])
  useEffect(() => {
    const parsedCategories = {}
    categories.map((category) => {
      if(!category.id)return
      parsedCategories[category.id] = category
    })
    setParseCategories(parsedCategories)
  }, [categories])
  
  useLayoutEffect(() => {
    if (swiper1Ref.current !== null)
      swiper1Ref.current.controller.control = swiper2Ref.current
  }, [])

  useEffect(() => {
    if (id === undefined)
      return
    ofetch(`/api/finalEndPoints/products/${id[0]}`).then(res => {
      console.log(res);
      setServerSideData(res)
    }).catch(err => console.log(err))
  }, [id])

  console.log(serverSideData);

  useEffect(() => {
    console.log('here')
    if (!favoriteProducts)
      return
    if (favoriteProducts.includes(serverSideData.product.id))
      setFavorite(true)
  }, [favoriteProducts])
 
  return (
<>
<Layout>
    <div className='w-full h-[calc(100vh-11rem)]  flex justify-center items-center '>
      <div className=' flex relative translate-y-1/4 lg:translate-y-0 lg:flex-row flex-col lg:w-[calc(100%-8rem)] w-full  lg:h-[calc(100%-2rem)] h-[200%]'>
        <div className=' lg:w-[50%] w-full lg:h-full h-[45%] flex justify-center items-center'>
          <div className='w-[90%] h-full flex flex-col justify-center items-center'>

        <Swiper
        onSwiper={(swiper) => {
          if (swiper1Ref.current !== null)
            swiper1Ref.current = swiper
        }}
        preloadImages={false}
        controller={{ control: secondSwiper }}
        spaceBetween={10}
        slidesPerView={1}

        grabCursor={true}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Controller]}
        className="bigSwiper"
        >
          {
            serverSideData
            && serverSideData.product && 
 
              <SwiperSlide >
                <div className='w-full h-full flex items-center justify-center object-cover'>

                <Image  loading="lazy" width={480} height={480}  src={`${process.env.NEXT_PUBLIC_CDN_URL}/products/${serverSideData.product.id}`} />
                </div>
              </SwiperSlide>
            
            
          }

      </Swiper>
      <Swiper
        controller={{ control: firstSwiper }}
        loop={false}
        spaceBetween={10}
        slidesPerView={3}
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 10,
          },

        }}
        watchSlidesProgress
        touchRatio={0.2}
        preloadImages={false}
        lazy
        onSwiper={setThumbsSwiper}
        modules={[Navigation, Thumbs, Controller]}
        className=" mt-[20px] smallSwiper mx-4"

      >
        {
 serverSideData
 && serverSideData.product && 

   <SwiperSlide >
     <Image loading="lazy" width={75} height={75} className='w-full' layout='responsive' quality={100} src={`${process.env.NEXT_PUBLIC_CDN_URL}/products/${serverSideData.product.id}`} />
   </SwiperSlide>
}   

      </Swiper>
          </div>
        </div>
        <div className='lg:w-[50%] w-full lg:h-full h-[60%] flex justify-center items-center lg:translate-y-0 -translate-y-18'>
          <div className='w-[85%] h-[90%] border border-gray-400 shadow-lg shadow-gray-800 rounded-xl px-6'>
            <div className='mt-12 flex w-full mb-2'>
              <span className=' text-[#848484] cursor-pointer'>
              <span>
            Tüm Kategoriler /
          </span>
                {
                  console.log(connectedCategories)
                }
                {
                serverSideData
                && serverSideData.product
                && connectedCategories.length > 0
                  && connectedCategories.map((category, index) => {
                    console.log(category,"category");
                    if(category.product_id === serverSideData.product.id){ 
                      console.log(category);
                      console.log(parseCategories)
                      return (<span key={index} onClick={()=>{
                        router.push(`/filter?category=${category.category_id}`)
                      }}>{parseCategories[category.category_id]?.label } / </span>)
                    }
                  },
                  )
                  

              }

              </span>
            </div>
            {/* NAME OF THE PRODUCT */}
            <div className='w-full font-semibold mb-2 overflow-hidden text-ellipsis whitespace-nowrap'>
              <span className='text-2xl w-full'>{
                serverSideData.product.name
              }</span>

            </div>
            {/* PRICE AND POINT OF THE PRODUCT */}
            <div className='w-full mb-1'>
              <span className='text-xl flex items-center '>
                {
                  serverSideData.product.price
                } TL
                |
                &nbsp;
                <div className='w-3 h-3 rounded-full bg-orange-400'/>
                &nbsp;
                <span className='font-medium text-sm'>

                {
                  
                  typeof serverSideData?.product?.point1 === 'number' 
                  ? serverSideData.product.point1.toFixed(2) 
                  : '0.00'
                }
                </span>

              </span>

            </div>
            {/* BELGE PART */}
            <div className=' w-28 h-10 border border-black rounded-md mb-8'>
              <a target='_blank' href={`${process.env.NEXT_PUBLIC_CDN_URL}/products/pdf/${serverSideData.product.id}.pdf`} className='flex justify-center items-center h-full w-full text-lg gap-1 select-none cursor-pointer'>

                İçerik

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
</svg>

              </a>

            </div>
            {/* QUANTITY OF THE PRODUCT */}
            <div className='flex items-center'>
              <div className='flex flex-col mb-4'>
                <span className=' text-black text-lg'>
                  Adet

                </span>
                {/* QUANTITY OF THE PRODUCT CLICKED PART */}
                <div className='w-32 h-12 flex border border-black shadow-sm shadow-black rounded-lg justify-around items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 select-none cursor-pointer" onClick={() => setCounter((e) => {
                      if (e <= 1)
                        return 1

                      else
                        return e - 1
                    })}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>
                  <span className='text-xl select-none'>

                  {
                    counter
                  }
                  </span>

                  <svg svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} onClick={() => setCounter((e) => {
                    console.log(e)
                    if (e >= 10)
                      return 10

                    else
                      return e + 1
                  })} stroke="currentColor" className="w-6 h-6 select-none cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>

                </div>

              </div>
              <div className='w-12 h-12 translate-y-[6px] flex justify-center items-center' onClick={() => {
                if (session.status === 'loading') return
                if (session.status === 'unauthenticated') {
                  signOut()
                  window.location.href = '/login'
                  return
                }
                if(!session.data) {
                  signOut()
                  window.location.href = '/login'
                  return
                }
                if(session.data.invalid) {
                  signOut()
                  window.location.href = '/login'
                  return
                }
                if(!session.data.user.id) {
                  signOut()
                  window.location.href = '/login'
                  return
                }
                if (favorite) {
                  ofetch('/api/user/favorites', {
                    method: 'DELETE',
                    query: {
                      id: serverSideData.product.id,
                    },
                  }).then(res => console.log(res)).catch(err => console.log(err))
                }
                else {
                  ofetch('/api/user/favorites', {
                    method: 'POST',
                    body: {
                      id: serverSideData.product.id,
                    },

                  }).then(res => console.log(res)).catch(err => console.log(err))
                }
                setFavorite(p => !p)
              }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill={`${favorite ? 'red' : 'none'}`} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" color={`${favorite ? 'red' : ''}`} /></svg>

              </div>
              <div className='w-12 h-12 translate-y-[6px] flex justify-center items-center mx-4'>
                Stok:{serverSideData.product.stock > 500 ? '500+' : serverSideData.product.stock}
                  </div>              
              </div>

            {/* ADD TO CART BUTTON */}

            <ProductPartToast
            name={serverSideData.product.name}
            id={serverSideData.product.id}
            productCount={counter}
            />

            {/* DESCRIPTION OF THE PRODUCT */}

            <div className='w-full h-auto border border-black rounded-xl shadow-sm shadow-gray-600 p-4'>
              <span className='w-full h-full flex-wrap'>
                {
                  serverSideData.product?.description
                }
              </span>

            </div>

          </div>

        </div>

      </div>
    </div>
</Layout>

</>
  )
}

export default MyPage
