import { validateArg } from '../../../utils/Validation'
import { getUserID } from '../../../utils/Cryptic'

const deleteEvent = async (parent, { id }, { prisma, request }, info) => {
  const userID = await getUserID(request)
  const eventExists = await prisma.exists.Event({
    id,
    author: {
      id: userID
    }
  })

  if (!eventExists) 
    throw new Error('Unable to delete Event')

  let opArgs = {}

  opArgs.where = {
    id: await validateArg(id)
  }

  return prisma.mutation.deleteEvent(opArgs, info)
}

export default deleteEvent
