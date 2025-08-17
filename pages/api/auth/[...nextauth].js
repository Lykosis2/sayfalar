import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { ofetch } from 'ofetch'
import checkAnyThingChangedinApi from '../../../lib/checkAnyThingChangedinApi'
import { signOut } from 'next-auth/react'

export const adminOpts = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Enter Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log(credentials)
        console.log(req)
        // Add logic here to look up the user from the credentials supplied
        const user = await ofetch(`${process.env.NEXT_PUBLIC_URL}/api/finalEndPoints/login`, {
          method: 'POST',
          body: {
            email: credentials?.email,
            password: credentials?.password,
          },
        })

        console.log(user, 'user')

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        }
        else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    
  ],
  //  adapter:SequelizeAdapter(sequelize),
  session: {
    strategy: 'jwt',
  },
  pages:{
    signIn:'/login'
  },

  callbacks: {
    async jwt({ user, token }) {
      if (user) { 
        token.user = { ...user }
        if(!token.iat){
          token.iat = -1
        }
        if(token.invalid === undefined){
          token.invalid = false
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token?.user) { 
         const fifteenMinutesOrMorePast = token?.iat !== -1 ?  (Date.now() - token.iat) > 900000 : false
         if(token?.iat === -1 ){
           const changed = true// await checkAnyThingChangedinApi(token.user)
           if(changed){
            token.invalid = true
           }
           token.iat = Date.now()
       } 
         else if(fifteenMinutesOrMorePast){
           const changed =  await checkAnyThingChangedinApi(token.user)
            if(changed){
              token.invalid = true
            }
         }
        session.user = token.user
        session.invalid = token.invalid
      }
      return session
    },
    async signIn(user){
      console.log(user);
      if(!user){
        throw new Error("Yanlış email yada şifre")
      }
      return true
    }
  },

}

const handler = NextAuth(adminOpts)

export default handler
