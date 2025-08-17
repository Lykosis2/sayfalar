import jwt from 'jsonwebtoken'

const DEFAULT_OPTIONS = {
  expiresIn: '30 days',
}

function signJwtAccessToken(payload, options = DEFAULT_OPTIONS) {
  const secret_key = process.env.SECRET_KEY
  const token = jwt.sign(payload, secret_key, options, { algorithm: 'HS256' })
  return token
}

function createAdminJwt(payload) {
  const secretKey = process.env.ADMIN_SECRET_KEY
  const algorithm = 'HS256' // Use RS256 algorithm for more security

  // Customize options for the admin JWT
  const options = {
    ...DEFAULT_OPTIONS,
    algorithm, // Specify the algorithm
  }

  const token = jwt.sign(payload, secretKey, options)
  return token
}

function verifyAdminJwt(token) {
  const secretKey = process.env.ADMIN_SECRET_KEY
  const algorithm = 'HS256' // Use RS256 algorithm for more security

  // Customize options for the admin JWT
  const options = {
    ...DEFAULT_OPTIONS,
    algorithms: [algorithm], // Specify the algorithm
  }

  try {
    const decoded = jwt.verify(token, secretKey, options)
    return decoded
  }
  catch (err) {
    console.log(err)
    return null
  }
}

function verifyJwtAccessToken(token) {
  try {
    const secret_key = process.env.SECRET_KEY
    const decoded = jwt.verify(token, secret_key, { algorithms: ['HS256'] })
    console.log(decoded)
    return decoded
  }
  catch (err) {
    console.log(err)
    return null
  }
}

export { signJwtAccessToken, verifyJwtAccessToken, createAdminJwt, verifyAdminJwt }
