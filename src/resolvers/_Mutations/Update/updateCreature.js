import { getUserID } from '../../../utils/Cryptic'

const updateCreature = async (
  parent,
  { id, data },
  { prisma, request },
  info
) => {
  const creatureExists = prisma.exists.Creature({
    id
  })

  await getUserID(request) //will throw an error if user is not authenticated

  if (!creatureExists) throw new Error('Unable to find Creature')

  const updatedCreature = await prisma.mutation.updateCreature(
    {
      data: {
        ...data,
        attributes: {
          update: {
            ...data.attributes
          }
        },
        Conditions: {
          update: {
            physical: {
              update: {
                fitness: {
                  update: {
                    ...data.Conditions.physical.fitness
                  }
                }
              }
            },
            spiritual: {
              update: {
                corruption: {
                  update: {
                    ...data.Conditions.spiritual.corruption
                  }
                }
              }
            }
          }
        }
      },
      where: {
        id
      }
    },
    info
  )

  return updatedCreature
}

export default updateCreature
