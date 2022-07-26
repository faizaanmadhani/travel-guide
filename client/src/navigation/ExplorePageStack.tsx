import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import ExplorePage from "../pages/ExplorePage";
import EditTravelPlanStackScreen from "./EditPlanStack";
import TravelPlanPage from "../pages/PlanMain";

const ExploreStack = createNativeStackNavigator();

export default function TravelStackScreen() {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen name="Explore" component={ExplorePage} />
      <ExploreStack.Screen name="View Plan" component={TravelPlanPage} />
    </ExploreStack.Navigator>
  );
}
