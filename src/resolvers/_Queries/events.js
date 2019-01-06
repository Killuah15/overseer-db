import { getUserID } from '../../utils/Cryptic'
import { validateArg } from '../../utils/Validation'

//Get all Events of the Users Project
const events = async (parent, args, { prisma, request }, info) => {
  let opArgs = {}

  opArgs.where = {
    AND: [
      {
        author: {
          id: await getUserID(request)
        }
      },
      {
        project: {
          OR: [
            {
              id: await validateArg(args.projectID)
            },
            {
              title: await validateArg(args.projectTitle)
            }
          ]
        }
      }
    ]
  }

  return prisma.query.events(opArgs, info)
}

export default events
