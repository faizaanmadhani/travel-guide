/* tslint:disable */
import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../index';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum BlockType {
  Eat = 'EAT',
  Activity = 'ACTIVITY',
  Travel = 'TRAVEL',
  Sight = 'SIGHT'
}

export type CreatePlanInput = {
  name: Scalars['String'];
  creatorId: Scalars['String'];
  budget: Scalars['Int'];
  rating: Scalars['Int'];
  tags: Array<Scalars['String']>;
  description: Scalars['String'];
};

export type CreateUserInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  profile_pic: Scalars['String'];
  prefs: Array<Maybe<PrefInput>>;
};

export type FilterInput = {
  countries?: Maybe<Array<Scalars['String']>>;
  rating: Scalars['Int'];
  budget: Scalars['Int'];
  months?: Maybe<Array<Scalars['String']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser: User;
  addPlan: Plan;
};


export type MutationAddUserArgs = {
  input: CreateUserInput;
};


export type MutationAddPlanArgs = {
  input: CreatePlanInput;
};

export type Plan = {
  __typename?: 'Plan';
  id: Scalars['ID'];
  name: Scalars['String'];
  creator?: Maybe<User>;
  creatorId: Scalars['String'];
  budget: Scalars['Int'];
  rating: Scalars['Int'];
  tags: Array<Scalars['String']>;
  description: Scalars['String'];
  blocks?: Maybe<Array<PlanBlock>>;
  countries: Array<Scalars['String']>;
  months: Array<Scalars['String']>;
};

export type PlanBlock = {
  __typename?: 'PlanBlock';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']>>;
  images?: Maybe<Array<Scalars['String']>>;
  mapId: Scalars['String'];
  locationUrl?: Maybe<Scalars['String']>;
  audio: Scalars['String'];
  video: Scalars['String'];
};

export type Preference = {
  __typename?: 'Preference';
  prefTag: Scalars['String'];
  userRating?: Maybe<Scalars['Float']>;
};

export type PrefInput = {
  prefTag: Scalars['String'];
  userRating?: Maybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  user: User;
  users: Array<User>;
  plan: Plan;
  planBlock: PlanBlock;
  plans: Array<Plan>;
  planblocks: Array<PlanBlock>;
  filteredPlans: Array<Plan>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryPlanArgs = {
  id: Scalars['String'];
};


export type QueryPlanBlockArgs = {
  id: Scalars['String'];
};


export type QueryFilteredPlansArgs = {
  input: FilterInput;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  profile_pic: Scalars['String'];
  prefs?: Maybe<Array<Maybe<Preference>>>;
  savedPlans?: Maybe<Array<Maybe<Plan>>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Preference: ResolverTypeWrapper<Preference>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Plan: ResolverTypeWrapper<Plan>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  PlanBlock: ResolverTypeWrapper<PlanBlock>;
  FilterInput: FilterInput;
  Mutation: ResolverTypeWrapper<{}>;
  CreateUserInput: CreateUserInput;
  PrefInput: PrefInput;
  CreatePlanInput: CreatePlanInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BlockType: BlockType;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars['String'];
  User: User;
  ID: Scalars['ID'];
  Preference: Preference;
  Float: Scalars['Float'];
  Plan: Plan;
  Int: Scalars['Int'];
  PlanBlock: PlanBlock;
  FilterInput: FilterInput;
  Mutation: {};
  CreateUserInput: CreateUserInput;
  PrefInput: PrefInput;
  CreatePlanInput: CreatePlanInput;
  Boolean: Scalars['Boolean'];
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAddUserArgs, 'input'>>;
  addPlan?: Resolver<ResolversTypes['Plan'], ParentType, ContextType, RequireFields<MutationAddPlanArgs, 'input'>>;
};

export type PlanResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Plan'] = ResolversParentTypes['Plan']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  creatorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  budget?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blocks?: Resolver<Maybe<Array<ResolversTypes['PlanBlock']>>, ParentType, ContextType>;
  countries?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  months?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlanBlockResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PlanBlock'] = ResolversParentTypes['PlanBlock']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  mapId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  locationUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  audio?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  video?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PreferenceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Preference'] = ResolversParentTypes['Preference']> = {
  prefTag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userRating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  plan?: Resolver<ResolversTypes['Plan'], ParentType, ContextType, RequireFields<QueryPlanArgs, 'id'>>;
  planBlock?: Resolver<ResolversTypes['PlanBlock'], ParentType, ContextType, RequireFields<QueryPlanBlockArgs, 'id'>>;
  plans?: Resolver<Array<ResolversTypes['Plan']>, ParentType, ContextType>;
  planblocks?: Resolver<Array<ResolversTypes['PlanBlock']>, ParentType, ContextType>;
  filteredPlans?: Resolver<Array<ResolversTypes['Plan']>, ParentType, ContextType, RequireFields<QueryFilteredPlansArgs, 'input'>>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profile_pic?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  prefs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Preference']>>>, ParentType, ContextType>;
  savedPlans?: Resolver<Maybe<Array<Maybe<ResolversTypes['Plan']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Mutation?: MutationResolvers<ContextType>;
  Plan?: PlanResolvers<ContextType>;
  PlanBlock?: PlanBlockResolvers<ContextType>;
  Preference?: PreferenceResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
