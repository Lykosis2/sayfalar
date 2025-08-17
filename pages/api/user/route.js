import User from '@/models/user'

const user = User()
export default async function POST(request, res) {
  let body = request.body
  if (typeof request.body === 'string')
    body = JSON.parse(request.body)

  const { name, surname, profilepicture, gender, email, phoneNumber, age, password, sponsor } = request.body
  // Get required parts from json

  const createdUser = await user.create({ name, surname, password, profilepicture, gender, email, phoneNumber, age, sponsor }).catch((err) => {
    console.log(err)
    res.status(500).json({ message: 'Error creating user' })
  },
  )
  const result = { message: 'User created successfully', user: createdUser }
  res.status(200).json(result)
}
