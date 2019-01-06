import {
    getUserID
  } from '../../../utils/Cryptic'

const createEvent = async (parent, { data }, { prisma, request }, info) => {
    //get UserID stored in sessionStorage (through jwt)
    const uid = await getUserID(request)

    //create Event on the database - map inputs to DB graphql Mutation
    const event = await prisma.mutation.createEvent(
      {
        data: {
          ...data,
          author: {
            connect: {
              id: uid
            }
          },
          project: {
            connect: {
              id: data.project
            }
          },
          creatures: null
        }
      },
      info
    )

    return event
  }

  export default createEvent