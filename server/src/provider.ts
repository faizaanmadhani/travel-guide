import { DataSource } from "apollo-datasource";
import { PlanBlockModel, PlanModel, UserModel } from "./data/model";
import { User, Preference, Plan, PlanBlock, CreateUserInput, UpdatePlanInput, FilterInput, UpdatePlanBlockInput } from "./generated/graphql";

const castIUserToUser = (user: any) => {
  const gqlUser: User = {
    id: !user?.id ? "" : user?.id,
    name: !user?.name ? "" : user?.name,
    email: !user?.email ? "" : user?.email,
    profile_pic: !user?.profile_pic ? "" : user?.profile_pic,
    password: !user?.password ? "" : user?.password,
  }
  return gqlUser
}

const castIPlantoPlan = (plan: any) => {
  const gqlPlan: Plan = {
    id: !plan?._id ? "" : plan?._id,
    name: !plan?.name ? "" : plan?.name,
    creator: null,
    creatorId: !plan?.creator ? "" : plan?.creator,
    budget: !plan?.budget ? 1 : plan?.budget,
    rating: !plan?.rating ? 1 : plan?.rating,
    tags: !plan?.tags ? [] : plan?.tags,
    description: !plan?.description? "" : plan?.description,
    countries: !plan?.countries ? "" : plan?.countries,
    months: !plan?.months ? "" : plan?.months,
    imageUrl: !plan?.imageUrl ? "" : plan?.imageUrl,
    dayLabels: !plan?.dayLabels ? ["Intro"] : plan?.dayLabels,
  }
  return gqlPlan;
}

const castIPlanBlocktoPlanBlock = (planBlock: any) => {
  const gqlPlanBlock: PlanBlock = {
    id: !planBlock?.id ? "" : planBlock?.id,
    title: !planBlock?.title ? "" : planBlock?.title,
    description: !planBlock?.description ? "" : planBlock?.description,
    price: !planBlock?.price ? 0 : planBlock?.price,
    day: !planBlock?.day ? 1 : planBlock.day,
    imageUrl: !planBlock?.imageUrl ? "" : planBlock.imageUrl,
  }
  return gqlPlanBlock;
}

export class UserProvider extends DataSource {

  public async getUser(id: String) {

    const user = await UserModel.findById(id).exec();

    return castIUserToUser(user);
  }

  public async authenticateUser(username: String, password: String) {
    console.log("reached", username, password);
    const user = await UserModel.findOne({name: username});
    if (user && user.password === password) {
      return castIUserToUser(user);
    } else {
      return castIUserToUser(null);
    }
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
        console.log("Each plan", plan);
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
      password: input.password,
      // prefs: input.prefs.map((obj, _) => {
      //   const modelPref = {
      //     pref_tag: obj?.prefTag,
      //     user_rating: obj?.userRating
      //   }
      //   return modelPref
      // }),
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
    console.log("the plan just fetched", id);
    const plan = (await PlanModel.findById(id).exec());
    return castIPlantoPlan(plan);
  }

  public async getAllPlans() {
    const plans = (await PlanModel.find({}).exec());
    return plans.map((obj, _) => castIPlantoPlan(obj));
  }

  public async getFilteredPlans(input: FilterInput) {
    // filtering logic: rating AND budget AND (country 1 OR country 2 OR ...) AND (month 1 OR month 2 OR ...)

    const shouldApplyFilters = input.countries || input.rating || input.budget || input.months;
    let plans = (await PlanModel.find({}).exec()).map((obj, _) => castIPlantoPlan(obj));

    if (!shouldApplyFilters) {
      return plans;
    }

    const countriesFilter = input.countries? input.countries: [];
    const ratingFilter = input.rating? input.rating: [];
    const budgetFilter = input.budget? input.budget: [];
    const monthsFilter = input.months? input.months: [];
    
    if (countriesFilter && countriesFilter.length) {
      plans = plans.filter(plan => {
        return plan.countries.some(country => countriesFilter.includes(country));
      })
    }

    if (ratingFilter && ratingFilter.length) {
      plans = plans.filter(plan =>  ratingFilter.includes(plan.rating))
    }
    
    if (budgetFilter && budgetFilter.length) {
      plans = plans.filter(plan => budgetFilter.includes(plan.budget))
    }

    if (monthsFilter && monthsFilter.length) {
      plans = plans.filter(plan => {
        return plan.months.some(month => monthsFilter.includes(month));
      })
    }
    
    return plans.map((obj, _) => castIPlantoPlan(obj));
  }

