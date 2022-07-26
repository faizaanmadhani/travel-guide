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
} from "native-base";
import { StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";

const GET_PLAN = gql`
  query GetPlan($id: String!) {
    plan(id: $id) {
      name
      id
      rating
      description
      blocks {
        id
        title
      }
    }
  }
`;

const TravelPlanPage = ({ route, navigation }) => {
  // const { planID } = route.params;
  console.log("plan detail - ", route);

  const [activeTab, setActiveTab] = useState<number>(0);

  const [daysLabels, setDaysLabels] = useState(["Intro", "Day 1", "Day 2"]);

  //   const { data, loading, error } = useQuery(GET_PLAN, {
  //     variables: {
  //       id: planID,
  //     },
  //   });

  //   console.log("The data object", data);

  return (
    <ScrollView>
      {/* {data && ( */}
      <Stack space={3}>
        <Stack marginLeft={"4"} marginRight={"4"} space={3}>
          <Text fontSize="2xl" bold>
            Name of Travel Plan
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
                <Text bold>Rating: 4/5</Text>
                <Text bold>Last Updated: May 13th, 2021</Text>
              </HStack>
              <Text>Description</Text>
            </Stack>
          ) : null}
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
