import { getUserID } from '../../utils/Cryptic'
import { validateArg } from '../../utils/Validation'

//Get all Events of the Users Project
const event = async (parent, args, { prisma }, info) => {
  let opArgs = {}

  opArgs.where = {
          id: await validateArg(args.id)
  }

  return prisma.query.event(opArgs, info)
}

export default event
