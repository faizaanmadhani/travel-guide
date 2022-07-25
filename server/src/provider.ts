import { DataSource } from "apollo-datasource";
import { PlanBlockModel, PlanModel, UserModel, TagModel } from "./data/model";
import { User, Preference, Plan, PlanBlock, CreateUserInput, UpdatePlanInput, FilterInput, UpdatePlanBlockInput, UpdateUserInput, AddWishlistPlanInput, Tag, TagInput } from "./generated/graphql";
import { transporter } from "../src/index";
import { getToken } from "./util";
const ObjectId = require('mongodb').ObjectID


const castIUserToUser = (user: any) => {
  const gqlUser: User = {
    id: !user?.id ? "" : user?.id,
    name: !user?.name ? "" : user?.name,
    email: !user?.email ? "" : user?.email,
    profile_pic: !user?.profile_pic ? "" : user?.profile_pic,
    password: !user?.password ? "" : user?.password,
    token: !user?.token ? "" : user?.token,
    emailValid: !user?.emailValid ? 0 : user?.emailValid,
    randStr: !user?.randStr ? "" : user?.randStr,
    savedPlans: !user?.saved_plans ? [] : user?.saved_plans,
    wishlistPlans: !user?.wishlist_plans ? [] : user?.wishlist_plans,
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

const castITagtoTag = (tag: any) => {
  const gqlTag: Tag = {
    name: !tag?.name ? "" : tag?.name,
  }
  return gqlTag;
}

export class UserProvider extends DataSource {

  public async getUser(id: String) {
    const user = await UserModel.findById(id).exec();
    console.log("getUser reached", id);
    return castIUserToUser(user);
  }

  public async authenticateUser(username: String, password: String) {
    console.log("reached", username, password);
    const user = await UserModel.findOne({name: username});
    if (user && user.password === password) {
      console.log(castIUserToUser(user));
      return castIUserToUser(user);
    } else {
      return castIUserToUser(null);
    }
  }

  public async authUserEmail(email: String, password: String) {
    console.log("reached", email, password);
    const user = await UserModel.findOne({email: email});
    if (user && user.password === password) {
      return castIUserToUser(user);
    } else {
      return castIUserToUser(null);
    }
  }

  public async verifyEmail(email: String) {
    console.log("reached", email);
    const user = await UserModel.findOne({email: email});
    if (user) {
      
      var mailOptions = {
        from: 'wandr497@gmail.com',
        to: email,
        subject: 'Wandr: Confirm Email',
        text: `Your code is ${user.randStr}.`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      return castIUserToUser(user);
    } else {
      return castIUserToUser(null);
    }
  }

  public async getUserID(username: String, email: String) {
    console.log("reached", username, email);
    const user1 = await UserModel.findOne({name: username});
    const user2 = await UserModel.findOne({email: email});
    if (user1) {
      console.log("username found");
      return castIUserToUser(user1);
    }
    if (user2)
    {
      console.log("email found");
      return castIUserToUser(user2);
    }
    // else
    return castIUserToUser(null);
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

  public async getUserPlans(user_id: String) {
    console.log("getPlanUser reached", user_id);

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

  public async getWishlistPlans(user_id: String) {
    console.log("getWishListPlans reached", user_id);

    const plansArray = (await UserModel.findById(user_id).select("wishlist_plans").populate({
      path: "wishlist_plans",
      model: "Plan"
    }).exec())?.wishlist_plans;

    if (plansArray) {
      const wishlistPlans: Plan[] = plansArray?.map((plan, _) => {
        return castIPlantoPlan(plan); // populate for some reason stores each obj in nested array
      })
      
      return wishlistPlans;
    } else {
      const plans: Plan[] = [];
      return plans;
    }
  }

  public async createUser(input: CreateUserInput) {
    console.log("hit create user", input);
    const newUser = new UserModel({
      name: input.name,
      email: input.email,
      profile_pic: input.profile_pic,
      password: input.password,
      token: "",
      randStr: randString(),
      emailValid: 0,
      saved_plans: [],
      wishlist_plans: []
    });

    await newUser.save();
    const id = newUser._id.toString();

    const gqlUser: User = await this.getUser(id);

    // Creating a Token from User Payload obtained.
    const token = getToken(gqlUser);
    gqlUser.token = token; // Adding token to user object
    console.log("token is", token);
    console.log(gqlUser);

    newUser.overwrite(({
      name: input.name,
      email: input.email,
      profile_pic: input.profile_pic,
      password: input.password,
      token: token,
      randStr: randString(),
      emailValid: 0,
      saved_plans: [],
      wishlist_plans: []
    }))
    await newUser.save();

    return gqlUser;
  }

  public async updateUser(input: UpdateUserInput) {
    const user = await UserModel.findById(input.id);
    if (user) {
      // user.overwrite({
      //   name: "",
      //   email: "",
      //   password: "",
      //   profile_pic: "",
      //   randStr: "",
      //   emailValid: 0
      // });

      const name = user?.name;
      const email = user?.email;
      const password = user?.password;
      const profile_pic = user?.profile_pic;
      const randStr = user?.randStr;
      const emailValid = user?.emailValid;

      user.name = input.name ? input.name : name;
      user.email = input.email ? input.email : email;
      user.password = input.password ? input.password : password;
      user.profile_pic = input.profile_pic ? input.profile_pic : profile_pic;
      user.randStr = input.randStr ? input.randStr : randStr;
      if (input.emailValid != undefined)
      {
        user.emailValid = (input.emailValid == 0 || input.emailValid == 1) ? input.emailValid : emailValid;
      }
      
      await user.save();
      return this.getUser(input?.id || "");
    }

    return null;
  }

  public async addWishlistPlan(input: AddWishlistPlanInput) {
    console.log("add", input.planID, "to", input.userID);
    const user = await UserModel.findById(input.userID);
    if (user) {
      if (!user.wishlist_plans.includes(ObjectId(input.planID)))
      {
        user.wishlist_plans.push(input.planID);
        await user.save();
      }
      else
      {
        console.log("plan already wishlisted", Object(input.planID));
      }
    }

    return castIUserToUser(user);
  }

  public async removeWishlistPlan(input: AddWishlistPlanInput) {
    console.log("remove", input.planID, "from", input.userID);
    const user = await UserModel.findById(input.userID);
    if (user) {
      if (user.wishlist_plans.includes(ObjectId(input.planID)))
      {
        const loc = user.wishlist_plans.indexOf(ObjectId(input.planID));
        user.wishlist_plans.splice(loc, 1);
        await user.save();
      }
      else
      {
        console.log("plan not in wishlist", Object(input.planID));
      }
    }

    return castIUserToUser(user);
  }

  public async updateWishlistPlan(input: AddWishlistPlanInput) {
    console.log("update", input.planID, "for", input.userID);
    const user = await UserModel.findById(input.userID);
    if (user) {
      if (!user.wishlist_plans.includes(ObjectId(input.planID)))
      {
        user.wishlist_plans.push(input.planID);
      }
      else
      {
        const loc = user.wishlist_plans.indexOf(ObjectId(input.planID));
        user.wishlist_plans.splice(loc, 1);
      }
      await user.save();
    }

    return castIUserToUser(user);
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
function randString() {
  const codeLen = 6;
  let code = '';
  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let alphabetLen = alphabet.length;
  for ( var i = 0; i < codeLen; i++ ) {
    code += alphabet.charAt(Math.floor(Math.random() * alphabetLen));
  }
  return code;
}
