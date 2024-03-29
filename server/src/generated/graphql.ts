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

export type AddWishlistPlanInput = {
  userID: Scalars['String'];
  planID: Scalars['String'];
};

export enum BlockType {
  Eat = 'EAT',
  Activity = 'ACTIVITY',
  Route = 'ROUTE',
  Sight = 'SIGHT'
}

export type CreateUserInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  profile_pic: Scalars['String'];
  password: Scalars['String'];
};

export type FilterInput = {
  countries?: Maybe<Array<Maybe<Scalars['String']>>>;
  rating?: Maybe<Array<Maybe<Scalars['Int']>>>;
  budget?: Maybe<Array<Maybe<Scalars['Int']>>>;
  months?: Maybe<Array<Maybe<Scalars['String']>>>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser: User;
  addPlan: Plan;
  modifyPlan?: Maybe<Plan>;
  modifyUser?: Maybe<User>;
  addPlanBlock: PlanBlock;
  addWishlistPlan?: Maybe<User>;
  removeWishlistPlan?: Maybe<User>;
  updateWishlistPlan?: Maybe<User>;
};


export type MutationAddUserArgs = {
  input: CreateUserInput;
};


export type MutationAddPlanArgs = {
  creatorId: Scalars['String'];
};


export type MutationModifyPlanArgs = {
  input: UpdatePlanInput;
};


export type MutationModifyUserArgs = {
  input: UpdateUserInput;
};


export type MutationAddPlanBlockArgs = {
  input: UpdatePlanBlockInput;
};


export type MutationAddWishlistPlanArgs = {
  input: AddWishlistPlanInput;
};


export type MutationRemoveWishlistPlanArgs = {
  input: AddWishlistPlanInput;
};


export type MutationUpdateWishlistPlanArgs = {
  input: AddWishlistPlanInput;
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
  assetLinks?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type PlanBlocksArgs = {
  day: Scalars['Int'];
};

export type PlanBlock = {
  __typename?: 'PlanBlock';
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  price?: Maybe<Scalars['Int']>;
  day?: Maybe<Scalars['Int']>;
  externalUrl?: Maybe<Array<Maybe<Scalars['String']>>>;
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
  filteredTags: Array<Tag>;
  authenticateUser: User;
  authUserEmail: User;
  verifyEmail: User;
  getUserID: User;
  getUserPlans?: Maybe<Array<Maybe<Plan>>>;
  getWishlistPlans?: Maybe<Array<Maybe<Plan>>>;
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


export type QueryFilteredTagsArgs = {
  input: TagInput;
};


export type QueryAuthenticateUserArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type QueryAuthUserEmailArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type QueryVerifyEmailArgs = {
  email: Scalars['String'];
};


export type QueryGetUserIdArgs = {
  username: Scalars['String'];
  email: Scalars['String'];
};


export type QueryGetUserPlansArgs = {
  id: Scalars['String'];
};


export type QueryGetWishlistPlansArgs = {
  id: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  name: Scalars['String'];
};

export type TagInput = {
  keywords?: Maybe<Scalars['String']>;
};

export type UpdatePlanBlockInput = {
  location?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  links?: Maybe<Array<Maybe<Scalars['String']>>>;
  day?: Maybe<Scalars['Int']>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UpdatePlanInput = {
  name?: Maybe<Scalars['String']>;
  creatorId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  budget?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['Int']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  assetLinks?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UpdateUserInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  profile_pic?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  randStr?: Maybe<Scalars['String']>;
  emailValid?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  profile_pic: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
  randStr: Scalars['String'];
  emailValid: Scalars['Int'];
  savedPlans?: Maybe<Array<Maybe<Scalars['ID']>>>;
  wishlistPlans?: Maybe<Array<Maybe<Scalars['ID']>>>;
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
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Plan: ResolverTypeWrapper<Plan>;
  PlanBlock: ResolverTypeWrapper<PlanBlock>;
  FilterInput: FilterInput;
  TagInput: TagInput;
  Tag: ResolverTypeWrapper<Tag>;
  Mutation: ResolverTypeWrapper<{}>;
  CreateUserInput: CreateUserInput;
  UpdatePlanInput: UpdatePlanInput;
  UpdateUserInput: UpdateUserInput;
  UpdatePlanBlockInput: UpdatePlanBlockInput;
  AddWishlistPlanInput: AddWishlistPlanInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BlockType: BlockType;
  PrefInput: PrefInput;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Preference: ResolverTypeWrapper<Preference>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars['String'];
  User: User;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Plan: Plan;
  PlanBlock: PlanBlock;
  FilterInput: FilterInput;
  TagInput: TagInput;
  Tag: Tag;
  Mutation: {};
  CreateUserInput: CreateUserInput;
  UpdatePlanInput: UpdatePlanInput;
  UpdateUserInput: UpdateUserInput;
  UpdatePlanBlockInput: UpdatePlanBlockInput;
  AddWishlistPlanInput: AddWishlistPlanInput;
  Boolean: Scalars['Boolean'];
  PrefInput: PrefInput;
  Float: Scalars['Float'];
  Preference: Preference;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAddUserArgs, 'input'>>;
  addPlan?: Resolver<ResolversTypes['Plan'], ParentType, ContextType, RequireFields<MutationAddPlanArgs, 'creatorId'>>;
  modifyPlan?: Resolver<Maybe<ResolversTypes['Plan']>, ParentType, ContextType, RequireFields<MutationModifyPlanArgs, 'input'>>;
  modifyUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationModifyUserArgs, 'input'>>;
  addPlanBlock?: Resolver<ResolversTypes['PlanBlock'], ParentType, ContextType, RequireFields<MutationAddPlanBlockArgs, 'input'>>;
  addWishlistPlan?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationAddWishlistPlanArgs, 'input'>>;
  removeWishlistPlan?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationRemoveWishlistPlanArgs, 'input'>>;
  updateWishlistPlan?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateWishlistPlanArgs, 'input'>>;
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
  blocks?: Resolver<Maybe<Array<ResolversTypes['PlanBlock']>>, ParentType, ContextType, RequireFields<PlanBlocksArgs, 'day'>>;
  countries?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  months?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  assetLinks?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlanBlockResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PlanBlock'] = ResolversParentTypes['PlanBlock']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  day?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  externalUrl?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
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
  filteredTags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryFilteredTagsArgs, 'input'>>;
  authenticateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryAuthenticateUserArgs, 'username' | 'password'>>;
  authUserEmail?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryAuthUserEmailArgs, 'email' | 'password'>>;
  verifyEmail?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryVerifyEmailArgs, 'email'>>;
  getUserID?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserIdArgs, 'username' | 'email'>>;
  getUserPlans?: Resolver<Maybe<Array<Maybe<ResolversTypes['Plan']>>>, ParentType, ContextType, RequireFields<QueryGetUserPlansArgs, 'id'>>;
  getWishlistPlans?: Resolver<Maybe<Array<Maybe<ResolversTypes['Plan']>>>, ParentType, ContextType, RequireFields<QueryGetWishlistPlansArgs, 'id'>>;
};

export type TagResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profile_pic?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  randStr?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailValid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  savedPlans?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  wishlistPlans?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Mutation?: MutationResolvers<ContextType>;
  Plan?: PlanResolvers<ContextType>;
  PlanBlock?: PlanBlockResolvers<ContextType>;
  Preference?: PreferenceResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
