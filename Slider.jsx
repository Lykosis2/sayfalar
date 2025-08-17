import React, { useContext, useEffect, useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import Image from 'next/image'
import { SharedContext } from './layout/AgacDataSharer'

export default function MySlider() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 750,
    autoplaySpeed: 5000,
    autoplay: true,
    appendDots: dots => (
      <div
        style={{
          bottom: '-55px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ul style={{ margin: '0px' }}> {
          dots
        } </ul>
      </div>
    ),

  }
  const sharedCtx = useContext(SharedContext)
  return (
    <section className='md:w-[70%] w-full md:px-16 px-4 homeSlide md:mr-8'>
      <div className=' max-w-full m-auto'>
        <Slider {...settings}>
          {[1, 2, 3, 4].map((num,index) => (
            <div className='md:small-flex-mybox flex-mybox  flex justify-center pl-12' key={num}>
              <a href={sharedCtx?.links?.[`slider${num}`]} target="_blank" className='' aria-label={`link${index}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_CDN_URL}/photos/slider${num}`}
                  width={900}
                  height={1000}
                  className=' object-cover'
                  alt="Picture of the author"
                >

                </Image>

           </a>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}
