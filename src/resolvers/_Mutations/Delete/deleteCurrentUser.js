import { getUserID } from '../../../utils/Cryptic'

const deleteCurrentUser = async (parent, args, { prisma, request }, info) => {
  let opArgs = {}

  opArgs.where = {
    id: await getUserID(request)
  }

  return prisma.mutation.deleteUser(opArgs, info)
}

export default deleteCurrentUser
