import React from "react";
import { useContext } from "react";
import { Button, Box, ScrollView, Center, Text} from "native-base";
import { useWindowDimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

// For testing purposes
// import TravelPlanPage from "./PlanMain";
import PageView from "../components/PageView";
import { PlanView_Data } from "../components/PlanCardSmall";
import PlanCardSmall from "../components/PlanCardSmall";
import PlanView from "../components/PlanView";
import { SafeAreaView } from "react-native-safe-area-context";
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { UserContext } from "../../App";

const sampleData : PlanView_Data =
  {id: "62b6695b10238262886c56c6",
    name: "Travel with us",
    budget: 1,
    rating: 5,
    tags: ["happy", "hiking", "outdoors"],
    description: "have fun with us",
    countries: ["Canada"],
    months: ["January"]};

export const GET_WISHLIST = gql`
  query getWishlistPlans ($id : String!) {
    getWishlistPlans (id: $id) {
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

export default function WishlistView(userID : String) {
    useFocusEffect(
        React.useCallback(() => {refetch()}, [])
    );

    const [updateWishlist, { data : data1, loading : loading1, error : error1 }] = useMutation(UPDATE_WISHLIST,
        {refetchQueries: [{query: GET_WISHLIST}], onCompleted: () => refetch()});

    if (loading1) console.log("Loading...");;
    if (error1) console.log(`Error! ${error1.message}`);

    const { data, error, loading, refetch } =  useQuery(GET_WISHLIST, {
      variables : {id : userID},
      onCompleted: (resultData) => {
        console.log("The result data", resultData.getWishlistPlans[0]);
    },
    fetchPolicy : 'network-only'
  });

  if (loading)
    {
        console.log(`Loading`);
        return <Text>Loading ...</Text> ;
    }

    if (error)
    {
        console.log(`Error! ${error.message}`);
        return <Text>{`Error! ${error.message}`}</Text>;
    };

    const plans = data.getWishlistPlans;
    let planViews = []
    for (let i = 0; plans[i] != undefined; i++)
    {
        planViews.push(<Box key={i}>{PlanCardSmall(plans[i], updateWishlist, userID)}</Box>)
    }
    // planViews.push(<Box key={100}>{PlanCardWishlist(sampleData, updateWishlist, userID)}</Box>)

  return(
        <Box> {planViews} </Box>
    );
}
