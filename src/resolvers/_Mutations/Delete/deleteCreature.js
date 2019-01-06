import { validateArg } from '../../../utils/Validation'
import { getUserID } from '../../../utils/Cryptic'

const deleteCreature = async (parent, { id }, { prisma, request }, info) => {
  const userID = await getUserID(request)
  const creatureExists = await prisma.exists.Creature({
    id,
    author: {
      id: userID
    }
  })

  if (!creatureExists) 
    throw new Error('Unable to delete Creature')

  let opArgs = {}

  opArgs.where = {
    id: await validateArg(id)
  }

  return prisma.mutation.deleteCreature(opArgs, info)
}

export default deleteCreature
