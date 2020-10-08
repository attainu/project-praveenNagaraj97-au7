import { ApolloError } from "apollo-server-express";
import { generateJWToken } from "../../utils/jsonWebToken";

// Resolvers
const UserAuthenticationResolvers = {
  Mutation: {
    signUp: async (parent, args, { User }, info) => {
      const user = await User.create({ ...args.data });
      if (!user) return new ApolloError("SignUp Failed", 401);
      const token = await generateJWToken({ id: user._id });

      const responseMessage = {
        _id: user._id,
        message: "SignedUp successfully.",
        token,
      };

      return responseMessage;
    },

    signIn: async (parent, args, { User }, info) => {
      const user = await User.findOne({ email: args.data.email }).select(
        "+password"
      );
      if (!user)
        return new ApolloError(`No user found with ${args.data.email}`, 401);

      const validPassword = await user.comparePassword(
        args.data.password,
        user.password
      );
      if (!validPassword)
        return new ApolloError("Entered password is wrong", 401);

      const JWToken = await generateJWToken(
        { id: user._id },
        args.data.keepLoggedIn ? "infinite" : "24h"
      );

      const responseMessage = {
        message: "User Logged In Successfully",
        _id: user._id,
        token: JWToken,
      };

      return responseMessage;
    },
  },
};

export default UserAuthenticationResolvers;
