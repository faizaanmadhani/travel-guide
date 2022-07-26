import React from "react";
import { Box, Text } from "native-base";
import { useFocusEffect } from "@react-navigation/native";

// For testing purposes
import PlanCardSmall from "../components/PlanCardSmall";
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";

export const GET_WISHLIST = gql`
  query getWishlistPlans($id: String!) {
    getWishlistPlans(id: $id) {
      id
      name
      budget
      rating
      tags
      description
      countries
      months
    }
  }
`;

export default function WishlistView(userID: String) {
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );

  const { data, error, loading, refetch } = useQuery(GET_WISHLIST, {
    variables: { id: userID },
    onCompleted: (resultData) => {
      console.log("The result data", resultData.getWishlistPlans[0]);
    },
    fetchPolicy: "network-only",
  });

  if (loading) {
    console.log(`Loading`);
    return <Text>Loading ...</Text>;
  }

  if (error) {
    console.log(`Error! ${error.message}`);
    return <Text>{`Error! ${error.message}`}</Text>;
  }

  const plans = data.getWishlistPlans;
  let planViews = [];
  for (let i = 0; plans[i] != undefined; i++) {
    planViews.push(
      <Box key={i}>
        <PlanCardSmall plan={plans[i]} userID={userID} size={"lg"} />
      </Box>
    );
  }

  return <Box> {planViews} </Box>;
}
