import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const hashPassword = password => bcrypt.hash(password, 10)

const generateToken = id => jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: '2 days' })

const passwordMatch = (argsPassword, dbPassword) => {
    return bcrypt.compare(argsPassword, dbPassword)
}

export { hashPassword, generateToken, passwordMatch }