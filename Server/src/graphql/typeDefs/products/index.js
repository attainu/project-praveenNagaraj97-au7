import { gql } from "apollo-server-express";

const ProductTypeDefs = gql`
  extend type Query {
    "This **Query** Provides List of all categories with Icon"
    getAllCategories: [Category]

    "This **Query** will get list of all categories along with the products associated with it."
    getAllCategoriesWithItsProduct: [CategoryWithProducts]

    "This **Query** provides all products along with it's Category Detail"
    getAllProducts: [Product]
  }

  extend type Mutation {
    getProductBasedOnCategory(name: String): [Product]
  }

  type Category {
    _id: ID!
    categoryName: String!
    categoryIcon: String!
  }

  type CategoryWithProducts {
    category: Category!
    products: [Product!]
  }

  type Product {
    _id: ID!
    productName: String!
    productCoverImage: String!
    categoryId: Category!
    productPrice: Float!
  }
`;

export default ProductTypeDefs;
