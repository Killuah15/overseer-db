import {
  hashPassword,
  generateToken,
  passwordMatch,
  getUserID
} from '../utils/Cryptic'
import { isValidPassword, isValidEmail } from '../utils/Validation'

const Mutation = {
  async signup(parent, { data }, { prisma }, info) {
    const userExists = await prisma.exists.User({ email: data.email })

    //if email already taken
    if (userExists) throw new Error('Email is already taken')

    // validate Email
    if (!isValidPassword(data.password))
      throw new Error('Password must be between 8 and 16 characters')

    if (!isValidEmail(data.email)) throw new Error('Email is invalid')

    //hash password
    const password = await hashPassword(data.password)

    //Actually create a user in the database, use arguments for that, overwrite the password argument with the hashed password
    const user = await prisma.mutation.createUser({
      data: {
        ...data,
        password
      }
    })

    //return AuthPayload
    return {
      user,
      token: generateToken(user.id)
    }
  },
  async login(parent, { data }, { prisma, request }, info) {
    //fetch user (also looks at if the user exists)
    const user = await prisma.query.user({
      where: {
        email: data.email
      }
    })

    if (!user) throw new Error('Unable to login')

    //compare DB saved hashed password with input password
    const isMatch = await passwordMatch(data.password, user.password)

    if (!isMatch) throw new Error('Unable to login')

    //return AuthPayload
    return {
      user,
      token: generateToken(user.id)
    }
  },
  async createProject(
    parent,
    { title, description },
    { prisma, request },
    info
  ) {
    //get UserID stored in sessionStorage (through jwt)
    const uid = await getUserID(request)

    //create Project on the database - map inputs to DB graphql Mutation
    const project = await prisma.mutation.createProject(
      {
        data: {
          title,
          description,
          author: {
            connect: {
              id: uid
            }
          }
        }
      },
      info
    )

    return project
  },
  async createEvent(parent, { data }, { prisma, request }, info) {
    //get UserID stored in sessionStorage (through jwt)
    const uid = await getUserID(request)

    //create Event on the database - map inputs to DB graphql Mutation
    const event = await prisma.mutation.createEvent(
      {
        data: {
          ...data,
          author: {
            connect: {
              id: uid
            }
          },
          project: {
            connect: {
              id: data.project
            }
          },
          creatures: null
        }
      },
      info
    )

    return event
  },
  async createCreature(parent, { data }, { prisma, request }, info) {
    //get UserID stored in sessionStorage (through jwt)
    const uid = await getUserID(request)

    //destructure conditions input
    const {
      toughness,
      painThreshold,
      corruption,
      corruptionThreshold,
      corruptionPermanent
    } = data.Conditions

    //destructure attributes input
    const {
      accurate,
      cunning,
      discreet,
      persuasive,
      quick,
      resolute,
      strong,
      vigilant,
      defense
    } = data.attributes

    //create Creature on the database - map inputs to DB graphql Mutation
    const creature = await prisma.mutation.createCreature(
      {
        data: {
          ...data,
          author: {
            connect: {
              id: uid
            }
          },
          event: {
            connect: {
              id: data.event
            }
          },
          Conditions: {
            create: {
              toughness,
              painThreshold,
              corruption,
              corruptionThreshold,
              corruptionPermanent
            }
          },
          attributes: {
            create: {
              accurate,
              cunning,
              discreet,
              persuasive,
              quick,
              resolute,
              strong,
              vigilant,
              defense
            }
          }
        }
      },
      info
    )

    return creature
  }
}

//NOTE: mit request.get('Authorization') bekommt man dann den mitgelieferten Auth token! :)

export default Mutation
