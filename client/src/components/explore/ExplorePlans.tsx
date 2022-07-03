import React from "react";
import {
  Button,
  Box,
  ScrollView,
  HStack,
  Heading,
  Center,
  Input,
  VStack,
  Actionsheet,
  useDisclose,
  Icon,
  IconButton,
  Flex,
} from "native-base";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import PlanCardSmall from "../PlanCardSmall";
import Filters from "../Filters";

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

const CURRENT_LOCATION = "Canada";

// card view of travel plan, used on home page etc.
export default function ExplorePlans() {
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_FILTERED_PLANS,
    {
      variables: { input: {} },
      notifyOnNetworkStatusChange: true,
    }
  );

  const { isOpen, onOpen, onClose } = useDisclose();

  if (networkStatus === NetworkStatus.refetch) return "Refetching!";
  if (loading) return "Loading...";
  if (error) return `Error! ${error}`;

  const popularPlans = data.filteredPlans.filter((plan) => plan.rating >= 4);
  const nationalPlans = data.filteredPlans.filter((plan) =>
    plan.countries.includes(CURRENT_LOCATION)
  );
  const internationalPlans = data.filteredPlans.filter(
    (plan) => !plan.countries.includes(CURRENT_LOCATION)
  );
  const budgetPlans = data.filteredPlans.filter((plan) => plan.budget === 1);
  const luxuryPlans = data.filteredPlans.filter((plan) => plan.budget >= 4);

  const displayPlans = (plansList) => {
    return plansList.map((plan) => {
      return (
        <Box key={plan.id} mr="1">
          {PlanCardSmall(plan)}
        </Box>
      );
    });
  };

  const refetchPlans = (countries, ratings, budgets, months) => {
    refetch({
      input: {
        countries: ["Canada"],
        rating: 5,
        budget: 2,
        months: ["Feb"],
      },
    }).then((data) => {
      console.log("data refetch - ", data);
    });
  };

  return (
    <Box mb="200">
      <Button
        onPress={() => {
          console.log("refetching...");
          refetch({
            input: {
              countries: ["South Korea"],
            },
          });
        }}
      >
        Refetch
      </Button>
      <Box>
        <Center>
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
              <Filters />
            </Actionsheet.Content>
          </Actionsheet>
        </Center>
        {/* <SafeAreaView> */}
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
            {popularPlans.length ? (
              <Box>
                <Heading size="sm" mt="6">
                  Most Popular
                </Heading>
                <ScrollView horizontal={true} my="2">
                  <HStack>{displayPlans(popularPlans)}</HStack>
                </ScrollView>
              </Box>
            ) : null}

            {nationalPlans.length ? (
              <Box>
                <Heading size="sm" mt="6">
                  National Destinations
                </Heading>

                <ScrollView horizontal={true} my="2">
                  <HStack>{displayPlans(nationalPlans)}</HStack>
                </ScrollView>
              </Box>
            ) : null}

            {internationalPlans.length ? (
              <Box>
                <Heading size="sm" mt="6">
                  International Destinations
                </Heading>

                <ScrollView horizontal={true} my="2">
                  <HStack>{displayPlans(internationalPlans)}</HStack>
                </ScrollView>
              </Box>
            ) : null}

            {budgetPlans.length ? (
              <Box>
                <Heading size="sm" mt="6">
                  Budget Travel
                </Heading>

                <ScrollView horizontal={true} my="2">
                  <HStack>{displayPlans(budgetPlans)}</HStack>
                </ScrollView>
              </Box>
            ) : null}

            {luxuryPlans.length ? (
              <Box>
                <Heading size="sm" mt="6">
                  Luxury Travel
                </Heading>

                <ScrollView horizontal={true} my="2">
                  <HStack>{displayPlans(luxuryPlans)}</HStack>
                </ScrollView>
              </Box>
            ) : null}
          </ScrollView>
        </VStack>
        {/* </SafeAreaView> */}
      </Box>
    </Box>
  );
}
