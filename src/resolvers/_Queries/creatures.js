import { getUserID } from "../../utils/Cryptic";
import { validateArg } from "../../utils/Validation";

//Get all Creatures of the Users Project OR Event
const creatures = async (parent, args, { prisma, request }, info) => {
  let opArgs = {};

  if (args.fromRulebook) {
    opArgs.where = {
      AND: [
        {
          rulebook: await validateArg(args.fromRulebook)
        },
        {
          author: {
            id: "cjqxu6075005y0961a4y57e8o"
          }
        }
      ]
    };
  } else {
    opArgs.where = {
      AND: [
        {
          author: {
            id: await getUserID(request)
          }
        },
        {
          event: {
            OR: [
              {
                project: {
                  OR: [
                    {
                      title: await validateArg(args.projectTitle)
                    },
                    {
                      id: await validateArg(args.projectID)
                    }
                  ]
                }
              },
              {
                title: await validateArg(args.eventTitle)
              },
              {
                id: await validateArg(args.eventID)
              }
            ]
          }
        }
      ]
    };
  }

  return prisma.query.creatures(opArgs, info);
};

//creatures(projectID: ID, projectTitle: String, eventID: ID, eventTitle: String): [Creature!]!

export default creatures;
