import { getUserID } from "../../../utils/Cryptic";

const updateProject = async (parent, { id, data }, { prisma, request }, info) => {
    const projectExists = prisma.exists.Project({
        id
    })

    await getUserID(request)    //will throw an error if user is not authenticated

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