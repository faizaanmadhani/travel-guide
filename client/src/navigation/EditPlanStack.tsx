import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import TravelPage from "../pages/TravelPage";
import EditTravelPlan from "../pages/EditTravelPlan";
import ImageBrowserScreen from "../components/assetselector";
import { EditBlockForm } from "../pages/EditBlock";

const TravelStack = createNativeStackNavigator();

export default function EditTravelPlanStackScreen() {
  return (
    <TravelStack.Navigator>
      <TravelStack.Screen name="Travel" component={TravelPage} />
      <TravelStack.Screen
        name="Create Travel Plan"
        component={EditTravelPlan}
      />
      <TravelStack.Screen name="Select Images" component={ImageBrowserScreen} />
      <TravelStack.Screen name="Edit Block" component={EditBlockForm} />
    </TravelStack.Navigator>
  );
}
