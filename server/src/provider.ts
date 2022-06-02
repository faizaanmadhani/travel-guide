import { DataSource } from "apollo-datasource";
import { PlanModel, UserModel } from "./data/model";
import { User, Preference, Plan } from "./generated/graphql";

const castIUserToUser = (user: any) => {
  const gqlUser: User = {
    id: !user?.id ? "" : user?.id,
    name: !user?.name ? "" : user?.name,
    email: !user?.email ? "" : user?.email,
    profile_pic: !user?.profile_pic ? "" : user?.profile_pic,
  }
  return gqlUser
}

const castIPlantoPlan = (plan: any) => {
  console.log("The plan", plan);
  const gqlPlan: Plan = {
    id: !plan?.id ? "" : plan?.id,
    name: !plan?.name ? "" : plan?.name,
    creator: null,
    creatorId: !plan?.creator ? "" : plan?.creator,
    budget: !plan?.budget ? "" : plan?.budget,
    rating: !plan?.rating ? "" : plan?.rating,
    tags: !plan?.tags ? "" : plan?.tags,
    description: !plan?.description? "" : plan?.description
  }
  console.log("the gql plan", gqlPlan);
  return gqlPlan;
}

export class UserProvider extends DataSource {

  public async getUser(id: String) {
    const user = await UserModel.findById(id).exec();

    return castIUserToUser(user);
  }

  public async getUsers() {
    const users = (await UserModel.find({}).exec());
    const formattedUsers = users.map((obj, _) => castIUserToUser(obj));

    return formattedUsers;
  }

  public async getPrefs(id: string) {
    const prefArray = (await UserModel.findById(id).select("prefs").exec())?.prefs;
    if (prefArray) {
    const prefs: Preference[] = prefArray?.map((obj, _) => {

      const newObj: Preference = {
        prefTag: obj.pref_tag,
        userRating: Number(obj.user_rating.toString())
      }

      return newObj;
    })

    return prefs;
  } else {
    const prefs: Preference[] = [];
    return prefs;
  }

  }

  public async getPlansFromUser(user_id: string) {
    const plansArray = (await UserModel.findById(user_id).select("saved_plans").populate({
      path: "saved_plans",
      model: "Plan"
    }).exec())?.saved_plans;
    console.log("The plans array", plansArray);
    if (plansArray) {
      const savedPlans: Plan[] = plansArray?.map((plan, _) => {
        return castIPlantoPlan(plan[0]); // populate for some reason stores each obj in nested array
      })
      console.log(savedPlans);
      return savedPlans;
    } else {
      const plans: Plan[] = [];
      return plans;
    }
  }
}

export class PlanProvider extends DataSource {
  public async getPlan(id: string) {
    const plan = (await PlanModel.findById(id).exec());
    return castIPlantoPlan(plan);
  }

  public async getAllPlans() {
    const plans = (await PlanModel.find({}).exec());
    return plans.map((obj, _) => castIPlantoPlan(obj));
  }
}
