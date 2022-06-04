import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import explorePage from "./src/pages/explore";
import TravelPage from "./src/pages/TravelPage";
import WishlistPage from "./src/pages/WishlistPage";
import ProfilePage from "./src/pages/ProfilePage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Explore"
          component={explorePage}
          options={{ title: "Explore" }}
        /> */}
        <Stack.Screen
          name="Travel"
          component={TravelPage}
          options={{ title: "Travel" }}
        />
        <Stack.Screen
          name="Wishlist"
          component={WishlistPage}
          options={{ title: "Wishlist" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfilePage}
          options={{ title: "Profile" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
