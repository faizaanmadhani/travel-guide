import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  ScrollView,
  Stack,
  Text,
  Image,
  HStack,
  Button,
  Center,
  View,
  Box,
  Spinner,
} from "native-base";
import { StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import { PlanView_Data } from "../components/PlanView";
import BlockPage from "../pages/BlockPage";

const GET_PLAN_DETAILS = gql`
  query GetPlan($planID: String!, $day: Int!) {
    plan(id: $planID) {
      name
      id
      blocks(day: $day) {
        title
        id
      }
    }
  }
`;

const TravelPlanPage = (route: any, navigation: any) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const [daysLabels, setDaysLabels] = useState(["Intro"]);

  const { planID } = route;

  const { data, loading, error, refetch } = useQuery(GET_PLAN_DETAILS, {
    variables: {
      planID: planID,
      day: activeTab >= 1 ? activeTab : 1,
    },
  });

  if (loading) return <Spinner />;

  return (
    <ScrollView>
      {/* {data && ( */}
      <Stack space={3}>
        <Stack marginLeft={"4"} marginRight={"4"} space={3}>
          <Text fontSize="2xl" bold>
            {data.plan.name}
          </Text>
          <ScrollView horizontal={true}>
            <HStack>
              {daysLabels.map((label, index) =>
                activeTab === index ? (
                  <Button
                    marginRight="1"
                    onPress={(_) => setActiveTab(index)}
                    key={label}
                    backgroundColor="#06B6D4"
                  >
                    {label}
                  </Button>
                ) : (
                  <Button
                    marginRight="1"
                    variant="outline"
                    onPress={(_) => setActiveTab(index)}
                    key={label}
                  >
                    {label}
                  </Button>
                )
              )}
            </HStack>
          </ScrollView>
        </Stack>
        <ScrollView marginLeft={"4"} marginRight={"4"}>
          {activeTab == 0 ? (
            <Stack space={3}>
              <Center>
                <Image
                  source={{
                    uri: "https://wallpaperaccess.com/full/317501.jpg",
                  }}
                  alt="Alternate Text"
                  size="2xl"
                  width="100%"
                />
              </Center>
              <HStack justifyContent="space-between">
                <Text bold>Rating: {data.plan.rating}</Text>
              </HStack>
              <Text>{data.plan.description}</Text>
            </Stack>
          ) : (
            <BlockPage
              navigation={navigation}
              planID={data.plan.id}
              day={activeTab}
            />
          )}
        </ScrollView>
      </Stack>
      {/* )} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TravelPlanPage;
