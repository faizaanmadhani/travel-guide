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

                // navigation icons
                if (route.name === "Explore") {
                  return (
                    <Ionicons
                      name={focused ? "search" : "search-outline"}
                      size={24}
                      color={iconColour}
                    />
                  );
                } else if (route.name === "Travel") {
                  return (
                    <Ionicons
                      name={focused ? "airplane" : "airplane-outline"}
                      size={24}
                      color={iconColour}
                    />
                  );
                } else if (route.name === "Wishlist") {
                  return (
                    <MaterialIcons
                      name={focused ? "star" : "star-border"}
                      size={24}
                      color={iconColour}
                    />
                  );
                } else if (route.name === "Profile") {
                  return (
                    <MaterialIcons
                      name={focused ? "person" : "person-outline"}
                      size={24}
                      color={iconColour}
                    />
                  );
                }
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
