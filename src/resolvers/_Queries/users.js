const users = async (parent, args, { prisma }, info) => {
    return prisma.query.users({}, info)
}

export default users