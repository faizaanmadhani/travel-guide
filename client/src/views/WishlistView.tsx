import React from "react";
import { useContext } from "react";
import { Button, Box, ScrollView, Center, Text} from "native-base";
import { useWindowDimensions } from "react-native";

// For testing purposes
// import TravelPlanPage from "./PlanMain";
import PageView from "../components/PageView";
import PlanCardSmall from "../components/PlanCardSmall";
import { PlanView_Data } from "../components/PlanCardSmall";
import PlanCardWishlist from "../components/PlanCardWishlist";
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

const GET_WISHLIST = gql`
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

export const ADD_WISHLIST = gql`
mutation addWishlist($input : AddWishlistPlanInput!) {
    addWishlistPlan (input : $input)
    {
      id
      name
      wishlistPlans
    }
  }  
`;

export const REMOVE_WISHLIST = gql`
mutation removeWishlist($input : AddWishlistPlanInput!) {
    removeWishlistPlan (input : $input)
    {
      id
      name
      wishlistPlans
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
    const [updateWishlist, { data : data1, loading : loading1, error : error1 }] = useMutation(UPDATE_WISHLIST,
        {refetchQueries: [{query: GET_WISHLIST}], onCompleted: () => refetch()});

    if (loading1) console.log("Loading...");;
    if (error1) console.log(`Error! ${error1.message}`);

    // const [removeWishlist, { data:data2, loading:loading2, error:error2 }] = useMutation(REMOVE_WISHLIST,
    //     {refetchQueries: [], ignoreResults: true});

    // if (loading2) console.log("Loading...");;
    // if (error2) console.log(`Error! ${error2.message}`);

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
        return <Text>"Loading ..."</Text> ;
    }

    if (error)
    {
        console.log(`Error! ${error.message}`);
        return <Text>{`Error! ${error.message}`}</Text>;
    };

//   function displayPlans(plansList) {
//     console.log("DISPLAY", plansList)
//     if (plansList != undefined)
//     {
//       return plansList.map((plan) => {
//         return <Box key={plan.id}>{PlanCardWishlist(plan)}</Box>;
//       });
//     }

//   };
    const plans = data.getWishlistPlans;
    let planViews = []
    for (let i = 0; plans[i] != undefined; i++)
    {
        planViews.push(<Box key={i}>{PlanCardWishlist(plans[i], updateWishlist, userID)}</Box>)
    }
    planViews.push(<Box key={100}>{PlanCardWishlist(sampleData, updateWishlist, userID)}</Box>)

  return(
        <Box> {planViews} </Box>
    );
}
