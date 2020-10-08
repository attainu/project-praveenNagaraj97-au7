import {
  ApolloError,
  AuthenticationError,
  withFilter,
} from "apollo-server-express";
import Mongoose from "mongoose";
import { authCheck } from "../../middleware";

const MESSENGER = "MESSENGER";

const ChatResolvers = {
  Query: {
    getMyChats: async (parent, args, { User, Chat, req }, info) => {
      const { user, error } = await authCheck(req, User);

      if (error) return AuthenticationError(error);

      const { withWhom } = args;

      if (!withWhom) return new ApolloError("Provide ID of end User!", 422);
      const chats = await Chat.findOne({
        sender: String(user._id),
        reciever: String(withWhom),
      });

      if (!chats) return new ApolloError("No Chats Found", 204);

      const result = {
        message: `Chats between ${chats.sender.name} and ${chats.reciever.name}`,
        chats: chats.chats,
      };

      return result;
    },
  },

  Mutation: {
    sendMessage: async (parent, args, { User, Chat, req, pubsub }, info) => {
      const input = { ...args };

      if (!input.to) return new ApolloError("Enter the sender Detail", 422);
      if (!input.message)
        return new ApolloError("Message cannot be empty", 422);

      const { error, user } = await authCheck(req, User);
      if (error) return new AuthenticationError(error);

      if (input.to == user._id)
        return new ApolloError(
          "You are not allowed to send message to yourseld",
          422
        );

      const to = Mongoose.Types.ObjectId(input.to);

      const chats = {
        from: user._id,
        to,
        message: input.message,
      };

      // Check If Chat Box exist between reciever and sender!
      const chatExist = await Chat.findOne({
        sender: user._id,
        reciever: to,
      });

      let writtenData;

      if (!chatExist || chatExist.length < 1) {
        await Chat.create({
          sender: user._id,
          reciever: input.to,
        });

        await Chat.create({
          sender: input.to,
          reciever: user._id,
        });

        writtenData = await Chat.findOneAndUpdate(
          { sender: user._id },
          { $push: { chats } },
          {
            upsert: true,
            runValidators: true,
            setDefaultsOnInsert: true,
            context: "query",
            new: true,
          }
        );

        await await Chat.findOneAndUpdate(
          { sender: to },
          { $push: { chats } },
          {
            upsert: true,
            runValidators: true,
            setDefaultsOnInsert: true,
            context: "query",
            new: true,
          }
        );
      } else {
        writtenData = await Chat.findOneAndUpdate(
          { sender: user._id },
          { $push: { chats } },
          {
            upsert: true,
            runValidators: true,
            setDefaultsOnInsert: true,
            context: "query",
            new: true,
          }
        );

        await Chat.findOneAndUpdate(
          { sender: to },
          { $push: { chats } },
          {
            upsert: true,
            runValidators: true,
            setDefaultsOnInsert: true,
            context: "query",
            new: true,
          }
        );
      }

      await pubsub.publish(MESSENGER, {
        messenger: writtenData,
      });

      return writtenData;
    },
  },

  Subscription: {
    messenger: {
      subscribe: withFilter(
        (parent, args, { pubsub }, info) => pubsub.asyncIterator([MESSENGER]),
        ({ messenger }, args, context, info) => {
          return true;
        }
      ),
    },
  },
};

export default ChatResolvers;
