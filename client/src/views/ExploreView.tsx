import React from "react";
import { Box, ScrollView, HStack, Heading, Text, Spinner } from "native-base";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import PlanCardSmall from "../components/PlanCardSmall";

const CURRENT_LOCATION = "Canada";

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

  if (networkStatus === NetworkStatus.refetch || loading) {
    return (
      <Box pt="4">
        <Spinner color="indigo.500" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box pt="4">
        <Text color="red.800">Error! {error}</Text>
      </Box>
    );
  }

  let allCategories = [];
  const filteredPlans = data.filteredPlans;

  const popularPlans = filteredPlans.filter((plan) => plan.rating >= 4);
  const nationalPlans = filteredPlans.filter((plan) =>
    plan.countries.includes(CURRENT_LOCATION)
  );
  const internationalPlans = filteredPlans.filter(
    (plan) => !plan.countries.includes(CURRENT_LOCATION)
  );
  const budgetPlans = filteredPlans.filter((plan) => plan.budget === 1);
  const luxuryPlans = filteredPlans.filter((plan) => plan.budget >= 4);

  allCategories.push(
    { title: "Most Popular", plans: popularPlans },
    { title: "National Destinations", plans: nationalPlans },
    { title: "International Destinations", plans: internationalPlans },
    { title: "Budget Travel", plans: budgetPlans },
    { title: "Luxury Travel", plans: luxuryPlans }
  );

  const displayPlans = (plansList) => {
    return plansList.map((plan) => {
      return <Box key={plan.id}>{PlanCardSmall(plan)}</Box>;
    });
  };

  return (
    <Box>
      <ScrollView>
        {allCategories.map((category) =>
          category.plans.length ? (
            <Box>
              <Heading size="sm" pt="4" pl="1">
                {category.title}
              </Heading>
              <ScrollView horizontal={true} my="2">
                <HStack>{displayPlans(category.plans)}</HStack>
              </ScrollView>
            </Box>
          ) : null
        )}
      </ScrollView>
    </Box>
  );
}
