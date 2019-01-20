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

  let abilities = await data.abilities.map((ability, index) => ({
    currentRank: ability.currentRank,
    title: ability.title,
    description: {
      create:[
        {
          type: ability.descriptions[0].type,
          rank: ability.descriptions[0].rank,
          description: ability.descriptions[0].description
        },
        {
          type: ability.descriptions[1].type,
          rank: ability.descriptions[1].rank,
          description: ability.descriptions[1].description
        },
        {
          type: ability.descriptions[2].type,
          rank: ability.descriptions[2].rank,
          description: ability.descriptions[2].description
        }
      ]
    }
  }))

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
        },
        abilities: {
          create: abilities
        }
      }
    },
    info
  )

  console.log("creature in DB: " + JSON.stringify(creature, undefined, 2))

  return creature
}

export default createCreature
