import { getUserID } from '../../utils/Cryptic';

//Get all Projects of the User
const projects = async (parent, args, { prisma, request }, info) => {

    return prisma.query.projects({
        where: {
            author: {
                id: await getUserID(request)
            }
        }
    }, info)
}

export default projects