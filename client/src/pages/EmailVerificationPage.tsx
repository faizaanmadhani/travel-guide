import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect, useState, useRef, useContext } from "react";
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
import { RegisterContext } from "../../App";

export const GET_USER_V = gql`
  query getUserID($username: String!, $email: String!) {
    getUserID(username: $username, email: $email) {
      id
      name
      email
      randStr
    }
  }
`;

export default function EmailVerificationPage({ navigation }: { navigation: any })
{
    const toast = useToast();
    const [code, setCode] = useState("");
    const [errors, setErrors] = useState({});
    let codeCorrect = "" as String;

    const { regEmail, setRegEmail } = useContext(RegisterContext);
    // console.log("verify:", regEmail);

    const { data, error, loading } = useQuery(GET_USER_V, {
        variables: { username : "", email : regEmail },
        onCompleted: (resultData) => {
            console.log("The result data", resultData);
          },
        fetchPolicy : 'cache-and-network'
    });

    if (loading)
    {
        console.log(`Loading`);
        // return "Loading ...";
    }

    if (error)
    {
        console.log(`Error! ${error.message}`);
        // return `Error! ${error.message}`;
    };

    function goToLogin() {
        navigation.navigate("Login");
    }

    function validateCode() {
        if (code == "") {
          setErrors({ ...errors,
            code: 'This field cannot be empty'
          });
          return false;
        }
        else if (code.length != 6) {
            setErrors({ ...errors,
                code: 'Code must be length 6'
              });
            return false;
        }
        return true;
    };

    function validate()
    {
        if (!validateCode())
        {

        }
        else if ((code !== data.getUserID.randStr))
        {
            console.log(code, " | ", data.getUserID.randStr, code === data.getUserID.randStr);
            setErrors({ ...errors,
                code: 'Incorrect Code'
              });
        }
        else
        {
            toast.show({
                description: "Email Verified",
                duration: 3000,
                backgroundColor: "success.400"
            });
            goToLogin();
        }
    }

    return (
            <ImageBackground source={{uri:"https://prod-virtuoso.dotcmscloud.com/dA/188da7ea-f44f-4b9c-92f9-6a65064021c1/heroImage1/PowerfulReasons_hero.jpg"}}
        imageStyle={{opacity:0.1}}>

        <VStack h={1.1 * useWindowDimensions().height} w={useWindowDimensions().width}>
            <Box h={0.25 * useWindowDimensions().height}></Box>
            <FormControl isRequired isInvalid={(('code' in errors) && (errors.code != ""))}>
            <Stack mx="4">
                <FormControl.Label>Verification Code</FormControl.Label>
                <Input placeholder="Code"
                    onChangeText={(code) => {setCode(code)}}
                    onKeyPress={() => {setErrors({ ...errors,
                        code: ""
                      })}}
                    onBlur={() => validateCode()}/>
            {('code' in errors) && <FormControl.ErrorMessage> {errors.code} </FormControl.ErrorMessage>}
            </Stack>
            </FormControl>

            <Center>
               <Box mt={"2"} w = "92%">
                <Button variant="solid" colorScheme="primary"
                        onPress={() => {validate()}}>
                    Done
                </Button>
                </Box> 
            </Center>
        </VStack>
        </ImageBackground>
        
    );
}