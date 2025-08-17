import React from 'react'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'

export default function Pages() {
  const router = useRouter()
  const session = useSession()
  React.useEffect(() => {
    if(session.status === 'loading')
      return
    if(session?.data?.invalid) {
      signOut().then(() => {
        router.replace('/login')
      })
      return
    }
    if(!session?.data?.user) {
      router.replace('/login')
      return
    }
    router.replace('/profile/siparisler')
  },[session.status])



  return (
        <div className="h-screen w-screen grid place-items-center">
            <h1 className="text-black text-3xl">Yönlendiriliyorsunuz..</h1>
        </div>
  )
}
