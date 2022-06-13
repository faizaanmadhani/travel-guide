import { gql } from "apollo-server";
export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    profile_pic: String!
    prefs: [Preference]
    savedPlans: [Plan]
  }

  type Preference {
    prefTag: String! # We'd need to enforce this somehow, but we can do this in the app
    userRating: Float # Decimal value between 0 and 1 which we modify based on user interests
  }

  type Plan {
    id: ID!
    name: String!
    creator: User # Link to using user_id
    creatorId: String!
    budget: Int! # Number between 1 and 4 representing num $ signs
    rating: Int! # value between 1 and 5
    tags: [String!]!
    description: String!
    blocks: [PlanBlock!]
  }

  type PlanBlock {
    id: ID!
    title: String!
    description: String!
    tags: [String!]
    # type: BlockType!
    images: [String!] # Link to image urls. string at images[0] is first one displayed
    mapId: String! #Something to help render gmaps url. Maybe a google maps link
    locationUrl: String # External link to the location
    # Store some links additional assets
    audio: String!
    video: String!
    #
    externalUrl: [String!]
  }

  enum BlockType {
    EAT #food places, something to eat
    ACTIVITY # things to do
    ROUTE # for journeys from one place to another
    SIGHT # things to see
  }

  type Query {
    user(id: String!): User!
    users: [User!]!
    plan(id: String!): Plan!
    planBlock(id: String!): PlanBlock!
    plans: [Plan!]!
    planblocks: [PlanBlock!]!
  }

  type Mutation {
    addUser(input: CreateUserInput!): User!
    addPlan(input: CreatePlanInput!): Plan!
    #addPlanBlock(input: PlanBlockInput!)
    #modifyUser(input: UserInput!)
    #modifyPlan(input: modifyPlan!)
    #modifyPlanBlock(input: PlanBlockInput!)
  }

  input PrefInput {
    prefTag: String!
    userRating: Float
  }

  input CreateUserInput {
    name: String!
    email: String!
    profile_pic: String!
    prefs: [PrefInput]!
  }

  input CreatePlanInput {
    name: String!
    creatorId: String!
    budget: Int! # Number between 1 and 4 representing num $ signs
    rating: Int! # value between 1 and 5
    tags: [String!]!
    description: String!
  }
`;
