import { Schema, Types } from "mongoose";
import { IUser, IPlan, IPlanBlock } from "./interface";

export const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  profile_pic: { type: String, required: true },
  password: { type: String, required: true },
  // prefs: [
  //   {
  //     pref_tag: { type: String, required: true },
  //     user_rating: { type: Schema.Types.Decimal128, required: true },
  //   },
  // ],
  saved_plans: [
    { type: [Schema.Types.ObjectId], required: false, ref: "Plan" },
  ],
});

export const planSchema = new Schema<IPlan>({
  name: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  rating: { type: Number, required: true },
  budget: { type: Number, required: true },
  tags: { type: [String], required: true },
  description: { type: String, required: true },
  blocks: { type: [Types.ObjectId], required: true, ref: "PlanBlock" },
  countries: { type: [String], required: true },
  months: { type: [String], required: true },
  imageLinks: { type: [String], required: true },
});

export const planBlockSchema = new Schema<IPlanBlock>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  type: { type: String, required: true },
  images: { type: String, required: false },
  map_id: { type: String, required: false },
  location_url: { type: String, required: false },
  audio: { type: String, required: false },
  video: { type: String, required: false },
});

// const run = async () => {
//   const url = "mongodb://localhost:27017/my_db";
//   await connect(url);

// };

// run().catch((error) => console.log(error));
