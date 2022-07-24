import React from "react";
import { Box, Spinner, Button, Heading, VStack } from "native-base";
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
      <Button onPress={() => props.setIsPlansByCategory(false)}>Go Back</Button>
      <Heading size="sm" pt="4" pl="1">
        {props.categorySelected}
      </Heading>
      {isLoading ? (
        <Box pt="6">
          <Spinner color="indigo.500" />
        </Box>
      ) : (
        <VStack>{displayCategoryPlans()}</VStack>
      )}
    </Box>
  );
}
