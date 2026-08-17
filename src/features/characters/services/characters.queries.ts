import { gql } from "graphql-request";

export const GET_CHARACTERS_QUERY = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info { count pages next prev }
      results { id name status species image }
    }
  }
`;

export const GET_CHARACTER_BY_ID_QUERY = gql`
  query GetCharacterById($id: ID!) {
    character(id: $id) { id name status species image }
  }
`;
