import React, { useContext, useState } from "react";
import { render } from "react-dom";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NativeBaseProvider, Text, Box, extendTheme } from "native-base";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
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
import ExplorePageStack from "./src/navigation/ExplorePageStack";

import LandingPage from "./src/pages/LandingPage";
import RegisterPage from "./src/pages/RegisterPage";
import LoginPage from "./src/pages/LoginPage";
import TravelStackScreen from "./src/navigation/TravelPageStack";
import EditTravelPlanStackScreen from "./src/navigation/EditPlanStack";
import ExplorePageStack from "./src/navigation/ExplorePageStack";
import EmailVerificationPage from "./src/pages/EmailVerificationPage";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const httpLink = createHttpLink({
  uri: "https://5070-2620-101-f000-700-3-d157-d176-a79f.ngrok.io/graphql",
  credentials: "include",
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =
    (await AsyncStorage.getItem("curUser")) ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDg3NWY2ZWE3MjU2ZjQzYzQ1NWNhMSIsIm5hbWUiOiJKIiwiZW1haWwiOiJ3YW5kcjQ5N0BnbWFpbC5jb20iLCJwcm9maWxlX3BpYyI6InBpYyIsInBhc3N3b3JkIjoiMTIzIiwidG9rZW4iOiIiLCJlbWFpbFZhbGlkIjowLCJyYW5kU3RyIjoiNElRVkdYIiwic2F2ZWRQbGFucyI6W10sIndpc2hsaXN0UGxhbnMiOltdLCJpYXQiOjE2NTgzNTMxNDJ9.iRIQHW4PhJozDMWAebZxTj-Q70jYA8WFkR0WCPeQlxc";
  // console.log("authLink token:", token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : `Bearer ${""}`,
    },
  };
});

export const UserContext = React.createContext({
  userID: "",
  setUserID: (id) => {},
  userSessionToken: "",
  setUserSessionToken: (token) => {},
});

export const RegisterContext = React.createContext({
  regEmail: "",
  setRegEmail: (email) => {},
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
                  name="Plan"
                  component={TravelPage}
                  options={{
                    tabBarButton: () => null,
                    tabBarStyle: { display: "none" },
                    headerShown: false,
                  }}
                />
                <Tab.Screen
                  name="Explore"
                  component={ExplorePageStack}
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
