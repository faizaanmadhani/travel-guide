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
import { GET_USER_ID } from "./RegisterPage";

export const VERIFY_EMAIL = gql`
  query verifyEmail($email: String!) {
    verifyEmail(email: $email) {
      id
      name
      email
      randStr
      emailValid
    }
  }
`;

export const MODIFY_USER = gql`
  mutation modifyUser($input: UpdateUserInput!) {
    modifyUser(input: $input) {
        id
        name
        email
        emailValid
    }
  }
`;

export default function EmailVerificationPage({ navigation }: { navigation: any })
{
    const toast = useToast();
    const [code, setCode] = useState("");
    const [errors, setErrors] = useState({});

    const { regEmail, setRegEmail } = useContext(RegisterContext);
    // console.log("verify:", regEmail);

    const { data, error, loading } = useQuery(VERIFY_EMAIL, {
        variables: { email : regEmail },
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

    // update user
    const [modifyUser, { data : data1, loading : loading1, error : error1 }] = useMutation(MODIFY_USER,
        {refetchQueries: [{query: GET_USER_ID}]});

    if (loading1) console.log("Loading...");;
    if (error1) console.log(`Error! ${error1.message}`);

    function updateEmailValid(valid : Number) {
        // new code after current one is used
        modifyUser({
          variables: {
            input: {
                id: data.verifyEmail.id,
                name: "",
                email: "",
                profile_pic: "",
                password: "",
                randStr: randString(),
                emailValid: valid
            },
          },
        });
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
        else if ((code !== data.verifyEmail.randStr))
        {
            console.log(code, " | ", data.verifyEmail.randStr, code === data.verifyEmail.randStr);
            setErrors({ ...errors,
                code: 'Incorrect Code'
              });
        }
        else // valid code
        {
            toast.show({
                description: "Email Verified",
                duration: 3000,
                backgroundColor: "success.400"
            });
            updateEmailValid(1);
            goToLogin();
        }
    }

    const info = `Enter code sent to: ${data?.verifyEmail.email}`;

    return (
            <ImageBackground source={{uri:"https://prod-virtuoso.dotcmscloud.com/dA/188da7ea-f44f-4b9c-92f9-6a65064021c1/heroImage1/PowerfulReasons_hero.jpg"}}
        imageStyle={{opacity:0.1}}>


        <VStack h={1.1 * useWindowDimensions().height} w={useWindowDimensions().width}>
            <Box h={0.25 * useWindowDimensions().height}></Box>
            <FormControl isRequired isInvalid={(('code' in errors) && (errors.code != ""))}>
            <VStack mx="4">
                <FormControl.Label>{info}</FormControl.Label>
                {/* <FormControl.HelperText> {info} </FormControl.HelperText> */}
                <Input placeholder="Code"
                    onChangeText={(code) => {setCode(code)}}
                    onKeyPress={() => {setErrors({ ...errors,
                        code: ''
                      })}}
                    onBlur={() => validateCode()}/>
            {('code' in errors) && <FormControl.ErrorMessage> {errors.code} </FormControl.ErrorMessage>}
            </VStack>

            </FormControl>

            <Center>
               <Box mt={"2"} w = "92%">
                <Button variant="solid" colorScheme="primary"
                        onPress={() => {validate()}}>
                    Done
                </Button>
                </Box> 
                <Box mt={"2"} w = "92%">
                <Button variant="subtle" colorScheme="primary"
                        onPress={() => {goToLogin()}}>
                    Skip to Login
                </Button>
                </Box>

            </Center>
        </VStack>
        </ImageBackground>
        
    );
}


function randString() {
    const codeLen = 6;
    let code = '';
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let alphabetLen = alphabet.length;
    for ( var i = 0; i < codeLen; i++ ) {
      code += alphabet.charAt(Math.floor(Math.random() * alphabetLen));
    }
    return code;
  }
