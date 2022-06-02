import { model } from "mongoose";
import { IUser, IPlan, IPlanBlock } from "./interface";
import { userSchema, planSchema, planBlockSchema } from "./schema";

export const User = model<IUser>("User", userSchema);
export const Plan = model<IPlan>("Plan", planSchema);
export const PlanBlock = model<IPlanBlock>("PlanBlock", planBlockSchema);
