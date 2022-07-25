import { gql } from "apollo-server";
export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    profile_pic: String!
    password: String!
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
    blocks(day: Int!): [PlanBlock!]
    countries: [String!]!
    months: [String!]!
    imageUrl: String!
    dayLabels: [String!]!
  }

  type PlanBlock {
    id: ID
    title: String
    day: Int
    description: String
    # type: BlockType!
    # mapId: String! #Something to help render gmaps url. Maybe a google maps link
    # locationUrl: String # External link to the location
    # Store some links additional assets
    # audio: String!
    # video: String!
    price: Int
    imageUrl: String
    lat: Float
    long: Float
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
    filteredPlans(input: FilterInput!): [Plan!]!
    authenticateUser(username: String!, password: String!): User!
  }

  type Mutation {
    addUser(input: CreateUserInput!): User!
    addPlan(creatorId: String!): Plan!
    modifyPlan(input: UpdatePlanInput!): Plan
    addPlanBlock(input: UpdatePlanBlockInput!): PlanBlock!
    modifyPlanBlock(id: String!, input: UpdatePlanBlockInput!): PlanBlock
    deletePlan(id: String!): Plan
    deleteBlock(id: String!): PlanBlock
  }

  input FilterInput {
    countries: [String]
    rating: [Int]
    budget: [Int]
    months: [String]
  }

  input PrefInput {
    prefTag: String!
    userRating: Float
  }

  input CreateUserInput {
    name: String!
    email: String!
    profile_pic: String!
    password: String!
  }

  input UpdatePlanInput {
    name: String
    creatorId: String
    id: String
    budget: Int # Number between 1 and 4 representing num $ signs
    rating: Int # value between 1 and 5
    tags: [String]
    description: String
    imageUrl: String
    countries: String!
    months: String!
  }

  input UpdatePlanBlockInput {
    planID: String
    location: String
    description: String
    title: String
    price: Int
    links: [String]
    day: Int
    imageUrl: String
    lat: Float
    long: Float
    dayLabels: String
    countries: [String]
    months: [String]
  }
`;
