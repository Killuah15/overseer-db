import { getUserID } from '../../utils/Cryptic';

const currentUser = async (parent, args, { prisma, request }, info) => {
    let opArgs = {}

    opArgs.where = {
        id: await getUserID(request)
    }

    return prisma.query.user(opArgs, info)
}

export default currentUser