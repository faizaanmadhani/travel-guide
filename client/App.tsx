import React from "react";
import { render } from "react-dom";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NativeBaseProvider, Text, Box, extendTheme } from "native-base";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import TravelPage from "./src/pages/TravelPage";
import WishlistPage from "./src/pages/WishlistPage";
import ProfilePage from "./src/pages/ProfilePage";
import ExplorePage from "./src/pages/ExplorePage";

export const client = new ApolloClient({
  uri: "SERVER_URL",
  cache: new InMemoryCache(),
});

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                const iconColour = focused ? "black" : "gray";

                if (route.name === "Explore") {
                  iconName = focused ? "search" : "search-outline";
                } else if (route.name === "Travel") {
                  iconName = focused ? "airplane" : "airplane-outline";
                } else if (route.name === "Wishlist") {
                  iconName = focused ? "star" : "star-border";
                } else if (route.name === "Profile") {
                  iconName = focused ? "person" : "person-outline";
                }

                // navigation icons
                return route.name === "Travel" || route.name === "Explore" ? (
                  <Ionicons name={iconName} size={24} color={iconColour} />
                ) : (
                  <MaterialIcons name={iconName} size={24} color={iconColour} />
                );
              },
              tabBarActiveTintColor: "black",
              tabBarInactiveTintColor: "gray",
            })}
          >
            <Tab.Screen name="Explore" component={ExplorePage} />
            <Tab.Screen name="Travel" component={TravelPage} />
            <Tab.Screen name="Wishlist" component={WishlistPage} />
            <Tab.Screen name="Profile" component={ProfilePage} />
          </Tab.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </ApolloProvider>
  );
}
