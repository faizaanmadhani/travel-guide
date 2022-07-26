import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import EditTravelPlan from "../pages/EditTravelPlan";
import ImageBrowserScreen from "../components/assetselector";
import TravelPlanPage from "../pages/PlanMain";

const TravelStack = createNativeStackNavigator();

export default function TravelStackScreen() {
  return (
    <TravelStack.Navigator>
      <TravelStack.Screen name="View Plan" component={TravelPlanPage} />
    </TravelStack.Navigator>
  );
}
