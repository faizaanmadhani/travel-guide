import React from "react";
import { Button, Box, ScrollView, HStack, Stack } from "native-base";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import PlanCardSmall from "../PlanCardSmall";

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
  const [popularPlans, setPopularPlans] = React.useState([]);
  const [nationalPlans, setNationalPlans] = React.useState([]);
  const [internationalPlans, setInternationalPlans] = React.useState([]);
  const [budgetPlans, setBudgetPlans] = React.useState([]);
  if (networkStatus === NetworkStatus.refetch) return "Refetching!";
  if (loading) return "Loading...";
  if (error) return `Error! ${error}`;

  const listPlans = () => {
    return data.filteredPlans.map((plan) => {
      return (
        <Box key={plan.id} mr="1">
          {PlanCardSmall(plan)}
        </Box>
      );
    });
  };

  const refetchPlans = () => {
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
    <Box>
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
      <ScrollView horizontal={true}>
        <HStack>{listPlans()}</HStack>
      </ScrollView>
    </Box>
  );
}
