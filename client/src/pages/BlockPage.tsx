import React, { useState } from "react";
import { Stack, Center, Box, Spinner, Text } from "native-base";
import { Dimensions, Pressable, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { gql, useQuery } from "@apollo/client";
import BlockView, { IBlockProps } from "../components/BlockView";

const GET_BLOCKS = gql`
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

export default function BlockPage({
  navigation,
  planID,
}: {
  navigation: any;
  planID: string;
}) {
  const { loading, error, data } = useQuery(GET_BLOCKS, {
    variables: { id: planID },
    skip: !planID,
  });

  if (loading) return <Spinner accessibilityLabel="Loading blocks" />;
  if (error) return <Text>Error! ${error}</Text>;

  return (
    <Box>
      {!data || data?.blocks.length == 0 ? (
        <Pressable onPress={() => navigation.navigate("Edit Block")}>
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
          {data?.blocks.map((obj: IBlockProps, index: number) => (
            <BlockView props={obj} key={index} />
          ))}
        </ScrollView>
      )}
    </Box>
  );
}
