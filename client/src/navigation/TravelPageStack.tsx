import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import TravelPage from "../pages/TravelPage";
import EditTravelPlan from "../pages/EditTravelPlan";

const TravelStack = createNativeStackNavigator()

export default function TravelStackScreen() {
    return (<TravelStack.Navigator>
        <TravelStack.Screen name="Travel" component={TravelPage} />
        <TravelStack.Screen name="Create Travel Plan" component={EditTravelPlan} />
    </TravelStack.Navigator>)
}