import { Schema, Types } from "mongoose";
import { IUser, IPlan, IPlanBlock } from "./interface";

export const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  profile_pic: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, required: false },
  randStr: {type: String, required: true},
  emailValid: {type: Number, required: true},

  saved_plans: [
    { type: Schema.Types.ObjectId, required: false, ref:"Plan" },
  ],
  wishlist_plans: [
    { type: Schema.Types.ObjectId, required: false, ref: "Plan" },
  ],
});

export const planSchema = new Schema<IPlan>({
  name: { type: String, required: false },
  creator: { type: Schema.Types.ObjectId, required: false, ref: "User" },
  rating: { type: Number, required: false },
  budget: { type: Number, required: false },
  tags: { type: [String], required: false },
  description: { type: String, required: false },
  blocks: { type: [Types.ObjectId], required: false, ref: "PlanBlock" },
  countries: { type: [String], required: false },
  months: { type: [String], required: false },
  imageUrl: { type: String, required: false },
  dayLabels: { type: [String], required: false },
});

export const planBlockSchema = new Schema<IPlanBlock>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  images: { type: String, required: false },
  day: { type: Number, required: true },
  imageUrl: { type: String, required: false },
  lat: { type: Number, required: false },
  long: { type: Number, required: false },
});

// const run = async () => {
//   const url = "mongodb://localhost:27017/my_db";
//   await connect(url);

// };

// run().catch((error) => console.log(error));
