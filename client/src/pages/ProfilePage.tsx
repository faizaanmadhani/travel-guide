import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Button, SunIcon, Text, Box, Icon, extendTheme, Center, Image, HStack, VStack, Container, AspectRatio, Divider } from "native-base";
import { Entypo } from '@expo/vector-icons';
import { UserProvider } from "../../../server/src/provider"
import { gql, useQuery, ApolloProvider } from "@apollo/client";
import { client } from "../../App";

export const GET_USERS = gql`query GetUsers {
  users {
    name
    email
    profile_pic
    password
  }
}`;

export default function ProfilePage() {
  let username = "Jiawen";

  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) console.log("Loading...");
  if (error) console.log(`Error! ${error.message}`);

  if (data)
  {
    let user_idx = -1 as number;
    console.log(`${data[0]}`);
    for (let i = 0; i < 100 && data[i] != undefined; i++)
    {
      if (data.users[i].name == username)
      {
        user_idx = i;
        break;
      }
    }
  }

  return (
  <VStack width={'100%'} mb={"1"} mt={"1"} mr={"1"} justifyContent="space-between">
    <Text bold alignSelf={'center'} fontSize={"lg"}>
      name
    </Text>
    <Text bold alignSelf={'center'} fontSize={"lg"}>
        email
    </Text>     
  </VStack>
  );
}
