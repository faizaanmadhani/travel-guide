import React from "react";
import { Box, useDisclose, Center, Actionsheet, VStack } from "native-base";
import ExplorePlans from "../components/explore/ExplorePlans";
import Filters from "../components/Filters";
import SearchAndFilter from "../components/explore/SearchAndFilter";

export default function ExplorePage() {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [filtersApplied, setFiltersApplied] = React.useState(null);

  return (
    <Box>
      <Center>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Filters
              closeFilters={onClose}
              currentFilters={filtersApplied}
              refetchPlans={setFiltersApplied}
            />
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
      <VStack w="90%" alignSelf="center">
        <SearchAndFilter onOpen={onOpen} />
      </VStack>
      <ExplorePlans
        // data={data}
        filtersApplied={filtersApplied}
      />
    </Box>
  );
}
