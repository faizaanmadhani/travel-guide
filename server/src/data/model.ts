import { model } from "mongoose";
import { IUser, IPlan, IPlanBlock } from "./interface";
import { userSchema, planSchema, planBlockSchema } from "./schema";

export const UserModel = model<IUser>("User", userSchema);
export const PlanModel = model<IPlan>("Plan", planSchema);
export const PlanBlockModel = model<IPlanBlock>("PlanBlock", planBlockSchema);
