import { getUserID } from '../../../utils/Cryptic'

const createCreature = async (parent, { data }, { prisma, request }, info) => {
  //get UserID stored in sessionStorage (through jwt)
  const uid = await getUserID(request)

  //destructure conditions input
  const { toughness, painThreshold } = data.Conditions.fitness

  const { current, threshold, permanent } = data.Conditions.corruption

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
            physicalConditions: {
              create: {
                fitnessCondition: {
                  create: {
                    toughness,
                    painThreshold
                  }
                }
              }
            },
            spiritualConditions: {
              create: {
                corruptionCondition: {
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
