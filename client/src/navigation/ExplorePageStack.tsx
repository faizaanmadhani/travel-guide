import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import ExplorePage from "../pages/ExplorePage";
import ViewTPStack from "./ViewPlanStack";

const ExploreStack = createNativeStackNavigator();

export default function TravelStackScreen() {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen name="Explore" component={ExplorePage} />
      <ExploreStack.Screen name="View Plan" component={ViewTPStack} />
    </ExploreStack.Navigator>
  );
}
