import React from "react";
import { Box, ScrollView, HStack, Heading, VStack, Text } from "native-base";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import PlanCardSmall from "../components/PlanCardSmall";

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

export default function ExploreView(props) {
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_FILTERED_PLANS,
    {
      variables: { input: {} },
      notifyOnNetworkStatusChange: true,
    }
  );

  React.useEffect(() => {
    if (props.filtersApplied) {
      refetch({
        input: props.filtersApplied,
      });
    }
  }, [props.filtersApplied]);

  if (networkStatus === NetworkStatus.refetch) {
    return <Text>Loading</Text>;
  }
  if (loading) {
    return <Text>Loading</Text>;
  }
  if (error) {
    return <Text>Error! ${error}</Text>;
  }

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
      return <Box key={plan.id}>{PlanCardSmall(plan)}</Box>;
    });
  };

  return (
    <VStack w="100%" alignSelf="center">
      <ScrollView>
        {popularPlans.length ? (
          <Box>
            <Heading size="sm" pt="6">
              Most Popular
            </Heading>
            <ScrollView horizontal={true} my="2">
              <HStack>{displayPlans(popularPlans)}</HStack>
            </ScrollView>
          </Box>
        ) : null}

        {nationalPlans.length ? (
          <Box>
            <Heading size="sm" pt="6">
              National Destinations
            </Heading>

            <ScrollView horizontal={true} my="2">
              <HStack>{displayPlans(nationalPlans)}</HStack>
            </ScrollView>
          </Box>
        ) : null}

        {internationalPlans.length ? (
          <Box>
            <Heading size="sm" pt="6">
              International Destinations
            </Heading>

            <ScrollView horizontal={true} my="2">
              <HStack>{displayPlans(internationalPlans)}</HStack>
            </ScrollView>
          </Box>
        ) : null}

        {budgetPlans.length ? (
          <Box>
            <Heading size="sm" pt="6">
              Budget Travel
            </Heading>

            <ScrollView horizontal={true} my="2">
              <HStack>{displayPlans(budgetPlans)}</HStack>
            </ScrollView>
          </Box>
        ) : null}

        {luxuryPlans.length ? (
          <Box>
            <Heading size="sm" pt="6">
              Luxury Travel
            </Heading>

            <ScrollView horizontal={true} py="2">
              <HStack>{displayPlans(luxuryPlans)}</HStack>
            </ScrollView>
          </Box>
        ) : null}
      </ScrollView>
    </VStack>
    // </Box>
    // </Box>
  );
}
