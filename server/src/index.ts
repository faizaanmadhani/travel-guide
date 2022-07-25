import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";

import { UserProvider, PlanProvider, PlanBlockProvider } from "./provider";
import { resolvers } from "./resolver";
import { typeDefs } from "./typedefs";
import { connect } from "mongoose";
import { DB_URL } from "./config";
// import { UserModel, PlanModel } from "./data/model";
// import { PlanModel } from "./data/model";
import Multer from "multer";
import ImgUpload from "./helpers/imgUpload";
import { getPayload } from "./util";

export interface Context {
  dataSources: {
    userProvider: UserProvider;
    planProvider: PlanProvider;
    planBlockProvider: PlanBlockProvider;
  };
  loggedIn: boolean;
  user: String;
}

const app = express();

const router = express.Router();

const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024,
});

router.post(
  "/image-upload",
  multer.single("image"),
  ImgUpload.uploadToGcs,
  function(request: any, response: any, _) {
    console.log("right endpoint triggered", request);
    const data = request.body;
    if (request.file && request.file.cloudStoragePublicUrl) {
      data.imageUrl = request.file.cloudStoragePublicUrl;
    }
    response.send(data);
  }
);

app.use("/", router);

async function startApolloServer(app: any) {
  const httpServer = http.createServer(app);

  // This is where we define the context type which is used
  // to have correct typing when using context in the resolvers.

  // This is where we define the dataSources which can be
  // used to retrieve data from the resolvers.
  const dataSources = (): Context["dataSources"] => {
    return {
      userProvider: new UserProvider(),
      planProvider: new PlanProvider(),
      planBlockProvider: new PlanBlockProvider(),
    };
  };

  // In the most basic sense, the ApolloServer can be started
  // by passing type definitions (typeDefs) and the resolvers
  // responsible for fetching the data for those types.
  const server = new ApolloServer({
    typeDefs,
    // @ts-ignore (FIXME: should be casted to default Resolvers type?)
    resolvers,
    dataSources,
    context: ({ req }) => {
      // Note: This example uses the `req` argument to access headers,
      // but the arguments received by `context` vary by integration.
      // This means they vary for Express, Koa, Lambda, etc.
      //
      // To find out the correct arguments for a specific integration,
      // see https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields

      // Get the user token from the headers.
      let token = req.headers.authorization || "";
      if (token) token = token.split(" ")[1];
      // console.log("token HERE", req.headers.authorization);
      // Try to retrieve a user with the token
      const { payload: user, loggedIn } = getPayload(token);
      // console.log("user HERE", user);

      // Add the user to the context
      console.log("[CONTEXT]", "logged in:", loggedIn, "user_id:", user.id);

      return { loggedIn: loggedIn, user: user.id };
    },
  });

  const initDb = async () => {
    await connect(DB_URL);
  };

  // This `listen` method launches a web-server.  Existing apps
  // can utilize middleware options, which we'll discuss later.

  await server.start();
  initDb().catch((err) => console.error(err));
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: corsConfig,
  });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(app).catch((e) => console.log("Big ERROR", e));

var nodemailer = require("nodemailer");

export var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "wandr497@gmail.com",
    pass: "hepvigybygnzmutg",
  },
});

const corsConfig = {
  credentials: true,
  allowedHeaders: ["Authorization"],
  exposedHeaders: ["Authorization"],
};
