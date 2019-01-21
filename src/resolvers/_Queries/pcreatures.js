import { validateArg } from "../../utils/Validation";

const pcreatures = async (parent, { rulebook }, { prisma }, info) => {
    let opArgs = {}

    opArgs.where = {
        rulebook
    }

    return prisma.query.pSymCreatures(opArgs, info)
}

export default pcreatures