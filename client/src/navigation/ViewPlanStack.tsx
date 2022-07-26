import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import EditTravelPlan from "../pages/EditTravelPlan";
import TravelPlanPage from "../pages/PlanMain";

const ViewPlanStack = createNativeStackNavigator();

export default function ViewTPStack() {
  return (
    <ViewPlanStack.Navigator>
      <ViewPlanStack.Screen name="View Plan" component={TravelPlanPage} />
      <ViewPlanStack.Screen name="Edit Plan" component={EditTravelPlan} />
    </ViewPlanStack.Navigator>
  );
}
