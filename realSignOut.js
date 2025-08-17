import { signOut } from 'next-auth/react'

export async function theRealSignOut(args) {
  try {
    await axios.put('/api/auth/signoutprovider', null)
    // signOut only if PUT was successful
    return await signOut(args)
  }
  catch (error) {
    // <show some notification to user asking to retry signout>
    throw error
  }
}
