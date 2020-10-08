import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES = gql`
  query {
    getAllCategories {
      _id
      categoryName
      categoryIcon
    }
  }
`;

export const GET_CHAT_HISTORY = gql`
  query {
    getMyChats(withWhom: "5f6f929a72cc0796e4115075") {
      message
      chats {
        _id
        from
        message
      }
    }
  }
`;
