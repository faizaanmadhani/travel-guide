import React from "react";
import { useWindowDimensions } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Button, Text, Box, Icon, extendTheme, Center, Image, HStack, VStack, Container, AspectRatio, Divider } from "native-base";
import { Entypo } from '@expo/vector-icons';
import { UserProvider } from "../../../server/src/provider"
import { gql, useQuery, ApolloProvider } from "@apollo/client";
import { client } from "../../App";
import { GET_PLANS } from "../components/PlanView";

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
  const { loading, error, data } = useQuery(GET_USERS);
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
    <Box>
      <Text>
        User Name: {user_name}
      </Text>
      <Text>
        Email: {user_email}
      </Text>
      <Text>
        Profile Pic: {user_profilePic}
      </Text>
      <Text>
        Password: {user_password}
      </Text>
    </Box>
    
  );
}

export default function ProfilePage() {
  let username = "JiawenZ";

  return (
    <Box maxW={ useWindowDimensions().width }>
      {GetUser(username)}
    </Box>
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
