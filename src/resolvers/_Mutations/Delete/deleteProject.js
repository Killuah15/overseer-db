import { validateArg } from '../../../utils/Validation'
import { getUserID } from '../../../utils/Cryptic'

const deleteProject = async (parent, { id }, { prisma, request }, info) => {
  const userID = await getUserID(request)
  const projectExists = await prisma.exists.Project({
    id,
    author: {
      id: userID
    }
  })

  if (!projectExists) 
    throw new Error('Unable to delete Event')

  let opArgs = {}

  opArgs.where = {
    id: await validateArg(id)
  }

  return prisma.mutation.deleteProject(opArgs, info)
}

export default deleteProject
