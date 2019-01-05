import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const hashPassword = password => bcrypt.hash(password, 10)

const generateToken = id =>
  jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: '2 days' })

const getUserID = (request, requireAuth = true) => {
  const tokenHeader = request.headers.authorization

  if (tokenHeader) {
    const token = tokenHeader.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded.userId
  }

  if (requireAuth) throw new Error('Authentication required')

  return null
}

const passwordMatch = (argsPassword, dbPassword) => {
  return bcrypt.compare(argsPassword, dbPassword)
}

export { hashPassword, generateToken, passwordMatch, getUserID }
