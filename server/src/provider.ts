import { DataSource } from "apollo-datasource";
import { PlanBlockModel, PlanModel, UserModel } from "./data/model";
import { User, Preference, Plan, PlanBlock, CreateUserInput, CreatePlanInput, FilterInput } from "./generated/graphql";

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
  const gqlPlan: Plan = {
    id: !plan?.id ? "" : plan?.id,
    name: !plan?.name ? "" : plan?.name,
    creator: null,
    creatorId: !plan?.creator ? "" : plan?.creator,
    budget: !plan?.budget ? 1 : plan?.budget,
    rating: !plan?.rating ? 1 : plan?.rating,
    tags: !plan?.tags ? "" : plan?.tags,
    description: !plan?.description? "" : plan?.description,
    countries: !plan?.countries ? "" : plan?.countries,
    months: !plan?.months ? "" : plan?.months,
  }
  return gqlPlan;
}

const castIPlanBlocktoPlanBlock = (planBlock: any) => {
  const gqlPlanBlock: PlanBlock = {
    id: !planBlock?.id ? "" : planBlock?.id,
    title: !planBlock?.title ? "" : planBlock?.title,
    description: !planBlock?.description ? "" : planBlock?.description,
    mapId: !planBlock?.description ? "" : planBlock?.description,
    audio: !planBlock?.description ? "" : planBlock?.description,
    video: !planBlock?.description ? "" : planBlock?.description,
  }
  return gqlPlanBlock;
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
    if (plansArray) {
      const savedPlans: Plan[] = plansArray?.map((plan, _) => {
        return castIPlantoPlan(plan[0]); // populate for some reason stores each obj in nested array
      })
      return savedPlans;
    } else {
      const plans: Plan[] = [];
      return plans;
    }
  }

  public async createUser(input: CreateUserInput) {

    const newUser = new UserModel({
      name: input.name,
      email: input.email,
      profile_pic: input.profile_pic,
      prefs: input.prefs.map((obj, _) => {
        const modelPref = {
          pref_tag: obj?.prefTag,
          user_rating: obj?.userRating
        }
        return modelPref
      }),
      saved_plans: []
    });

    await newUser.save();
    const id = newUser._id.toString();

    const gqlUser: User = await this.getUser(id);

    return gqlUser;
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

  public async getFilteredPlans(input: FilterInput) {
    // filtering logic: rating AND budget AND (country 1 OR country 2 OR ...) AND (month 1 OR month 2 OR ...)

    const shouldApplyFilters = input.countries && input.rating  && input.budget && input.months;
    let plans = (await PlanModel.find({}).exec()).map((obj, _) => castIPlantoPlan(obj));

    if (!shouldApplyFilters) {
      return plans;
    }

    if (input.rating) {
      plans = plans.filter((plan) => plan.rating === input.rating);
    }
    
    if (input.budget) {
      plans = plans.filter((plan) => plan.budget === input.budget);
    }

    const countriesFilter = input.countries? input.countries: [];
    const monthsFilter = input.months? input.months: [];
    
    if (countriesFilter) {
      plans = plans.filter(plan => {
        return plan.countries.some(country => countriesFilter.includes(country));
      })
    }

    if (monthsFilter) {
      plans = plans.filter(plan => {
        return plan.months.some(month => monthsFilter.includes(month));
      })
    }
    
    return plans.map((obj, _) => castIPlantoPlan(obj));
  }

  public async createPlan(input: CreatePlanInput) {
    const newPlan = new PlanModel({
      name: input.name,
      creatorId: input.creatorId,
      rating: input.rating,
      budget: input.budget,
      tags: input.tags,
      description: input.description,
      blocks: []
    });

    await newPlan.save();
    const id = newPlan._id.toString();
    return this.getPlan(id);
  }
}

export class PlanBlockProvider extends DataSource {
  public async getPlanBlock(id: string) {
    const planBlock = (await PlanBlockModel.findById(id).exec());
    return castIPlanBlocktoPlanBlock(planBlock);
  }

  public async getPlanBlocksByPlan(planId: string) {
    const planBlocksArray = (await PlanModel.findById(planId).select("blocks").populate({
      path: "blocks",
      model: "PlanBlock"
    }).exec())?.blocks;

    if (planBlocksArray) {
      const blocks: PlanBlock[] = planBlocksArray?.map((block, _) => {
        return castIPlanBlocktoPlanBlock(block[0]);
      });
      return blocks;
    } else {
      const blocks: PlanBlock[] = [];
      return blocks;
    }
  }
}
