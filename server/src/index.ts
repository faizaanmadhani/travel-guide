import { ApolloServer } from "apollo-server";

import { UserProvider } from "./provider";
import { resolvers, typeDefs } from "./resolver";
import { connect } from "mongoose";
import { DB_URL } from "./config";
import { UserModel } from "./data/model";

// This is where we define the context type which is used
// to have correct typing when using context in the resolvers.
export interface Context {
  dataSources: {
    userProvider: UserProvider;
  };
}

// This is where we define the dataSources which can be
// used to retrieve data from the resolvers.
const dataSources = (): Context["dataSources"] => {
  return {
    userProvider: new UserProvider(),
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
};

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  initDb().catch((err) => console.error(err));
  console.log(`🚀  Server ready at ${url}`); // tslint:disable-line no-console
});
