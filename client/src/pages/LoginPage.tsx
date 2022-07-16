import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  useContext,
} from "react";
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
} from "native-base";
import { Dimensions, Pressable } from "react-native";
import StyledTagInput from "../components/taginput";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import { AntDesign } from "@expo/vector-icons";
import { MutationAddUserArgs } from "../../../server/src/generated/graphql";
import { UserContext } from "../../App";
import Spinner from "react-native-loading-spinner-overlay";

export const AUTH_USER = gql`
  query authenticateUser($username: String!, $password: String!) {
    authenticateUser(username: $username, password: $password) {
      id
    }
  }
`;

export const AUTH_EMAIL = gql`
  query authUserEmail($email: String!, $password: String!) {
    authUserEmail(email: $email, password: $password) {
      id
    }
  }
`;

export let userLoggedIn = "" as String;
export function setUserLoggedIn(input: String) {
  userLoggedIn = input;
}

export default function LoginPage({ navigation }: { navigation: any }) {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { userID, setUserID } = useContext(UserContext);

  function goToHome() {
    navigation.navigate("Explore");
  }

  function validate1(resultData: { authenticateUser: { id: string } }) {
    // check: has user name & password fields
    let passwordValid = validatePassword() as boolean;
        let inputValid = validateInput() as boolean;
        let id = resultData.authenticateUser.id;

        console.log(errors.input, errors.password);

        if (!inputValid || !passwordValid)
        {
        }
        else
        {
            console.log("validation", id);
            if (id == "")
            {
                console.log("Invalid Credentials");
                setErrors({ ...errors,
                    input: 'Invalid Credentials',
                    password: 'Invalid Credentials'
                });
            }
            else
            {
              userLoggedIn = input;
              setUserID(resultData.authenticateUser.id);
              goToHome();
            }
        }
      };

      function validate2(resultData: { authUserEmail: { id: string } }) {
        // check: has user name & password fields
        let passwordValid = validatePassword() as boolean;
            let inputValid = validateInput() as boolean;
            let id = resultData.authUserEmail.id;
    
            console.log(errors.input, errors.password);
    
            if (!inputValid || !passwordValid)
            {
            }
            else
            {
                console.log("validation", id);
                if (id == "")
                {
                    console.log("Invalid Credentials");
                    setErrors({ ...errors,
                        input: 'Invalid Credentials',
                        password: 'Invalid Credentials'
                    });
                }
                else
                {
                  userLoggedIn = input;
                  setUserID(resultData.authUserEmail.id);
                  goToHome();
                }
            }
          };

  function validateInput() {
    if (input == "") {
      setErrors({ ...errors,
        input: 'Username or email is required'
      });
      return false;
    }
    return true;
  };

  function isEmail(str : String)
  {
    if (str.indexOf("@") == -1)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  function validatePassword() {
      if (password == "") {
        setErrors({ ...errors,
          password: 'Password is required'
        });
        return false;
      }
      return true;
  };

  const [authenticateUser, { data, error, loading }] = useLazyQuery(AUTH_USER, {
    onCompleted: (resultData) => {
      console.log("The result data", resultData);
      validate1(resultData);
    },
    fetchPolicy : 'cache-and-network'
  });

  if (loading) console.log(`Loading`);
  if (error) console.log(`Error! ${error.message}`);

  const [authUserEmail, { data : data1, error : error1, loading : loading1 }] = useLazyQuery(AUTH_EMAIL, {
    onCompleted: (resultData) => {
      console.log("The result data", resultData);
      validate2(resultData);
    },
    fetchPolicy : 'cache-and-network'
  });

  if (loading1) console.log(`Loading`);
  if (error1) console.log(`Error! ${error1.message}`);

  return (
    <ImageBackground
      source={{
        uri: "https://prod-virtuoso.dotcmscloud.com/dA/188da7ea-f44f-4b9c-92f9-6a65064021c1/heroImage1/PowerfulReasons_hero.jpg",
      }}
      imageStyle={{ opacity: 0.1 }}
    >
      <VStack h={1.1 * useWindowDimensions().height} w={useWindowDimensions().width}>
        <Box h={0.25 * useWindowDimensions().height}></Box>
        <FormControl isRequired isInvalid={(('input' in errors) && (errors.input != ""))}>
            <Stack mx="4">
                <FormControl.Label>Username/Email</FormControl.Label>
                <Input placeholder="User Name"
                    onChangeText={(input) => {setInput(input)}}
                    onKeyPress={() => {setErrors({ ...errors,
                        name: ""
                      })}}
                    onBlur={() => validateInput()}/>
            {('input' in errors) && <FormControl.ErrorMessage> {errors.input} </FormControl.ErrorMessage>}
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
          <Box mt={"2"} w="92%">
            <Button
              variant="solid"
              colorScheme="primary"
              onPress={() =>
                { if (!isEmail(input)) {
                    console.log("login - username");
                    authenticateUser({
                      variables: { username: input, password: password },
                    });
                  }
                  else {
                    console.log("login - email");
                    authUserEmail(
                      {
                        variables: { email: input, password: password },
                      }
                    );
                  }
                }
              }
            >
              Done
            </Button>
          </Box>
        </Center>
      </VStack>
    </ImageBackground>
  );
}
