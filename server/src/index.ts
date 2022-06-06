import { ApolloServer } from "apollo-server";

import { UserProvider, PlanProvider, PlanBlockProvider } from "./provider";
import { resolvers, typeDefs } from "./resolver";
import { connect } from "mongoose";
import { DB_URL } from "./config";
import { UserModel, PlanModel } from "./data/model";

// This is where we define the context type which is used
// to have correct typing when using context in the resolvers.
export interface Context {
  dataSources: {
    userProvider: UserProvider;
    planProvider: PlanProvider;
    planBlockProvider: PlanBlockProvider;
  };
}

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
});

const initDb = async () => {
  await connect(DB_URL);
  const samplePlan = new PlanModel({
    name: "Travel through France",
    creator: "629866d100dc6494a0668401",
    rating: 5,
    budget: 2,
    tags: ["outdoor", "museum", "easy"],
    description: "Travel through france on this plan",
    blocks: [],
  });

  const samplePlan2 = new PlanModel({
    name: "Travel through Italy",
    creator: "629866d100dc6494a0668401",
    rating: 4,
    budget: 5,
    tags: ["indoor", "sightseeing", "long"],
    description: "travel through italy with us",
    blocks: [],
  });

  const samplePlan3 = new PlanModel({
    name: "Travel through Germany",
    creator: "629866d100dc6494a0668401",
    rating: 5,
    budget: 1,
    tags: ["outdoor", "hiking", "food"],
    description: "A journey through Germany",
    blocks: [],
  });

  const user = new UserModel({
    name: "Faizaan",
    email: "fzmadhani@gmail.com",
    profile_pic: "Hi",
    prefs: [
      {
        pref_tag: "outdoors",
        user_rating: 1,
      },

    ],
  });

  await user.save();
  await samplePlan.save();
  await samplePlan2.save();
  await samplePlan3.save();
};

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  initDb().catch((err) => console.error(err));
  console.log(`🚀  Server ready at ${url}`); // tslint:disable-line no-console
});
