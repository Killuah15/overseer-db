import { getUserID, passwordMatch, hashPassword } from '../../../utils/Cryptic'

const updateCurrentUser = async (
  parent,
  { password, data },
  { prisma, request },
  info
) => {
  const userID = await getUserID(request)
  const userExists = prisma.exists.User({
    id: userID
  })

  if (!userExists) throw new Error('Unable to find User')
  const dbUser = await prisma.query.user({
    where: {
      id: userID
    }
  })

  const pwMatch = await passwordMatch(password, dbUser.password)
  if (!pwMatch) throw new Error('Something is wrong with you login data')

  const updatedCurrentUser = await prisma.mutation.updateUser({
      data: {
        ...data,
        password: await hashPassword(data.password)
      },
      where: {
          id: userID
      }
  }, info)

  return updatedCurrentUser
}

export default updateCurrentUser
