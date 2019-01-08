import { getUserID } from '../../../utils/Cryptic';

const updateEvent = async (parent, { id, data }, { prisma, request }, info) => {
    const eventExists = prisma.exists.Event({
        id
    })

    await getUserID(request)    //will throw an error if user is not authenticated

    if(!eventExists)
        throw new Error('Unable to find Event')

    const updatedEvent = await prisma.mutation.updateEvent({
        data: {
            ...data
        },
        where: {
            id
        }
    }, info)

    return updatedEvent
}

export default updateEvent