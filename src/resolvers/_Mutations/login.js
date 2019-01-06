import {
    generateToken,
    passwordMatch,
  } from '../../utils/Cryptic'

const login = async (parent, { data }, { prisma, request }, info) => {
    //fetch user (also looks at if the user exists)
    const user = await prisma.query.user({
      where: {
        email: data.email
      }
    })

    if (!user) throw new Error('Unable to login')

    //compare DB saved hashed password with input password
    const isMatch = await passwordMatch(data.password, user.password)

    if (!isMatch) throw new Error('Unable to login')

    //return AuthPayload
    return {
      user,
      token: generateToken(user.id)
    }
  }

  export default login