import { DataSource } from "apollo-datasource";
import { PlanBlockModel, PlanModel, UserModel, TagModel } from "./data/model";
import { User, Preference, Plan, PlanBlock, CreateUserInput, UpdatePlanInput, FilterInput, UpdatePlanBlockInput, Tag, TagInput } from "./generated/graphql";

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
    id: !plan?.id ? "" : plan?.id,
    name: !plan?.name ? "" : plan?.name,
    creator: null,
    creatorId: !plan?.creator ? "" : plan?.creator,
    budget: !plan?.budget ? 1 : plan?.budget,
    rating: !plan?.rating ? 1 : plan?.rating,
    tags: !plan?.tags ? [] : plan?.tags,
    description: !plan?.description? "" : plan?.description,
    countries: !plan?.countries ? "" : plan?.countries,
    months: !plan?.months ? "" : plan?.months,
    assetLinks: !plan?.assetLinks ? [] : plan?.assetLinks,
  }
  return gqlPlan;
}

const castIPlanBlocktoPlanBlock = (planBlock: any) => {
  const gqlPlanBlock: PlanBlock = {
    id: !planBlock?.id ? "" : planBlock?.id,
    title: !planBlock?.title ? "" : planBlock?.title,
    description: !planBlock?.description ? "" : planBlock?.description,
    images: !planBlock?.images ? [] : planBlock?.images,
    // mapId: !planBlock?.mapId ? "" : planBlock?.mapId,
    // audio: !planBlock?.audio ? "" : planBlock?.audio,
    // video: !planBlock?.video ? "" : planBlock?.video,
    price: !planBlock?.price ? 0 : planBlock?.price,
    day: !planBlock?.day ? 1 : planBlock.day,
    externalUrl: !planBlock?.links ? [] : planBlock.links
  }
  return gqlPlanBlock;
}

const castITagtoTag = (tag: any) => {
  const gqlTag: Tag = {
    name: !tag?.name ? "" : tag?.name,
  }
  return gqlTag;
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
    const plan = (await PlanModel.findById(id).exec());
    return castIPlantoPlan(plan);
  }

  public async getAllPlans() {
    const plans = (await PlanModel.find({}).exec());
    return plans.map((obj, _) => castIPlantoPlan(obj));
  }

  public async getFilteredPlans(input: FilterInput) {
    // filtering logic: rating AND budget AND (country 1 OR country 2 OR ...) AND (month 1 OR month 2 OR ...)

    const shouldApplyFilters = input.countries || input.rating || input.budget || input.months || input.tags || input.name;
    let plans = (await PlanModel.find({}).exec()).map((obj, _) => castIPlantoPlan(obj));

    if (!shouldApplyFilters) {
      return plans;
    }

    const countriesFilter = input.countries? input.countries: [];
    const ratingFilter = input.rating? input.rating: [];
    const budgetFilter = input.budget? input.budget: [];
    const monthsFilter = input.months? input.months: [];
    const tagsFilter = input.tags? input.tags: [];
    const nameFilter = input.name? input.name: "";
    
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

    if (tagsFilter && tagsFilter.length) {
      plans = plans.filter(plan => {
        return plan.tags.some(tag => tagsFilter.includes(tag));
      })
    }

    if (nameFilter && nameFilter.length) {
      plans = plans.filter(plan => {
        return plan.name.toLowerCase().includes(nameFilter.toLowerCase());
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
      assetLinks: []
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
        blocks: [],
        assetLinks: []
      });

      doc.name = !input.name ? "" : input.name;
      doc.budget = !input.budget ? 1 : input.budget;

      input.tags?.forEach((tag, _) => {
        doc.tags.push(tag);
      })
      doc.description = !input.description ? "" : input.description;
      input.assetLinks?.forEach((link, _) => {
        doc.assetLinks.push(link);
      })

      await doc.save();
      return this.getPlan(input?.id || "");
    }

    return null;
  }
}

export class PlanBlockProvider extends DataSource {
  public async getPlanBlock(id: string) {
    const planBlock = (await PlanBlockModel.findById(id).exec());
    return castIPlanBlocktoPlanBlock(planBlock);
  }

  public async getPlanBlocksByPlanAndDay(planId: string, day: number) {
    let planBlocksArray: any = (await PlanModel.findById(planId).select("blocks").populate({
      path: "blocks",
      model: "PlanBlock"
    }).exec())?.blocks;

    planBlocksArray = planBlocksArray.filter((obj: any) => obj.day === day);

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

  public async createBlock(planID: string, input: UpdatePlanBlockInput) {
    const newPlanBlock = new PlanBlockModel({
      title: input.title,
      description: input.description,
      images: input.images,
      links: input.links,
      location: input.location,
      day: input.day,
    })

    await newPlanBlock.save();
    const id = newPlanBlock._id.toString();
    const plan = (await PlanModel.findById(planID).exec());
    plan?.blocks.push(id);
    await plan?.save();

    return castIPlanBlocktoPlanBlock(this.getPlanBlock(id));
  }
}

export class TagProvider extends DataSource {
  public async getFilteredTags(input: TagInput) {
    console.log("input - ", input.keywords);

    let tags = (await TagModel.find({}).exec()).map((obj, _) => castITagtoTag(obj));

    if (!input.keywords) {
      return tags;
    }

    const tagsFilter = input.keywords? input.keywords: "";
    
      tags = tags.filter(tag => {
        return tag.name.startsWith(tagsFilter);
      })
    
    return tags;
  }
}