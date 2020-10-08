const { gql } = require("@apollo/client");

export const SEND_MESSAGE = gql`
  mutation($message: String!) {
    sendMessage(to: "5f7226f5c31a6099fc44808a", message: $message) {
      chats {
        _id
        message
      }
      sender {
        name
      }
      reciever {
        name
      }
    }
  }
`;
