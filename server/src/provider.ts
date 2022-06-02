import { DataSource } from "apollo-datasource";
import { UserModel } from "./data/model";
import { QueryUserArgs, User, Preference } from "./generated/graphql";

export class UserProvider extends DataSource {

  private castIUserToUser(user: any) {
    const gqlUser: User = {
      id: !user?.id ? "" : user?.id,
      name: !user?.name ? "" : user?.name,
      email: !user?.email ? "" : user?.email,
      profile_pic: !user?.profile_pic ? "" : user?.profile_pic,
    }
    return gqlUser
  }

  public async getUser(args: QueryUserArgs) {
    const user = await UserModel.findById(args.id).exec();

    return this.castIUserToUser(user);
  }

  public async getUsers() {
    const users = (await UserModel.find({}).exec());
    const formattedUsers = users.map((obj, _) => this.castIUserToUser(obj));

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

  // public async getUsers() {
  //   return User.find({});
  // }
}
