import React from "react";
import { useContext } from "react";
import { Button, Box, ScrollView, Center} from "native-base";
import { useWindowDimensions } from "react-native";

// For testing purposes
// import TravelPlanPage from "./PlanMain";
import PageView from "../components/PageView";
import PlanCardSmall from "../components/PlanCardSmall";
// import { PlanView_Data } from "../components/PlanCardSmall";
// import PlanCardWishlist from "../components/PlanCardWishlist";
import PlanView from "../components/PlanView";
import { SafeAreaView } from "react-native-safe-area-context";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { UserContext } from "../../App";
import WishlistView from "../views/WishlistView";

export default function WishlistPage({ navigation }: { navigation: any }) {
  const { userID, setUserID } = useContext(UserContext);

  return(
    
      <Center>
        <ScrollView>
        {WishlistView(userID)}
        </ScrollView>
      </Center>  
  );
}
