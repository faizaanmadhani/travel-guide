import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import TravelPage from "../pages/TravelPage";
import EditTravelPlan from "../pages/EditTravelPlan";
import ImageBrowserScreen from "../components/assetselector";
import EditTravelPlanStackScreen from "./EditPlanStack";

const TravelStack = createNativeStackNavigator();

export default function TravelStackScreen() {
  return (
    <TravelStack.Navigator>
      <TravelStack.Screen
        name="Travel Plans"
        component={EditTravelPlanStackScreen}
      />
    </TravelStack.Navigator>
  );
}
