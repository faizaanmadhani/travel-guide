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
  password: string;
  token: string;
  randStr: string;
  emailValid: number;
  prefs: Types.DocumentArray<IPrefs>;
  saved_plans?: Types.Array<Types.ObjectId>;
  wishlist_plans: Types.Array<Types.ObjectId>;
}

export interface IPlan {
  name: string;
  creator: Types.ObjectId;
  rating: number;
  budget: number;
  tags: Types.Array<string>;
  description: string;
  blocks: Types.Array<Types.ObjectId>;
  countries: Types.Array<string>;
  months: Types.Array<string>;
  imageUrl: string;
  dayLabels: Types.Array<string>;
}

export interface IPlanBlock {
  title: string;
  description: string;
  images?: Types.Array<string>;
  links: Types.Array<string>;
  price: number;
  location: string;
  day: number;
  lat: number;
  long: number;
  imageUrl: string;
}

export interface ITag {
  name: string;
}
