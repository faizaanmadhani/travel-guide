import React from "react";
import { useWindowDimensions } from "react-native";
import {
  NativeBaseProvider,
  Box,
  Heading,
  Center,
  Input,
  VStack,
  Actionsheet,
  Button,
  useDisclose,
  ScrollView,
  HStack,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import PlanView from "../components/plan-view";
import Filters from "../components/Filters";

export default function ExplorePage() {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <NativeBaseProvider>
      <Center>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Filters />
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
      <SafeAreaView style={{ flex: 1 }}>
        <VStack width={"90%"} alignSelf={"center"}>
          <HStack>
            <Input
              placeholder="Search"
              variant="filled"
              borderRadius="10"
              py="1"
              px="2"
              borderWidth="0"
              w="100%"
            />
            <MaterialCommunityIcons
              name="filter-outline"
              size={24}
              color="grey"
              mt="4px"
              onPress={onOpen}
            />
          </HStack>
          <Heading size={"xl"}>Recommended for You</Heading>

          <ScrollView
            horizontal={true}
            minH={"210"}
            _contentContainerStyle={{ p: "2px" }}
          >
            <Box maxW={useWindowDimensions().width}>{PlanView(0)}</Box>
            <Box maxW={useWindowDimensions().width}>{PlanView(1)}</Box>
            <Box maxW={useWindowDimensions().width}>{PlanView(2)}</Box>
          </ScrollView>
        </VStack>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
