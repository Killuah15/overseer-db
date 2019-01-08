import { getUserID } from '../../../utils/Cryptic';

const updateCreature = async (parent, { id, data }, { prisma, request }, info) => {
    const creatureExists = prisma.exists.Creature({
        id
    })

    await getUserID(request)    //will throw an error if user is not authenticated

    if(!creatureExists)
        throw new Error('Unable to find Creature')

    const updatedCreature = await prisma.mutation.updateCreature({
        data: {
            ...data,
            attributes:{
                update:{
                    ...data.attributes
                }
            },
            Conditions: {
                update: {
                    ...data.Conditions
                }
            }
        },
        where: {
            id
        }
    }, info)

    return updatedCreature
}

export default updateCreature