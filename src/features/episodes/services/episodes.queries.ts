import { gql } from "graphql-request";

export const GET_EPISODES_QUERY = gql`
  query GetEpisodes { episodes { results { id name episode air_date } } }
`;
