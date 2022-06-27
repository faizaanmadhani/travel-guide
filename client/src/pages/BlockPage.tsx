import React, { useState } from "react";
import { Stack, Center, Box } from "native-base";
import { Dimensions, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function BlockPage({
  navigation,
  blocks,
}: {
  navigation: any;
  blocks: any;
}) {
  return (
    <Box>
      {blocks.length == 0 ? (
        <Pressable onPress={() => navigation.navigate("Select Images")}>
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
        <Stack></Stack>
      )}
    </Box>
  );
}
