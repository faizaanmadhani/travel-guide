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
import ExplorePlans from "../components/explore/ExplorePlans";
import Filters from "../components/Filters";
import { gql, useQuery, NetworkStatus } from "@apollo/client";

export const GET_FILTERED_PLANS = gql`
  query getFilteredPlans($input: FilterInput!) {
    filteredPlans(input: $input) {
      id
      name
      budget
      rating
      tags
      description
      countries
      months
      assetLinks
    }
  }
`;

export default function ExplorePage() {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [filtersApplied, setFiltersApplied] = React.useState(null);

  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_FILTERED_PLANS,
    {
      variables: { input: {} },
      notifyOnNetworkStatusChange: true,
    }
  );

  if (networkStatus === NetworkStatus.refetch) {
    return <Text>Refetching</Text>;
  }
  if (loading) {
    return <Text>Loading</Text>;
  }
  if (error) {
    return <Text>Error! ${error}</Text>;
  }

  const refetchPlans = (filtersSelected) => {
    setFiltersApplied(filtersSelected);
    refetch({
      input: filtersSelected,
    });
  };

  return (
    <Box>
      <Center>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Filters
              refetchPlans={refetchPlans}
              closeFilters={onClose}
              currentFilters={filtersApplied}
            />
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
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
      </VStack>
      <ExplorePlans data={data} />
    </Box>
  );
}
