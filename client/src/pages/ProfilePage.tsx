import React, { useState } from "react";
import { Alert, useWindowDimensions } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Button, Text, Box, Icon, extendTheme, Center, Image, HStack, VStack, Container, AspectRatio, Divider } from "native-base";
import { Entypo } from '@expo/vector-icons';
import { UserProvider } from "../../../server/src/provider"
import { gql, useQuery, ApolloProvider, useMutation } from "@apollo/client";
import { client } from "../../App";
import { GET_PLANS } from "../components/PlanView";
import { setUserLoggedIn, userLoggedIn } from "./LoginPage";
import { CREATE_USER } from "./RegisterPage";

export const GET_USERS = gql`query GetUsers {
  users {
    name
    password
    email
    profile_pic
  }
}`;

export function GetUser(username : String)
{
  const { loading, error, data } = useQuery(GET_USERS, {fetchPolicy : 'cache-and-network'});
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  let user_idx = -1 as number;

  for (let i = 0; data.users[i] != undefined; i++)
  {
    if (data.users[i].name == username)
    {
      user_idx = i;
      break;
    }
  }

  const user_name = (user_idx < 0) ? "N/A" : data.users[user_idx].name;
  const user_email = (user_idx < 0) ? "N/A" : data.users[user_idx].email;
  const user_password = (user_idx < 0) ? "N/A" : data.users[user_idx].password;
  const user_profilePic = (user_idx < 0) ? "N/A" : data.users[user_idx].profile_pic;

  return (
    <VStack>
      <HStack>
        <Box m = "2">
          {/* <Text>
            Profile Pic: {user_profilePic}
          </Text> */}
           <Image rounded="lg" source={{
                            uri: "https://prod-virtuoso.dotcmscloud.com/dA/188da7ea-f44f-4b9c-92f9-6a65064021c1/heroImage1/PowerfulReasons_hero.jpg"
                            }}
                            alt="Alternate Text"
                            height={"100"} width={"100"} resizeMode={"contain"} alignSelf={"center"}/>
        </Box>
        <Center m={"2"}>
        <VStack>
          
          <Text>
            User Name: {user_name}
          </Text>
          <Text>
            Password: {user_password}
          </Text>
          
        </VStack>
        </Center>
      </HStack>
      
    </VStack>
    
    
  );
}

export default function ProfilePage({ navigation, route }: { navigation: any, route : any }) {
  function Logout() {
    Alert.alert("Log Out Success",
                    `User ${userLoggedIn} Logged Out`,
                    [
                        {
                            text: "OK", onPress: () => {setUserLoggedIn(""), navigation.navigate("Wandr")}
                        }
                    ]);
  }

  return (
    <VStack>
      <Box maxW={ useWindowDimensions().width }>
      {GetUser(userLoggedIn)}
      
      <Button size={"md"} variant="solid" colorScheme="red"
                        onPress={() => {Logout()}}>
                    Log Out
                </Button>
      </Box>

      
    </VStack>
    
  // <VStack width={'100%'} mb={"1"} mt={"1"} mr={"1"} justifyContent="space-between">
  //   <Text bold alignSelf={'center'} fontSize={"lg"}>
  //     name
  //   </Text>
  //   <Text bold alignSelf={'center'} fontSize={"lg"}>
  //       email
  //   </Text>     
  // </VStack>
  );
}
