import React from "react";
import { useWindowDimensions } from "react-native";
import {
  Box,
  useDisclose,
  Text,
  Center,
  Actionsheet,
  VStack,
  Flex,
  IconButton,
  Input,
  Icon,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import { gql, useQuery, NetworkStatus } from "@apollo/client";

export default function SearchAndFilter(props) {
  return (
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
          onPress={props.onOpen}
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
  );
}