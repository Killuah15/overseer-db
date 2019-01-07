import {
    getUserID
  } from '../../../utils/Cryptic'

const createProject = async (
  parent,
  { title, description },
  { prisma, request },
  info
) => {
  //get UserID stored in sessionStorage (through jwt)
  console.log(`cP: ${request.signedCookies.otid}`);
  const uid = await getUserID(request)

  //create Project on the database - map inputs to DB graphql Mutation
  const project = await prisma.mutation.createProject(
    {
      data: {
        title,
        description,
        author: {
          connect: {
            id: uid
          }
        }
      }
    },
    info
  )

  return project
}

export default createProject
