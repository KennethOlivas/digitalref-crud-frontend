import { gql } from "@apollo/client";

// Login mutation
export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      error
      accessToken
      refreshToken
    }
  }
`;

//Register mutation

/* mutation{
  register(email: "juan@gmail.com", password:"3312", username:"juan"){
    error,
    message,
    success
  }
}
*/

export const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!, $username: String!) {
    register(email: $email, password: $password, username: $username) {
      error
      message
      success
    }
  }
`;


// delete product graphql mutation
export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

// create product graphql mutation
export const CREATE_PRODUCT_QUERY = gql`
  mutation CreateProduct(
    $name: String!
    $description: String!
    $price: Float!
    $quantity: Int!
  ) {
    createProduct(
      name: $name
      description: $description
      price: $price
      quantity: $quantity
    ) {
      id
      name
      description
      price
      quantity
    }
  }
`;

// update product graphql mutation
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: Int!
    $name: String!
    $description: String!
    $price: Float!
    $quantity: Int!
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      price: $price
      quantity: $quantity
    ) {
      id
      name
      description
      price
      quantity
    }
  }
`;