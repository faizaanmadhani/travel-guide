import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import TravelPage from "../pages/TravelPage";
import EditTravelPlan from "../pages/EditTravelPlan";
import ImageBrowserScreen from "../components/assetselector";
import EditTravelPlanStackScreen from "./EditPlanStack";
import ExplorePage from "../pages/ExplorePage";
import PlanMain from "../pages/PlanMain";

const TravelStack = createNativeStackNavigator();

export default function TravelStackScreen() {
  return (
    <TravelStack.Navigator>
      <TravelStack.Screen
        name="Travel Plans"
        component={EditTravelPlanStackScreen}
      />
      <TravelStack.Screen name="Plan" component={PlanMain} />
      <TravelStack.Screen name="Explore" component={ExplorePage} />
    </TravelStack.Navigator>
  );
}
