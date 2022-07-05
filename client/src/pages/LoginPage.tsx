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

const AUTH_USER = gql`
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
  // fetch pre-existing data
  // const { data, error, loading } = useQuery(GET_USERS, {fetchPolicy : 'cache-and-network'});

  // set up for adding user
  // const [addUser, { data, loading, error }] = useMutation(CREATE_USER);

  // if (loading) console.log("Loading...");;
  // if (error) console.log(`Error! ${error.message}`);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { userID, setUserID } = useContext(UserContext);

  function goToHome() {
    navigation.navigate("Explore");
  }

  async function LoginUser(resultData: { authenticateUser: { id: string } }) {
    // check: has user name & password fields
    let passwordEntered = true,
      usernameEntered = true;
    if (password == "") {
      passwordEntered = false;
    }
    if (name == "") {
      usernameEntered = false;
    }
    // check: user name exists
    let userExists = false;
    let userIdx = -1;

    if (!usernameEntered) {
      Alert.alert(
        "No User Name",
        "User Name is a required field, please enter an user name.",
        [
          {
            text: "OK",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ]
      );
    } else if (!passwordEntered) {
      Alert.alert(
        "No Password",
        "Password is a required field, please enter a password.",
        [
          {
            text: "OK",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ]
      );
    }

    if (usernameEntered) {
      let passwordCorrect = false;
      if (resultData.authenticateUser.id !== "") {
        passwordCorrect = true;
        userExists = true;
      } else {
        passwordCorrect = false;
      }

      if (!userExists) {
        Alert.alert(
          `User ${name} Not Found`,
          "Please register or re-enter user name.",
          [
            {
              text: "Register",
              onPress: () => navigation.navigate("Register"),
            },
            {
              text: "Re-enter",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ]
        );
      } else if (!passwordCorrect) {
        Alert.alert(
          `Incorrect Password`,
          `Please re-enter password for User ${name}.`,
          [
            {
              text: "Re-enter",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ]
        );
      } else {
        userLoggedIn = name;
        console.log(userLoggedIn);
        setUserID(resultData.authenticateUser.id);
        Alert.alert("Login Success", `User ${name} successfully logged in!`, [
          {
            text: "Go to App",
            onPress: () => goToHome(),
          },
        ]);
      }
    }
  }

  const [authenticateUser, { data, error, loading }] = useLazyQuery(AUTH_USER, {
    onCompleted: (resultData) => {
      console.log("The result data", resultData);
      LoginUser(resultData);
    },
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
      <VStack h={useWindowDimensions().height} w={useWindowDimensions().width}>
        <Box h={0.25 * useWindowDimensions().height}></Box>
        <FormControl isRequired>
          <Stack mx="4">
            <FormControl.Label>User Name</FormControl.Label>
            <Input
              placeholder="User Name"
              onChangeText={(name) => setName(name)}
            />
          </Stack>
        </FormControl>

        <FormControl isRequired>
          <Stack mx="4">
            <FormControl.Label> Password </FormControl.Label>
            <Input
              type="password"
              placeholder="password"
              onChangeText={(password) => setPassword(password)}
            />
            {/* <FormControl.HelperText>
                Must be at least 6 characters.
                </FormControl.HelperText>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                At least 6 characters are required.
                </FormControl.ErrorMessage> */}
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
