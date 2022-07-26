import React, { useContext } from "react";
import {
  Box,
  AspectRatio,
  Image,
  Center,
  Stack,
  Heading,
  Text,
  HStack,
  VStack,
  ScrollView,
  Input,
  IconButton,
  Button,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { gql, useMutation, useQuery } from "@apollo/client";
import TravelPlanPage from "./PlanMain";
import { UserContext } from "../../App";
import Spinner from "react-native-loading-spinner-overlay";
import PlanCardSmall from "../components/PlanCardSmall";
import { Pressable } from "react-native";

const styles = {
  screenLayout: {
    margin: "1rem",
  },
  travelPlan: {
    marginBottom: "1rem",
  },
};

const CREATE_BLANK_PLAN = gql`
  mutation createTravelPlan($creatorId: String!) {
    addPlan(creatorId: $creatorId) {
      id
    }
  }
`;

const GET_SAVED_PLANS = gql`
  query ($userID: String!) {
    user(id: $userID) {
      savedPlans {
        id
        name
        budget
        rating
        tags
        description
        countries
        months
        assetLinks
      }
    }
  }
`;

export default function TravelPage({ navigation }: { navigation: any }) {
  const { userID } = useContext(UserContext);

  console.log("THE USER ID", userID);

  const {
    data: planData,
    loading: planLoading,
    error: planError,
    refetch,
  } = useQuery(GET_SAVED_PLANS);

  const [createBlankPlan, { data, loading, error }] = useMutation(
    CREATE_BLANK_PLAN,
    {
      onCompleted: (resultData) => {
        console.log("The result data", resultData);
        navigation.push("Create Travel Plan", {
          planID: resultData.addPlan.id,
        });
      },
    }
  );

  if (planLoading) return <Spinner />;

  return (
    <SafeAreaView>
      <Button
        marginBottom={2}
        onPress={() => {
          console.log("refetching...");
          refetch({
            userID: userID,
          });
        }}
      >
        Refetch
      </Button>
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
      />
      <VStack>
        <Box alignItems="flex-start">
          <HStack justifyContent="space-between">
            <Input mx="3" placeholder="Search Travel Plans" w="70%" />
            <IconButton
              icon={<AntDesign name="filter" size={25} color="#CCD2E3" />}
            />
            <IconButton
              icon={<AntDesign name="pluscircle" size={25} color="#06B6D4" />}
              onPress={() => {
                createBlankPlan({ variables: { creatorId: userID } });
              }}
            />
          </HStack>
        </Box>
      </VStack>
      <VStack margin={"1"}></VStack>
      <ScrollView>
        <Stack space={2} alignItems="center">
          {planData &&
            planData.user.savedPlans.map((plan) => {
              console.log("obj plan", plan);
              return (
                <Box mr="1">
                  <PlanCardSmall
                    plan={plan}
                    navigation={navigation}
                    userID={userID}
                  />
                </Box>
              );
            })}
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
}
