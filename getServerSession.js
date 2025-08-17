import { getServerSession as originalGetServerSession } from 'next-auth'
import { ofetch } from 'ofetch'
import { verifyJwtAccessToken } from './jwt'
import { adminOpts } from '@/pages/api/auth/[...nextauth]'

// next-auth/utils is not listed in export, next will not let you import it
// duplicating
// export const getServerSession = async () => {
// // code from `next-auth/next` for RSC
//   const req = {
//     headers: Object.fromEntries(headers()),
//     cookies: Object.fromEntries(
//       cookies()
//         .getAll()
//         .map((c) => [c.name, c.value]),
//     ),
//   };

// // the old `next-auth/react` getSession
//   const session = await fetchData("session", __NEXTAUTH, logger, { req });

//   return session;
// };

export default async function getServerSession(req, res) {
  console.log('god damn, will it work?')
  const userSession = await originalGetServerSession(req, res, adminOpts)
  console.log('dadadada')
  if (!userSession)
    return null
  console.log(userSession)
  console.log(userSession.user.accessToken)
  console.log('stonks!!!')
  const payload = verifyJwtAccessToken(userSession.user.accessToken)
  if (!payload) {
    ofetch('/api/auth/signout', {
      method: 'POST',
    })
    throw new Error('Invalid JWT')
  }

  console.log(payload)
  console.log('god daaaam\' we are rich!!!')
  return { ...userSession, payload }
};
