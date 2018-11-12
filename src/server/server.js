import { GraphQLServer, PubSub } from "graphql-yoga"
import { resolvers, fragmentReplacements } from "../resolvers/index"
import prisma from "./prisma"

/*NOTE:
  context now has the following objects:
    prisma - prisma bindings instance
    request - express request object send on Query / Mutation (look at express docs if needed)
    response - express request object send on Query / Mutation (look at express docs if needed)
    connection - a GraphQL Specific object, send by Subscriptions (probably not important to us)
*/
const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers,
    context(request) {
      return {
        ...request,
        prisma,
      }
    },
    fragmentReplacements
  })
  
  export default server