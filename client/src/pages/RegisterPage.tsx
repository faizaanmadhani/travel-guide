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
  VStack,
  useToast
} from "native-base";
import { Dimensions, Pressable } from "react-native";
import StyledTagInput from "../components/taginput";
import { gql, useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { AntDesign } from "@expo/vector-icons";
import { MutationAddUserArgs } from "../../../server/src/generated/graphql";
import { AUTH_USER } from "./LoginPage";

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

export const GET_USER_ID = gql`
  query getUserID($username: String!, $email: String!) {
    getUserID(username: $username, email: $email) {
      id
      name
      email
    }
  }
`;


export default function RegisterPage({ navigation }: { navigation: any }) {
    const toast = useToast();

    // fetch pre-existing data
    const [getUserID, { error : error1, loading : loading1, data : data1 }] = useLazyQuery(GET_USER_ID, {
        onCompleted: (resultData) => {
          console.log("The result data", resultData);
          validate(resultData);
        },
        fetchPolicy : 'cache-and-network'
      });
    
    if (loading1) console.log(`Loading`);
    if (error1) console.log(`Error! ${error1.message}`);

    // set up for adding user
    const [addUser, { data, loading, error }] = useMutation(CREATE_USER, {refetchQueries: [{query: GET_USERS}]});

    if (loading) console.log("Loading...");;
    if (error) console.log(`Error! ${error.message}`);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [profile_pic, setProfilePic] = useState("pic");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

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

    function validateName() {
        if (name == "") {
          setErrors({ ...errors,
            name: 'Username is required'
          });
          return false;
        }
        else if (name.indexOf("@") > -1) {
            setErrors({ ...errors,
                name: 'Username cannot contain symbol "@"'
              });
            return false;
        }
        return true;
    };

    function validateEmail() {
        if (email == "") {
          setErrors({ ...errors,
            email: 'Email is required'
          });
          return false;
        }
        else if (email.indexOf("@") == -1)
        {
            setErrors({ ...errors,
                email: 'Invalid email address'
              });
              return false;
        }
        return true;
    };

    function validatePassword() {
        if (password == "") {
          setErrors({ ...errors,
            password: 'Password is required'
          });
          return false;
        }
        return true;
    };

    function validate(resultData: { getUserID: { id: string, name: String, email: String } }) {
        let passwordValid = validatePassword() as boolean;
        let emailValid = validateEmail() as boolean;
        let nameValid = validateName() as boolean;
        let id = resultData.getUserID.id;

        console.log(errors.name, errors.email, errors.password);

        if (!nameValid || !emailValid || !passwordValid)
        {
        }
        else
        {
            console.log("validation", id);
            if (id != "")
            {
                if (name == resultData.getUserID.name)
                {
                    console.log("User Name Already Exists");
                    setErrors({ ...errors,
                        name: 'User Name Already Exists'
                    });
                }
                
                if (email == resultData.getUserID.email)
                {
                    console.log("Email Already Exists");
                    setErrors({ ...errors,
                        email: 'Email Already Exists'
                    });
                }
            }
            else
            {
                submitInfo();
                toast.show({
                    description: "Registeration Success",
                    duration: 3000,
                    backgroundColor: "success.400"
                });
                goToLogin();
            }
        }
    };

    function onSubmit() {
        getUserID({
            variables: { username: name, email: email },
        });
    };

    return (
        <ImageBackground source={{uri:"https://prod-virtuoso.dotcmscloud.com/dA/188da7ea-f44f-4b9c-92f9-6a65064021c1/heroImage1/PowerfulReasons_hero.jpg"}}
        imageStyle={{opacity:0.1}}>

        <VStack h={1.1 * useWindowDimensions().height} w={useWindowDimensions().width}>
            <Box h={0.25 * useWindowDimensions().height}></Box>

            <FormControl isRequired isInvalid={(('name' in errors) && (errors.name != ""))}>
            <Stack mx="4">
                <FormControl.Label>User Name</FormControl.Label>
                <Input placeholder="User Name"
                    onChangeText={(name) => {setName(name)}}
                    onKeyPress={() => {setErrors({ ...errors,
                        name: ""
                      })}}
                    onBlur={() => validateName()}/>
            {('name' in errors) && <FormControl.ErrorMessage> {errors.name} </FormControl.ErrorMessage>}
            </Stack>
            </FormControl>

            <FormControl isRequired isInvalid={(('email' in errors) && (errors.email != ""))}>
            <Stack mx="4">
                <FormControl.Label>Email</FormControl.Label>
                <Input placeholder="Email"
                    onChangeText={(email) => {setEmail(email)}}
                    onKeyPress={() => {setErrors({ ...errors,
                        email: ''
                      })}}
                    onBlur={() => validateEmail()}/>
                {('email' in errors) && <FormControl.ErrorMessage> {errors.email} </FormControl.ErrorMessage>}
            </Stack>
            </FormControl>

            <FormControl isRequired isInvalid={('password' in errors) && (errors.password != "")}>
            <Stack mx="4">
                <FormControl.Label> Password </FormControl.Label>
                <Input type="password" placeholder="Password"
                        onChangeText={(password) => {setPassword(password)}}
                        onKeyPress={() => {setErrors({ ...errors,
                            password: ''
                          })}}
                        onBlur={() => validatePassword()}/>
                {('password' in errors) && <FormControl.ErrorMessage> {errors.password} </FormControl.ErrorMessage>}
            </Stack>
            </FormControl>

            <Center>
               <Box mt={"2"} w = "92%">
                <Button variant="solid" colorScheme="primary"
                        onPress={() => {onSubmit()}}>
                    Done
                </Button>
                </Box> 
            </Center>
        </VStack>
        </ImageBackground>
    );
}
