import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import connectDB from "./db/db.js";
import { typeDefs } from "./graphql/types.js";
import { resolvers } from "./graphql/resolvers.js";
import { validateToken } from "./utils/tokenUtils.js";

const getUserData = (token) => {
  const verificacion = validateToken(token.split(" ")[1]);
  if (verificacion.data) {
    return verificacion.data;
  } else {
    return null;
  }
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    const token = req.headers?.authorization ?? null;
    if (token) {
      const userData = getUserData(token);
      //("user data: ", userData);
      if (userData) {
        return { userData };
      }
      return null;
    }
  },
});

const app = express();

app.use(express.json());
app.use(cors());

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await app.listen(process.env.PORT || 5000, async () => {
      await server.start();
      server.applyMiddleware({ app });
    });
  } catch (err) {
    console.log(err);
  }
};

start();
