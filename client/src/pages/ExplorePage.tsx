import React from "react";
import {
  useDisclose,
  Actionsheet,
  ScrollView,
  Box,
  VStack,
  Flex,
  IconButton,
  Input,
  Icon,
  Text,
} from "native-base";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import ExploreView from "../views/ExploreView";
import Filters from "../components/Filters";
import PageView from "../components/PageView";

export default function ExplorePage() {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [filtersApplied, setFiltersApplied] = React.useState(null);

  return (
    <Box>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Filters
            closeFilters={onClose}
            currentFilters={filtersApplied}
            refetchPlans={setFiltersApplied}
          />
        </Actionsheet.Content>
      </Actionsheet>
      <PageView>
        <Box w="100%" mb="2">
          <Flex direction="row">
            {/* search bar */}
            <Input
              InputLeftElement={
                <Icon
                  as={
                    <Ionicons
                      name="search-outline"
                      color="gray"
                      style={{ marginLeft: 12 }}
                    />
                  }
                />
              }
              flexGrow={1}
              size="lg"
              placeholder="Search"
            />
            {/* filter icon */}
            <VStack alignSelf="center" ml="1">
              <IconButton
                variant="ghost"
                onPress={onOpen}
                icon={
                  <MaterialCommunityIcons
                    name="filter-outline"
                    size={24}
                    color="gray"
                  />
                }
              />
            </VStack>
          </Flex>
        </Box>
        {/* plans list */}
        <ScrollView w="100%">
          <ExploreView filtersApplied={filtersApplied} />
        </ScrollView>
      </PageView>
    </Box>
  );
}
