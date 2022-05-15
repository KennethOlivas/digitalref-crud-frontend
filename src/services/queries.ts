import { gql } from "@apollo/client";

//get products list graphql query
export const GET_PRODUCTS_LIST = gql`
  query {
    Products(sort: NAME_ASC) {
      edges {
        node {
          id
          name
          price
          description
          quantity
        }
      }
    }
  }
`;
