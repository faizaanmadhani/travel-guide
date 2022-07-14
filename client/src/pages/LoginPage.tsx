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

export let userLoggedIn = "" as String;
export function setUserLoggedIn(name: String) {
  userLoggedIn = name;
}

export default function LoginPage({ navigation }: { navigation: any }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});


  const { userID, setUserID } = useContext(UserContext);

  function goToHome() {
    navigation.navigate("Explore");
  }

  function validate(resultData: { authenticateUser: { id: string } }) {
    // check: has user name & password fields
    let passwordValid = validatePassword() as boolean;
        let nameValid = validateName() as boolean;
        let id = resultData.authenticateUser.id;

        console.log(errors.name, errors.password);

        if (!nameValid || !passwordValid)
        {
        }
        else
        {
            console.log("validation", id);
            if (id == "")
            {
                console.log("Invalid Credentials");
                setErrors({ ...errors,
                    name: 'Invalid Credentials',
                    password: 'Invalid Credentials'
                });
            }
            else
            {
              userLoggedIn = name;
              setUserID(resultData.authenticateUser.id);
              goToHome();
            }
        }
      };

  function validateName() {
    if (name == "") {
      setErrors({ ...errors,
        name: 'Name is required'
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

  const [authenticateUser, { data, error, loading }] = useLazyQuery(AUTH_USER, {
    onCompleted: (resultData) => {
      console.log("The result data", resultData);
      validate(resultData);
    },
    fetchPolicy : 'cache-and-network'
  });

  if (loading) console.log(`Loading`);
  if (error) console.log(`Error! ${error.message}`);

  return (
    <ImageBackground
      source={{
        uri: "https://prod-virtuoso.dotcmscloud.com/dA/188da7ea-f44f-4b9c-92f9-6a65064021c1/heroImage1/PowerfulReasons_hero.jpg",
      }}
      imageStyle={{ opacity: 0.1 }}
    >
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
                authenticateUser({
                  variables: { username: name, password: password },
                })
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
