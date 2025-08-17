import Slider from '/components/Slider'
import SliderPart from '/components/SliderPart'
import CategoriesComponent from '/components/Categories/CategoriesComponent'
import React from 'react'
import ImageContainer from '/components/ImageContainer'
import LastProducts from '/components/LastProducts/LastProducts'
import PromotionsComponent from '/components/Promotions/PromotionsComponent'
import Footer from '/components/Footer/Footer'
import Layout from '@/components/layout/NavbarandProviderLayout'
import NetworkStepsPart from '@/components/NetworkSteps/NetworkStepsPart'
import useFilterable from '@/components/hooks/useFilterable'
import Head from 'next/head'

export default function Home() {
  const filterable = useFilterable()
  return (
    <>
    <Head>
          <title>Anasayfa</title>
          <meta name="home" content="Anasayfa site acilinca karsiniza cikan kisim." />
          <link rel="icon" href="/smallLogo.jpeg" />
          <meta property="og:image" content="/smallLogo.jpeg" />
      </Head>
    <Layout>
      
      <div className='flex bg-white pb-10 pt-2'>
      <SliderPart/>
      <Slider/>
    </div>
      <ImageContainer/>
      <CategoriesComponent/>

      {
        // IT WILL SHOW LAST LOOKED AT PRODUCTS AND SOME MORE
      }
      <LastProducts/>
      {
        // IMAGE GROUP THAT CONTAINS 1 BIG 6 SMALL IMAGES
      }
      <PromotionsComponent/>
      {
        // WHAT YOU NEED SECTION THAT WILL SAY DO YOU NOT KNOW WHAT YOU NEED? WE WILL HELP YOU AND QUIZ PART
      }
      {/* <WhatYouNeedComponent/> */}
      <NetworkStepsPart/>
      {
        // FOOTER PART THAT WILL BE REFERANCED FROM TRENDYOL
      }
      <Footer/>

    </Layout>

    </>
  )
}
