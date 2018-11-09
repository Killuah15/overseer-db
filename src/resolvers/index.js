import { extractFragmentReplacements } from "prisma-binding";
import Query from "./_Query";

const resolvers = {
  Query,
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers, fragmentReplacements };