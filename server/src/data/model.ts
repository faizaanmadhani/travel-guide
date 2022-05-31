import { model } from "mongoose";
import { IUser, IPlan } from "./interface";
import { userSchema, planSchema } from "./schema";

export const User = model<IUser>("User", userSchema);
export const Plan = model<IPlan>("Plan", planSchema);
