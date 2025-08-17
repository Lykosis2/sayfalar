import { SessionProvider } from 'next-auth/react'
import { CartContextProvider } from '@/components/Cart/CartContextProvider'
import { NavbarTextContextProvider } from '@/components/NavbarProvider'
import AgacDataSharer from '@/components/layout/AgacDataSharer'
import 'styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return <>
  <Head>
    <title>Lykosis</title>
    <link rel="icon" href="/smallLogo.jpeg" />
    
    <meta name="description" content="Network marketinge lykosisle merhaba demeye ne dersiniz" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://lykosis.com/" />
    <meta property="og:title" content="Lykosis" />
    <meta property="og:description" content="Network marketinge lykosisle merhaba demeye ne dersiniz" />
    <meta property="og:image" content={"https://cdn.lykosis.com/logo.png"} />

    <meta property="twitter:card" content={"https://cdn.lykosis.com/logo.png"} />
    <meta property="twitter:url" content="https://lykosis.com/" />
    <meta property="twitter:title" content="Your Website Title" />
    <meta property="twitter:description" content="Network marketinge lykosisle merhaba demeye ne dersiniz" />
    <meta property="twitter:image" content={"https://cdn.lykosis.com/logo.png"} />
</Head>
          <SessionProvider>
              <CartContextProvider>
                <NavbarTextContextProvider>
                  <AgacDataSharer>
                      <Component {...pageProps} />
                  </AgacDataSharer>
                </NavbarTextContextProvider>
              </CartContextProvider>
          </SessionProvider>
         </>
}
