import { GraphQLClient } from "graphql-request";

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "";

export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT);