import React from "react";
import {
  Box,
  Spinner,
  ChevronLeftIcon,
  Heading,
  VStack,
  Pressable,
  Button,
  HStack,
  Flex,
} from "native-base";
import PlanView from "../../views/PlanView";

export default function PlansByCategory(props) {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(false);
  }, []);

  const displayCategoryPlans = () => {
    let categoryPlans = [];
    if (
      props.categorySelected === "National Destinations" &&
      props.nationalPlans
    ) {
      categoryPlans = [...props.nationalPlans];
    } else if (
      props.categorySelected === "International Destinations" &&
      props.internationalPlans
    ) {
      categoryPlans = [...props.internationalPlans];
    } else if (
      props.categorySelected === "Budget Travel" &&
      props.budgetPlans
    ) {
      categoryPlans = [...props.budgetPlans];
    } else if (
      props.categorySelected === "Luxury Travel" &&
      props.luxuryPlans
    ) {
      categoryPlans = [...props.luxuryPlans];
    } else {
      if (props.popularPlans) {
        categoryPlans = [...props.popularPlans];
      }
    }

    if (categoryPlans) {
      return categoryPlans.map((plan, index) => {
        return <Box key={index}>{PlanView(plan)}</Box>;
      });
    }
  };
  return (
    <Box>
      <Flex direction="row" alignItems="center">
        <Button
          size="sm"
          mr="2"
          color="blue.500"
          variant="ghost"
          onPress={() => props.setIsPlansByCategory(false)}
        >
          <ChevronLeftIcon />
        </Button>
        <Heading size="sm" pl="1">
          {props.categorySelected}
        </Heading>
      </Flex>
      {isLoading ? (
        <Box pt="6">
          <Spinner color="indigo.500" />
        </Box>
      ) : (
        <VStack my="2">{displayCategoryPlans()}</VStack>
      )}
    </Box>
  );
}
