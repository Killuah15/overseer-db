import { extractFragmentReplacements } from "prisma-binding"
import Query from "./_Query"
import Mutation from "./_Mutation"

const resolvers = {
  Query,
  Mutation
}

const fragmentReplacements = extractFragmentReplacements(resolvers)

export { resolvers, fragmentReplacements }