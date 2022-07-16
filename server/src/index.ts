import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";

import { UserProvider, PlanProvider, PlanBlockProvider, TagProvider } from "./provider";
import { resolvers } from "./resolver";
import { typeDefs } from "./typedefs";
import { connect } from "mongoose";
import { DB_URL } from "./config";
// import { UserModel, PlanModel } from "./data/model";
// import { PlanModel } from "./data/model";
import Multer from "multer";
import ImgUpload from "./helpers/imgUpload";

export interface Context {
  dataSources: {
    userProvider: UserProvider;
    planProvider: PlanProvider;
    planBlockProvider: PlanBlockProvider;
    tagProvider: TagProvider;
  };
}

async function startApolloServer() {
  const app = express();
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
      tagProvider: new TagProvider(),
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
  });

  const initDb = async () => {
    await connect(DB_URL);
    // const samplePlan = new PlanModel({
    //   name: "Travel through France",
    //   creator: "629866d100dc6494a0668401",
    //   rating: 5,
    //   budget: 2,
    //   tags: ["outdoor", "museum", "easy"],
    //   description: "Travel through france on this plan",
    //   blocks: [],
    //   countries: ["Canada", "Brazil", "Austria"],
    //   months: ["Jan", "Feb"],
    // });

    // const samplePlan2 = new PlanModel({
    //   name: "Travel through Italy",
    //   creator: "629866d100dc6494a0668401",
    //   rating: 4,
    //   budget: 5,
    //   tags: ["indoor", "sightseeing", "long"],
    //   description: "travel through italy with us",
    //   blocks: [],
    //   countries: ["Vietnam", "South Korea", "France"],
    //   months: ["Mar", "Apr"],
    // });

    // const samplePlan3 = new PlanModel({
    //   name: "Travel through Germany",
    //   creator: "629866d100dc6494a0668401",
    //   rating: 5,
    //   budget: 1,
    //   tags: ["outdoor", "hiking", "food"],
    //   description: "A journey through Germany",
    //   blocks: [],
    //   countries: ["China", "Spain", "England"],
    //   months: ["Nov"],
    // });

    // const user = new UserModel({
    //   name: "Faizaan",
    //   email: "fzmadhani@gmail.com",
    //   profile_pic: "Hi",
    //   password: "123",
    //   prefs: [
    //     {
    //       pref_tag: "outdoors",
    //       user_rating: 1,
    //     },
    //   ],
    // });

    // // await user.save();
    // await samplePlan.save();
    // await samplePlan2.save();
    // await samplePlan3.save();
  };

  // This `listen` method launches a web-server.  Existing apps
  // can utilize middleware options, which we'll discuss later.

  await server.start();
  initDb().catch((err) => console.error(err));
  server.applyMiddleware({
    app,
    path: "/",
  });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer().catch((e) => console.log("Big ERROR", e));

const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024,
});

const router = express.Router();

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
