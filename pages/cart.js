import React from 'react'
import CartComponent from '/components/Cart/CartComponent'
import useFilterable from '@/components/hooks/useFilterable'
import Head from 'next/head'

export default function Cart() {
  const filterable = useFilterable()
  return (
    <>
    <Head>
      <title>Sepet</title>
      <meta name="cart" content="Sepet kismi" />
      <link rel="icon" href="/smallLogo.jpeg" />
      <meta property="og:image" content="/smallLogo.jpeg" />    
    </Head>

    <CartComponent/>

    </>
  )
}