  public async createPlan(creatorId: String) {
    console.log("reached");
    const newPlan = new PlanModel({
      name: "",
      creator: creatorId,
      rating: "",
      budget: 0,
      tags: [],
      description: "",
      blocks: [],
      imageUrl: "",
      countries: [],
      months: [],
    });

    await newPlan.save();
    const id = newPlan._id.toString();

    // Save ID to user file
    const user = await UserModel.findById(creatorId).exec();
    user?.saved_plans?.push(id);
    await user?.save();
    console.log(this.getPlan(id));
    return this.getPlan(id);
  }

  public async updatePlan(input: UpdatePlanInput) {

    console.log("the input for imageUrl", input);

    const doc = await PlanModel.findById(input.id);
    const creatorId = input.creatorId;
    if (doc) {
      doc.overwrite({
        name: "",
        creator: creatorId,
        rating: "",
        budget: 0,
        tags: [],
        description: "",
        blocks: doc.blocks,
        imageUrl: "",
        dayLabels: doc.dayLabels,
        countries: [],
        months: []
      });

      doc.name = !input.name ? "" : input.name;
      doc.budget = !input.budget ? 1 : input.budget;

      input.tags?.forEach((tag, _) => {
        doc.tags.push(tag);
      })
      doc.description = !input.description ? "" : input.description;
      doc.imageUrl = !input.imageUrl ? "" : input.imageUrl;

      await doc.save();
      return this.getPlan(input?.id || "");
    }

    return null;
  }

  public async deletePlan(id: string) {
    const plan = (await PlanModel.findById(id));
    await PlanModel.deleteOne({_id: id});
    return castIPlantoPlan(plan);
  }

}

export class PlanBlockProvider extends DataSource {
  public async getPlanBlock(id: string) {
    const planBlock = (await PlanBlockModel.findById(id).exec());
    return castIPlanBlocktoPlanBlock(planBlock);
  }

  public async getPlanBlocksByPlanAndDay(planId: string, day: number) {
    console.log("stack trace leads here?", planId, day);
    let planBlocksArray: any = (await PlanModel.findById(planId).select("blocks").populate({
      path: "blocks",
      model: "PlanBlock"
    }).exec())?.blocks;

    console.log("The plan blocks array", planBlocksArray);
    planBlocksArray = planBlocksArray.filter((obj: any) => obj.day === day);
    console.log("The filtered plan blocks array", planBlocksArray);

    if (planBlocksArray) {
      const blocks: PlanBlock[] = planBlocksArray?.map((block, _) => {
        console.log("each block", block);
        return castIPlanBlocktoPlanBlock(block);
      });
      console.log("the blocks", blocks);
      return blocks;
    } else {
      const blocks: PlanBlock[] = [];
      return blocks;
    }
  }

  public async createBlock(input: UpdatePlanBlockInput) {
    const newPlanBlock = new PlanBlockModel({
      title: input.title,
      description: input.description,
      imageUrl: input.imageUrl,
      lat: input.lat,
      long: input.long,
      links: input.links,
      location: input.location,
      day: input.day,
    })

    console.log("the input ", input);

    await newPlanBlock.save();
    const id = newPlanBlock._id.toString();
    const plan = (await PlanModel.findById(input.planID).exec());
    plan?.blocks.push(id);
    await plan?.save();

    return castIPlanBlocktoPlanBlock(this.getPlanBlock(id));
  }

  public async modifyBlock(id: string, input: UpdatePlanBlockInput) {
    const doc = await PlanBlockModel.findById(id);
    if (doc) {
      doc.overwrite({
        title: input.title,
        description: input.description,
        links: input.links,
        price: input.price,
        location: input.location,
        day: input.day,
        lat: input.lat,
        long: input.long,
      })

      await doc.save();

      return this.getPlanBlock(id);
    }

    return null
  }

  public async deletePlanBlock(id: string) {
    console.log("delete plan block was triggered", id);
    const planBlock = (await PlanBlockModel.findById(id));
    await PlanBlockModel.deleteOne({_id: id});
    return castIPlanBlocktoPlanBlock(planBlock);
  }
}
