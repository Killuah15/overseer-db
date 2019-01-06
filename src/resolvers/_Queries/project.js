import { validateArg } from "../../utils/Validation";

const project = async (parent, args, { prisma }, info) => {
    let opArgs = {}

    opArgs.where = {
        id: await validateArg(args.id)
    }

    return prisma.query.project(opArgs, info)
}

export default project