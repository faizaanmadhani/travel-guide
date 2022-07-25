import React from "react";
import { Box, ScrollView, HStack, Heading, Text, Spinner, Stack, Pressable } from "native-base";
import { gql, useQuery, NetworkStatus, useMutation } from "@apollo/client";
import { GET_WISHLIST } from "./WishlistView";
import PlanCardSmall from "../components/PlanCardSmall";
import PlansByCategory from "../components/explore/PlansByCategory";

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

export const UPDATE_WISHLIST = gql`
mutation updateWishlist($input : AddWishlistPlanInput!) {
    updateWishlistPlan (input : $input)
    {
      id
      name
      wishlistPlans
    }
  }  
`;

export default function ExploreView(props) {
  const [updateWishlist, { data : data1, loading : loading1, error : error1 }] = useMutation(UPDATE_WISHLIST,
    {refetchQueries: []});

if (loading1) console.log("Loading...");;
if (error1) console.log(`Error! ${error1.message}`);

  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_FILTERED_PLANS,
    {
      variables: { input: {} },
      notifyOnNetworkStatusChange: true,
    }
  );

  const [isRendering, setIsRendering] = React.useState(true);
  const [isPlansByCategory, setIsPlansByCategory] = React.useState(false);
  const [categorySelected, setCategorySelected] = React.useState(null);

  React.useEffect(() => {
    setIsRendering(false);
  }, []);

  React.useEffect(() => {
    if (props.filtersApplied) {
      refetch({
        input: props.filtersApplied,
      });
    }
  }, [props.filtersApplied]);

  if (networkStatus === NetworkStatus.refetch || loading) {
    return (
      <Box pt="6">
        <Spinner color="indigo.500" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box pt="6">
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
    {
      title: "Most Popular",
      plans: popularPlans.slice(0, 5),
      allPlans: popularPlans,
    },
    {
      title: "National Destinations",
      plans: nationalPlans.slice(0, 5),
      allPlans: nationalPlans,
    },
    {
      title: "International Destinations",
      plans: internationalPlans.slice(0, 5),
      allPlans: internationalPlans,
    },
    {
      title: "Budget Travel",
      plans: budgetPlans.slice(0, 5),
      allPlans: budgetPlans,
    },
    {
      title: "Luxury Travel",
      plans: luxuryPlans.slice(0, 5),
      allPlans: luxuryPlans,
    }
  );

  const displayPlans = (plansList) => {
    return plansList.map((plan) => {
      return <Box key={plan.id}>{PlanCardSmall(plan, updateWishlist, props.userID)}</Box>;
    });
  };

  const fetchMorePlans = (categoryTitle) => {
    setCategorySelected(categoryTitle);
    setIsPlansByCategory(true);
  };

  return (
    <Box>
      {isRendering ? (
        <Box pt="6">
          <Spinner color="indigo.500" />
        </Box>
      ) : (
        <ScrollView>
          {isPlansByCategory ? (
            <PlansByCategory
              categorySelected={categorySelected}
              popularPlans={popularPlans}
              nationalPlans={nationalPlans}
              internationalPlans={internationalPlans}
              budgetPlans={budgetPlans}
              luxuryPlans={luxuryPlans}
              setIsPlansByCategory={setIsPlansByCategory}
            />
          ) : (
            allCategories.map((category, index) =>
              category.plans.length ? (
                <Box key={index}>
                  <Stack direction="row">
                    <Heading size="sm" pt="4" pl="1">
                      {category.title}
                    </Heading>
                    {category.allPlans.length > 5 ? (
                      <Pressable onPress={() => fetchMorePlans(category.title)}>
                        <Text pt="4" pl="1" color="blue.500">
                          See more
                        </Text>
                      </Pressable>
                    ) : null}
                  </Stack>
                  <ScrollView horizontal={true} my="2">
                    <HStack>{displayPlans(category.plans)}</HStack>
                  </ScrollView>
                </Box>
              ) : null
            )
          )}
        </ScrollView>
      )}
    </Box>
  );
}
