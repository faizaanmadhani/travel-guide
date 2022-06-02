import { Types } from "mongoose";

export interface IPrefs {
  _id: Types.ObjectId;
  pref_tag: string;
  user_rating: Types.Decimal128;
}

export interface IUser {
  name: string;
  email: string;
  profile_pic: string;
  prefs: Types.DocumentArray<IPrefs>;
  saved_plans?: Types.Array<Types.ObjectId>;
}

export interface IPlan {
  name: string;
  creator: Types.ObjectId;
  rating: number;
  budget: number;
  tags: Types.Array<string>;
  description: string;
  blocks: Types.Array<Types.ObjectId>;
}

export interface IPlanBlock {
  title: string;
  description: string;
  tags: Types.Array<string>;
  type: string;
  images?: Types.Array<string>;
  map_id?: string;
  location_url?: string;
  audio?: string;
  video?: string;
}
