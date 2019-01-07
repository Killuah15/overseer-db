const updateProject = async (parent, { id, data }, { prisma, request }, info) => {
    const projectExists = prisma.exists.Project({
        id
    })

    //TODO: only update it when the user is authenticated

    if(!projectExists)
        throw new Error('Unable to find Project')

    const updatedProject = await prisma.mutation.updateProject({
        data,
        where: {
            id
        }
    }, info)

    return updatedProject
}

export default updateProject