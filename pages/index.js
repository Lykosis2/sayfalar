import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NavbarTextContext } from '@/components/NavbarProvider'

export default function Home() {
  return (
    <main style={{padding:"2rem", fontFamily:"sans-serif"}}>
      <h1>Merhaba LYKOSis 🎉</h1>
      <p>Bu sayfa Next.js ile çalışıyor.</p>
    </main>
  );
}

export default function Home() {
  const { navbarText, filter, showProducts } = React.useContext(NavbarTextContext)
  const router = useRouter()

  useEffect(() => {
    return () => {
      router.asPath = `/home?timestamp=${Date.now()}`
    }
  }, [])

  useEffect(() => {
    const shouldRedirect = navbarText.length > 0 || filter !== 0 || showProducts

    router.push(shouldRedirect ? '/filter' : '/home')
  }, [navbarText, filter, showProducts])

  return (
    <>

    </>
  )
}
