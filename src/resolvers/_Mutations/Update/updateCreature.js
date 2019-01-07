const updateCreature = async (parent, { id, data }, { prisma, request }, info) => {
    const creatureExists = prisma.exists.Creature({
        id
    })

    if(!creatureExists)
        throw new Error('Unable to find Creature')

    console.log(data);

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
    })

    //TODO: returns no attributes and conditions, however they get updated in the database

    console.log(updatedCreature);

    return updatedCreature
}

export default updateCreature