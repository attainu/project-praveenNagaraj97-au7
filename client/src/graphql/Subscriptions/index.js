import { gql } from "@apollo/client";

export const MESSAGE_SUBSCRIPTION = gql`
  subscription($userId: ID!) {
    messenger(userId: $userId) {
      chats {
        _id
        message
        from
      }
    }
  }
`;
