import { model } from "mongoose";
import { IUser, IPlan, IPlanBlock, ITag } from "./interface";
import { userSchema, planSchema, planBlockSchema, tagSchema } from "./schema";

export const UserModel = model<IUser>("User", userSchema);
export const PlanModel = model<IPlan>("Plan", planSchema);
export const PlanBlockModel = model<IPlanBlock>("PlanBlock", planBlockSchema);
export const TagModel = model<ITag>("Tag", tagSchema);