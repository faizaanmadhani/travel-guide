import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import TravelPage from "../pages/TravelPage";
import CreateTravelPlan from "../pages/CreateTravelPlan";

const TravelStack = createNativeStackNavigator()

export default function TravelStackScreen() {
    return (<TravelStack.Navigator>
        <TravelStack.Screen name="Travel" component={TravelPage} />
        <TravelStack.Screen name="CreateTravelPlan" component={CreateTravelPlan} />
    </TravelStack.Navigator>)
}