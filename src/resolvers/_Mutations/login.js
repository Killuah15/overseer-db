import {
    generateToken,
    passwordMatch,
  } from '../../utils/Cryptic'

const login = async (parent, { data }, { prisma, request, response }, info) => {
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

    const token = generateToken(user.id)
    response.cookie('otid', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 2,  //2 days
      signed: true
    })
    //return AuthPayload
    return {
      user,
      token
    }
  }

  export default login