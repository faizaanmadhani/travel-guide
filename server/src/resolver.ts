import { gql } from "apollo-server";
import { IResolvers } from "./generated/graphql";

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
export const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    profile_pic: String!
    prefs: [Preference!]!
    savedPlans: [Plan!]!
  }
  
  type Preference {
    prefTag: String! # We'd need to enforce this somehow, but we can do this in the app
    userRating: Float # Decimal value between 0 and 1 which we modify based on user interests
  }
  
  type Plan {
    id: ID!
    name: String!
    creator: User! # Link to using user_id
    budget: Int! # Number between 1 and 4 representing num $ signs
    rating: Int! # value between 1 and 5
    tags: [String!]!
    description: String!
    blocks: [PlanBlock!]!
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
  }
  
  enum BlockType {
    EAT #food places, something to eat
    ACTIVITY # things to do
    TRAVEL # for journeys from one place to another
    SIGHT # things to see
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    book(id: Int!): Book
    books: [Book]
    user(id: String!): User!
	  users: [User!]!
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
export const resolvers: IResolvers = {
  Query: {
    book: (_, args, ctx) => ctx.dataSources.booksProvider.getBook(args),
    books: (_, __, ctx) => ctx.dataSources.booksProvider.getBooks()
  }
};
