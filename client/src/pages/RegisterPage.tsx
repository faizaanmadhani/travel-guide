import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { Alert, useWindowDimensions, ImageBackground } from "react-native";
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

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    addUser(input: $input) {
      name
      email
      profile_pic
      password
    }
  }
`;

export default function RegisterPage({ navigation }: { navigation: any }) {
    // fetch pre-existing data
    const { data: data1, error: error1, loading: loading1 } = useQuery(GET_USERS, {fetchPolicy : 'cache-and-network'});
    if (loading1) console.log("Loading...");
    if (error1) console.log(`Error! ${error1.message}`);

    // set up for adding user
    const [addUser, { data, loading, error }] = useMutation(CREATE_USER, {refetchQueries: [{query: GET_USERS}]});

    if (loading) console.log("Loading...");;
    if (error) console.log(`Error! ${error.message}`);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("email.com");
    const [profile_pic, setProfilePic] = useState("pic");
    const [password, setPassword] = useState("");

    function submitInfo() {
        addUser({
          variables: {
            input: {
              name: name,
              email: email,
              profile_pic: profile_pic,
              password: password,
            },
          },
        });
    };
    
    function goToLogin() {
        navigation.navigate("Login");
    };
    
    function registerUser() {
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
        // check: unique user name
        let userExists = false;
        for (let i = 0; data1.users[i] != undefined; i++)
        {
            if (data1.users[i].name == name)
            {
                userExists = true;
                break;
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
        else if (userExists)
        {
            Alert.alert(`User ${name} Already Exists`,
                    "Please choose a different user name.",
                    [
                        {
                            text: "OK", onPress: () => console.log("Cancel Pressed"), style: "cancel"
                        }
                    ]);
        }
        else
        {
            submitInfo();

            Alert.alert("Registeration Success",
                    `User ${name} successfully registered!`,
                    [
                        {
                            text: "Go to Login", onPress: () => goToLogin()
                        }
                    ]);
        }
    }

    return (
        <ImageBackground source={{uri:"https://prod-virtuoso.dotcmscloud.com/dA/188da7ea-f44f-4b9c-92f9-6a65064021c1/heroImage1/PowerfulReasons_hero.jpg"}}
        imageStyle={{opacity:0.1}}>
        <VStack h={useWindowDimensions().height} w={useWindowDimensions().width}>
            <Box h={0.25 * useWindowDimensions().height}></Box>
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
                        onPress={() => {registerUser()}}>
                    Done
                </Button>
                </Box> 
            </Center>
        </VStack>
        </ImageBackground>
    );
}
