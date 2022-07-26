import React, { useState } from "react";
import { Stack, Center, Box, Spinner, Text, Button } from "native-base";
import { Dimensions, Pressable, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { gql, useQuery } from "@apollo/client";
import BlockView, { IBlockProps } from "../components/BlockView";
import { useFocusEffect } from "@react-navigation/native";

const GET_BLOCKS = gql`
  query ($id: String!, $day: Int!) {
    plan(id: $id) {
      blocks(day: $day) {
        id
        title
        imageUrl
        description
        price
        imageUrl
        lat
        long
      }
    }
  }
`;

export default function DayView({
  navigation,
  planID,
  day,
}: {
  navigation: any;
  planID: String;
  day: number;
}) {
  console.log("the plan ID", planID);
  const { loading, error, data, refetch } = useQuery(GET_BLOCKS, {
    variables: { id: planID, day: day },
    skip: !planID,
  });

  if (loading) return <Spinner />;

  console.log("ID - ", planID);
  console.log("DAY - ", day);
  console.log("*** The data and error", data, error, loading);

  return (
    <Box paddingLeft="5" paddingRight="5">
      <Button onPress={() => refetch()}>Refresh Blocks</Button>
      <ScrollView>
        {data?.plan?.blocks.map((obj: IBlockProps, index: number) => (
          <BlockView key={index} {...obj} />
        ))}
      </ScrollView>
    </Box>
  );
}
