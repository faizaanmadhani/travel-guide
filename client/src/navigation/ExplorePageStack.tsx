import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TravelPage from "../pages/TravelPage";
import EditTravelPlanStackScreen from "./EditPlanStack";
import TravelStackScreen from "./TravelPageStack";

const ExploreStack = createNativeStackNavigator();

export default function ExplorePageStackScreen() {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen
        name="Edit Plan"
        component={EditTravelPlanStackScreen}
      />
    </ExploreStack.Navigator>
  );
}
