'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

export default function SignInButton() {
  const { data } = useSession()
  if (data && data.user) {
    return <button onClick={() => signOut()}>
            Sign Out {data.user.name}
        </button>
  }
  return (
    <button onClick={() => {
      signIn()
    }}>
        Sign in
    </button>
  )
}
