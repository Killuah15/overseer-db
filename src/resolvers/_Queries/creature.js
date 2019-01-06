import { validateArg } from "../../utils/Validation";

const creature = async (parent, args, { prisma }, info) => {
    let opArgs = {}

    opArgs.where = {
        id: await validateArg(args.id)
    }

    return prisma.query.creature(opArgs, info)
}

export default creature