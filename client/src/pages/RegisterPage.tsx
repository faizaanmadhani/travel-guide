import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
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
import { gql, useMutation } from "@apollo/client";
import { AntDesign } from "@expo/vector-icons";
import { MutationAddUserArgs } from "../../../server/src/generated/graphql";

const CREATE_USER = gql`
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
    const [addUser, { data, loading, error }] = useMutation(CREATE_USER);

    if (loading) console.log("Loading...");;
    if (error) console.log(`Error! ${error.message}`);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("email");
    const [profile_pic, setProfilePic] = useState("image");
    const [password, setPassword] = useState("");

    const onSubmit = () => {
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
                <FormControl.Label>Password</FormControl.Label>
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
                        onPress={onSubmit}>
                    Done
                </Button>
                </Box> 
            </Center>
        </VStack>

        
    );
}
