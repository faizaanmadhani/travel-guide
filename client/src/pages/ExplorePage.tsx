import React from "react";
import {
  Box,
  Heading,
  Center,
  Input,
  VStack,
  Actionsheet,
  useDisclose,
  ScrollView,
  HStack,
  Icon,
  IconButton,
  Flex,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import PlanView from "../components/PlanView";
import Filters from "../components/Filters";

export default function ExplorePage() {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <Box>
      <Center>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Filters />
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
      <SafeAreaView>
        <VStack w="90%" alignSelf="center">
          <Flex direction="row" mb="2">
            <Input
              InputLeftElement={
                <Icon
                  as={
                    <Ionicons
                      name="search-outline"
                      color="gray"
                      style={{ marginLeft: 12 }}
                    />
                  }
                />
              }
              flexGrow={1}
              size="lg"
              placeholder="Search by name or #tag"
            />
            <VStack alignSelf="center" ml="1">
              <IconButton
                variant="ghost"
                onPress={onOpen}
                icon={
                  <MaterialCommunityIcons
                    name="filter-outline"
                    size={24}
                    color="gray"
                  />
                }
              />
            </VStack>
          </Flex>

          <ScrollView _contentContainerStyle={{ paddingBottom: 160 }}>
            <Heading size="sm" mt="6">
              Most Popular
            </Heading>

            <ScrollView horizontal={true} my="2">
              {/* <Box maxW={useWindowDimensions().width}>{PlanView(0)}</Box>
              <Box maxW={useWindowDimensions().width}>{PlanView(1)}</Box>
              <Box maxW={useWindowDimensions().width}>{PlanView(2)}</Box> */}
            </ScrollView>

            <Heading size="sm" mt="6">
              National Destinations
            </Heading>

            <ScrollView horizontal={true} my="2">
              {/* <Box maxW={useWindowDimensions().width}>{PlanView(0)}</Box>
              <Box maxW={useWindowDimensions().width}>{PlanView(1)}</Box>
              <Box maxW={useWindowDimensions().width}>{PlanView(2)}</Box> */}
            </ScrollView>

            <Heading size="sm" mt="6">
              International Destinations
            </Heading>

            <ScrollView horizontal={true} my="2">
              {/* <Box maxW={useWindowDimensions().width}>{PlanView(0)}</Box>
              <Box maxW={useWindowDimensions().width}>{PlanView(1)}</Box>
              <Box maxW={useWindowDimensions().width}>{PlanView(2)}</Box> */}
            </ScrollView>

            <Heading size="sm" mt="6">
              Budget Travel
            </Heading>

            <ScrollView horizontal={true} my="2">
              {/* <Box maxW={useWindowDimensions().width}>{PlanView(0)}</Box>
              <Box maxW={useWindowDimensions().width}>{PlanView(1)}</Box>
              <Box maxW={useWindowDimensions().width}>{PlanView(2)}</Box> */}
            </ScrollView>

            <Heading size="sm" mt="6">
              Luxury Travel
            </Heading>

            <ScrollView horizontal={true} my="2">
              {/* <Box maxW={useWindowDimensions().width}>{PlanView(0)}</Box>
              <Box maxW={useWindowDimensions().width}>{PlanView(1)}</Box>
              <Box maxW={useWindowDimensions().width}>{PlanView(2)}</Box> */}
            </ScrollView>
          </ScrollView>
        </VStack>
      </SafeAreaView>
    </Box>
  );
}
