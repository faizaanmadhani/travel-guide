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
        title
        images
        description
        price
        externalUrl
      }
    }
  }
`;

export default function BlockPage({
  navigation,
  planID,
  day,
}: {
  navigation: any;
  planID: string;
  day: number;
}) {
  console.log("the plan ID", planID);
  const { loading, error, data, refetch } = useQuery(GET_BLOCKS, {
    variables: { id: planID, day: day },
    skip: !planID,
  });

  //   if (loading)
  //     return (
  //       <Box>
  //         <Spinner accessibilityLabel="Loading blocks" />
  //       </Box>
  //     );
  //   if (error)
  //     return (
  //       <Box>
  //         <Text>Error! ${error}</Text>
  //       </Box>
  //     );

  if (loading) return <Spinner />;

  console.log("The data and error", data, error, loading);

  return (
    <Box paddingLeft="5" paddingRight="5">
      <Button onPress={() => refetch()}>Refresh Blocks</Button>
      {data === undefined || (data && data?.plan?.blocks.length === 0) ? (
        <Pressable
          onPress={() =>
            navigation.navigate("Edit Block", {
              planID: planID,
              day: day,
            })
          }
        >
          <Center>
            <Center
              _text={{
                color: "#B0B0B0",
                fontWeight: "bold",
              }}
              height={200}
              width={{
                base: 200,
                lg: 250,
              }}
            >
              <AntDesign name="plus" size={25} color="#B0B0B0" />
              Add Block
            </Center>
          </Center>
        </Pressable>
      ) : (
        <ScrollView>
          {data?.plan?.blocks.map((obj: IBlockProps, index: number) => (
            <BlockView key={index} {...obj} />
          ))}
        </ScrollView>
      )}
    </Box>
  );
}
