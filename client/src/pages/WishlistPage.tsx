import React from "react";
import { Button, Box, ScrollView, Center} from "native-base";
import { useWindowDimensions } from "react-native";

// For testing purposes
// import TravelPlanPage from "./PlanMain";
import PageView from "../components/PageView";
import PlanCardSmall from "../components/PlanCardSmall";
import { PlanView_Data } from "../components/PlanCardSmall";
import PlanCardWishlist from "../components/PlanCardWishlist";
import PlanView from "../components/PlanView";
import { SafeAreaView } from "react-native-safe-area-context";

const sampleData : PlanView_Data =
  {id: "",
    name: "Travel with us",
    budget: 1,
    rating: 5,
    tags: ["happy", "hiking", "outdoors"],
    description: "have fun with us",
    countries: ["Canada"],
    months: ["January"]};

export default function WishlistPage({ navigation }: { navigation: any }) {
  return(
      <Center>
      <ScrollView>
      <Box>
        {PlanCardWishlist(sampleData)}
      </Box>
      <Box>
        {PlanCardWishlist(sampleData)}
      </Box>
      <Box>
        {PlanCardWishlist(sampleData)}
      </Box>
      <Box>
        {PlanCardWishlist(sampleData)}
      </Box>
      <Box>
        {PlanCardWishlist(sampleData)}
      </Box>
      <Box>
        {PlanCardWishlist(sampleData)}
      </Box>
      </ScrollView>
      </Center>
    
  );
}
