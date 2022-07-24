import React, { useState, useContext } from "react";
import { Alert, useWindowDimensions, StyleSheet, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Button, Text, Box, Icon, extendTheme,
  Center, Image, HStack, VStack, Container, AspectRatio, Divider, useToast } from "native-base";
import { Entypo } from '@expo/vector-icons';
import { UserProvider } from "../../../server/src/provider"
import { gql, useQuery, ApolloProvider, useMutation, useLazyQuery } from "@apollo/client";
import { client } from "../../App";
import { setUserLoggedIn, userLoggedIn } from "./LoginPage";
import { CREATE_USER } from "./RegisterPage";
import { UserContext } from "../../App";
import PageView from "../components/PageView";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GET_USER = gql`
  query user($id: String!) {
    user(id: $id) {
      name
      email
      profile_pic
    }
  }
`;

function displayUser()
{
  const { userID, setUserID } = useContext(UserContext);
  console.log("logged in:", userID);

  const { data, error, loading } = useQuery(GET_USER, {
    variables: { id : userID },
    fetchPolicy : 'cache-and-network'
  });

  if (loading)
  {
    console.log(`Loading`);
    return "Loading ...";
  }

  if (error)
  {
    console.log(`Error! ${error.message}`);
    return `Error! ${error.message}`;
  };

  console.log("our data", data.user);

  const name = data.user.name;
  const email = data.user.email;

  return(
    <VStack>
        <HStack>
          <Box m = "2">
            {/* <Text>
              Profile Pic: {user_profilePic}
            </Text> */}
            <Image rounded="lg" source={{
                              uri: "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
                              }}
                              alt="Alternate Text"
                              height={"100"} width={"100"} resizeMode={"contain"} alignSelf={"center"}/>
          </Box>
          <Center m={"2"}>
          <VStack>
            
            <Text>
              Username: {name}
            </Text>

            <Text>
              Email: {email}
            </Text>
            {/* <Text>
              Password: {user_password}
            </Text> */}
            
          </VStack>
          </Center>
        </HStack>
      </VStack>
      
  );
}

export default function ProfilePage({ navigation, route } : { navigation: any, route : any }) {
  const { userID, setUserID } = useContext(UserContext);
  // console.log("logged in:", userID);

  const toast = useToast();

  async function Logout() {
    toast.show({
      description: "Logout Success",
      duration: 3000,
      backgroundColor: "success.400",
      placement: "top"
    });
    navigation.navigate("Wandr");
  }

  return (
    <PageView>
      <VStack width={useWindowDimensions().width}>
        <Box>
          {displayUser()}
          <Button size={"md"} variant="solid" colorScheme="red"
                            onPress={() => {Logout()}}>
                        Log Out
          </Button>
        </Box>
      </VStack>
    </PageView>
  );
}
