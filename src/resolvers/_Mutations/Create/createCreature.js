import { getUserID } from '../../../utils/Cryptic'

const createCreature = async (parent, { data }, { prisma, request }, info) => {
  //get UserID stored in sessionStorage (through jwt)
  const uid = await getUserID(request)

  //destructure conditions input
  const { toughness, painThreshold } = data.Conditions.physical.fitness

  const { current, threshold, permanent } = data.Conditions.spiritual.corruption

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
            physical: {
              create: {
                fitness: {
                  create: {
                    toughness,
                    painThreshold
                  }
                }
              }
            },
            spiritual: {
              create: {
                corruption: {
                  create: {
                    current,
                    threshold,
                    permanent
                  }
                }
              }
            }
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

export default createCreature
