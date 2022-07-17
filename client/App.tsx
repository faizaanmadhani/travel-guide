import React, { useContext, useState } from "react";
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
import {
  createBottomTabNavigator,
  BottomTabBarHeightContext,
} from "@react-navigation/bottom-tabs";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import TravelPage from "./src/pages/TravelPage";
import WishlistPage from "./src/pages/WishlistPage";
import ProfilePage from "./src/pages/ProfilePage";
import ExplorePage from "./src/pages/ExplorePage";

import LandingPage from "./src/pages/LandingPage";
import RegisterPage from "./src/pages/RegisterPage";
import LoginPage from "./src/pages/LoginPage";
import TravelStackScreen from "./src/navigation/TravelPageStack";
import EditTravelPlanStackScreen from "./src/navigation/EditPlanStack";
import EmailVerificationPage from "./src/pages/EmailVerificationPage";

export const UserContext = React.createContext({
  userID: "",
  setUserID: (id) => {},
});

export const RegisterContext = React.createContext({
  regEmail: "",
  setRegEmail: (email) => {},
});  

export const client = new ApolloClient({
  uri: "https://feb0-207-107-159-98.ngrok.io/",
  cache: new InMemoryCache(),
});

const tabNavigationOptions = {
  headerShown: false,
};

const Tab = createBottomTabNavigator();

export default function App() {
  const [userID, setUserID] = useState("");
  const [regEmail, setRegEmail] = useState("");

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={{ userID, setUserID }}>
      <RegisterContext.Provider value={{ regEmail, setRegEmail }}>
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
              <Tab.Screen
                name="Wandr"
                component={LandingPage}
                options={{
                  tabBarButton: () => null,
                  // tabBarVisible: false,
                  tabBarStyle: { display: "none" },
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Register"
                component={RegisterPage}
                options={{
                  tabBarButton: () => null,
                  // tabBarVisible: false,
                  tabBarStyle: { display: "none" },
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Login"
                component={LoginPage}
                options={{
                  tabBarButton: () => null,
                  // tabBarVisible: false,
                  tabBarStyle: { display: "none" },
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Verify"
                component={EmailVerificationPage}
                options={{
                  tabBarButton: () => null,
                  // tabBarVisible: false,
                  tabBarStyle: { display: "none" },
                  headerShown: false,
                }}
              />

              <Tab.Screen
                name="Explore"
                component={ExplorePage}
                options={{
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Travel"
                options={tabNavigationOptions}
                component={EditTravelPlanStackScreen}
              />
              <Tab.Screen
                name="Wishlist"
                component={WishlistPage}
                options={{
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Profile"
                component={ProfilePage}
                initialParams={{ username: "" }}
                options={{
                  headerShown: false,
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </RegisterContext.Provider>
      </UserContext.Provider>
    </ApolloProvider>
  );
}
