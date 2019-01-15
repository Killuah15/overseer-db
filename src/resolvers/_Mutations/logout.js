import { getUserID } from "../../utils/Cryptic";

const logout = async (parent, { data }, { prisma, response, request }, info) => {

    const uid = await getUserID(request, false)

    //fetch user (also looks at if the user exists)
    const user = await prisma.query.user({
      where: {
        id: uid
      }
    })
    if (!user) throw new Error('Unable to find current user')

    response.clearCookie('otid')

    return user
  }

  export default logout