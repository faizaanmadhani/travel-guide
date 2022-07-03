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

export default function LoginPage() {
    return (
            <Box>
               <Text>
                    Login
               </Text>
            </Box>
    );
}