import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { Alert } from "react-native";
import {
  Input,
  Box,
  Stack,
  FormControl,
  ScrollView,
  Text,
  Divider,
  WarningOutlineIcon,
  TextArea,
  Button,
  HStack,
  IconButton,
  Center,
  VStack
} from "native-base";
import { Dimensions, Pressable } from "react-native";
import StyledTagInput from "../components/taginput";
import { gql, useMutation, useQuery } from "@apollo/client";
import { AntDesign } from "@expo/vector-icons";
import { MutationAddUserArgs } from "../../../server/src/generated/graphql";
import { GET_USERS } from "./ProfilePage";
import { CREATE_USER } from "./RegisterPage";

export let userLoggedIn = "" as String;
export function setUserLoggedIn(name : String)
{
    userLoggedIn = name;
}

export default function LoginPage({ navigation }: { navigation: any }) {
    // fetch pre-existing data
    const { data, error, loading } = useQuery(GET_USERS, {fetchPolicy : 'cache-and-network'});
    if (loading) console.log("Loading...");
    if (error) console.log(`Error! ${error.message}`);

    // set up for adding user
    // const [addUser, { data, loading, error }] = useMutation(CREATE_USER);

    // if (loading) console.log("Loading...");;
    // if (error) console.log(`Error! ${error.message}`);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    function goToHome() {
        navigation.navigate("Explore");
    };
    
    function LoginUser() {
        // check: has user name & password fields
        let passwordEntered = true, usernameEntered = true;
        if (password == "")
        {
            passwordEntered = false;
        }
        if (name == "")
        {
            usernameEntered = false;
        }
        // check: user name exists
        let userExists = false;
        let userIdx = -1;
        for (let i = 0; data.users[i] != undefined; i++)
        {
            if (data.users[i].name == name)
            {
                userExists = true;
                userIdx = i;
                break;
            }
        }
        // check: passwordCorrect
        let passwordCorrect = false;
        if (userExists)
        {
            if (data.users[userIdx].password == password)
            {
                passwordCorrect = true;
            }
        }
        

        if (!usernameEntered)
        {
            Alert.alert("No User Name",
                    "User Name is a required field, please enter an user name.",
                    [
                        {
                            text: "OK", onPress: () => console.log("Cancel Pressed"), style: "cancel"
                        }
                    ]);
        }
        else if (!passwordEntered)
        {
            Alert.alert("No Password",
                    "Password is a required field, please enter a password.",
                    [
                        {
                            text: "OK", onPress: () => console.log("Cancel Pressed"), style: "cancel"
                        }
                    ]);
        }
        else if (!userExists)
        {
            Alert.alert(`User ${name} Not Found`,
                    "Please register or re-enter user name.",
                    [
                        {
                            text: "Register", onPress: () => navigation.navigate("Register")
                        },
                        {
                            text: "Re-enter", onPress: () => console.log("Cancel Pressed"), style: "cancel"
                        }
                    ]);
        }
        else if (!passwordCorrect)
        {
            Alert.alert(`Incorrect Password`,
                    `Please re-enter password for User ${name}.`,
                    [
                        {
                            text: "Re-enter", onPress: () => console.log("Cancel Pressed"), style: "cancel"
                        }
                    ]);
        }
        else
        {
            userLoggedIn = name;
            Alert.alert("Login Success",
                    `User ${name} successfully logged in!`,
                    [
                        {
                            text: "Go to App", onPress: () => goToHome()
                        }
                    ]);
        }
    }

    return (
        <VStack>
            <FormControl isRequired>
            <Stack mx="4">
                <FormControl.Label>User Name</FormControl.Label>
                <Input placeholder="User Name"
                    onChangeText={(name) => setName(name)}/>
            </Stack>
            </FormControl>

            <FormControl isRequired>
            <Stack mx="4">
                <FormControl.Label> Password </FormControl.Label>
                <Input type="password" placeholder="password"
                        onChangeText={(password) => setPassword(password)}/>
                {/* <FormControl.HelperText>
                Must be at least 6 characters.
                </FormControl.HelperText>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                At least 6 characters are required.
                </FormControl.ErrorMessage> */}
            </Stack>
            </FormControl>

            <Center>
               <Box mt={"2"} w = "92%">
                <Button variant="solid" colorScheme="primary"
                        onPress={() => {LoginUser()}}>
                    Done
                </Button>
                </Box> 
            </Center>
        </VStack>

    );
}
