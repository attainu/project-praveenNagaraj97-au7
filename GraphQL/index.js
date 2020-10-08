import { ApolloServer, PubSub } from "apollo-server";
import { connect } from "mongoose";
import dotenvConfig from "./config/dotenvConfig";

dotenvConfig();

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { Category, User, Product, Chat } from "./model";

const pubsub = new PubSub();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  subscriptions: {
    onConnect: () => console.log("websocket connected"),
    onDisconnect: () => console.log("websocket disconnected"),
  },
  context: ({ req, res }) => ({
    req,
    res,
    pubsub,
    Category,
    User,
    Product,
    Chat,
  }),
  tracing: true,
});

const PORT = process.env.PORT || 5050;

connect(process.env.URIS, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(
    apolloServer.listen(PORT, () => {
      console.log(`Lsitening on http://localhost:${PORT}/graphql`);
      console.log(`Database connection established`);
    })
  )
  .catch((err) => {
    console.log("Something went wrong!");
  });
