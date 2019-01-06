import {
    hashPassword,
    generateToken,
  } from '../../utils/Cryptic'
  import { isValidPassword, isValidEmail } from '../../utils/Validation'

const signup = async (parent, { data }, { prisma }, info) => {
    const userExists = await prisma.exists.User({ email: data.email })

    //if email already taken
    if (userExists)
      throw new Error('Email is already taken')

    // validate Email
    if (!isValidPassword(data.password))
      throw new Error('Password must be between 8 and 16 characters')

    if (!isValidEmail(data.email))
      throw new Error('Email is invalid')

    //hash password
    const password = await hashPassword(data.password)

    //Actually create a user in the database, use arguments for that, overwrite the password argument with the hashed password
    const user = await prisma.mutation.createUser({
      data: {
        ...data,
        password
      }
    })

    //return AuthPayload
    return {
      user,
      token: generateToken(user.id)
    }
  }

  export default signup