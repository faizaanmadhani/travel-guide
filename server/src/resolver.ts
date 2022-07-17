import { Resolvers } from "./generated/graphql";

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
export const resolvers: Resolvers = {
  Query: {
    user: (_, args, context) =>
      context.dataSources.userProvider.getUser(args.id),
    users: (_, __, context) => context.dataSources.userProvider.getUsers(),
    plan: (_, args, context) =>
      context.dataSources.planProvider.getPlan(args.id),
    plans: (_, __, context) => context.dataSources.planProvider.getAllPlans(),
    filteredPlans: (_, args, context) =>
      context.dataSources.planProvider.getFilteredPlans(args.input),
    authenticateUser: (_, args, context) =>
      context.dataSources.userProvider.authenticateUser(
        args.username,
        args.password
      ),
    authUserEmail: (_, args, context) =>
      context.dataSources.userProvider.authUserEmail(
        args.email,
        args.password
      ),
    getUserID: (_, args, context) =>
      context.dataSources.userProvider.getUserID(
        args.username,
        args.email
      ),
  },
  Mutation: {
    addUser: (_, args, context) =>
      context.dataSources.userProvider.createUser(args.input),
    addPlan: async (_, args, context) => {
      console.log("The args", args);
      const newPlan = await context.dataSources.planProvider.createPlan(
        args.creatorId
      );
      console.log(newPlan);
      return newPlan;
    },
    modifyPlan: (_, args, context) =>
      context.dataSources.planProvider.updatePlan(args.input),
    modifyUser: (_, args, context) =>
      context.dataSources.userProvider.updateUser(args.input),
  },
  User: {
    // prefs: (parent, __, context) =>
    //   context.dataSources.userProvider.getPrefs(parent.id),
    savedPlans: (parent, __, context) =>
      context.dataSources.userProvider.getPlansFromUser(parent.id),
  },
  Plan: {
    creator: (parent, __, context) =>
      context.dataSources.userProvider.getUser(parent.creatorId),
    blocks: (parent, args, context) =>
      context.dataSources.planBlockProvider.getPlanBlocksByPlanAndDay(
        parent.id,
        args.day
      ),
  },
};
