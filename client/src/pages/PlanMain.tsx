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
// refer to BlockPage.tsx
const GET_PLAN = gql`
  query GetPlan($id: String!, $day: Int!) {
    plan(id: $id) {
      name
      id
      rating
      description
      imageUrl
      dayLabels
      blocks(day: $day) {
        id
        title
        imageUrl
      }
    }
  }
`;
const TravelPlanPage = ({ route, navigation }) => {
  const { planId } = route.params;
  console.log("plan detail - ", route.params.planId);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [daysLabels, setDaysLabels] = useState(["Intro"]);
  // const { planID } = route;
  console.log("planId - ", planId);
  const { data, loading, error } = useQuery(GET_PLAN, {
    variables: {
      id: planId,
      day: 0,
    },
  });
  if (loading) {
    return (
      <Box pt="6">
        <Spinner color="indigo.500" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box pt="6">
        <Text color="red.800">Error! {error}</Text>
      </Box>
    );
  }
  console.log("The data object", data);
  const { name, description, rating, imageUrl } = data.plan;
  return (
    <ScrollView>
      {/* {data && ( */}
      <Stack space={3}>
        <Stack marginLeft={"4"} marginRight={"4"} space={3}>
          <Text fontSize="2xl" bold>
            {name}
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
                    uri: imageUrl,
                  }}
                  alt="Alternate Text"
                  size="2xl"
                  width="100%"
                />
              </Center>
              <HStack justifyContent="space-between">
                <Text bold>Rating: {rating}/5</Text>
                <Text bold>Last Updated: May 13th, 2021</Text>
              </HStack>
              <Text>{description}</Text>
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

export default TravelPlanPage;
