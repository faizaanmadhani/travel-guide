import React from "react";
import { useContext } from "react";
import {
  useDisclose,
  Actionsheet,
  ScrollView,
  Box,
  VStack,
  Flex,
  IconButton,
  HStack,
  Badge,
  Stack,
  Text,
  Hidden,
  Button,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ExploreView from "../views/ExploreView";
import Filters from "../components/Filters";
import PageView from "../components/PageView";
import SearchWithTags from "../components/explore/SearchWithTags";
import TagsAutocomplete from "../components/explore/TagsAutocomplete";
import { UserContext } from "../../App";

export default function ExplorePage({ navigation }) {
  const { isOpen, onOpen, onClose } = useDisclose();
  const { userID, setUserID } = useContext(UserContext);
  const [filtersApplied, setFiltersApplied] = React.useState({
    countries: [],
    rating: [],
    budget: [],
    months: [],
    tags: [],
    name: "",
    limit: 10,
  });
  const [isTagsSearch, setIsTagsSearch] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [tagSearchInput, setTagSearchInput] = React.useState("");

  // React.useEffect(() => {
  //   console.log("tags filter - ", filtersApplied.tags);
  // }, [filtersApplied]);

  const removeSelectedTag = (selectedTag) => {
    const newSelectedTags = filtersApplied.tags.filter(
      (tag) => tag !== selectedTag
    );

    const newFiltersApplied = { ...filtersApplied, tags: newSelectedTags };
    setFiltersApplied(newFiltersApplied);
  };

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
            <SearchWithTags
              setIsTagsSearch={setIsTagsSearch}
              setIsLoading={setIsLoading}
              currentFilters={filtersApplied}
              refetchPlans={setFiltersApplied}
              tagSearchInput={tagSearchInput}
              setTagSearchInput={setTagSearchInput}
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
        <Box w="100%" mb="2">
          <Stack
            mb="2"
            direction="row"
            space={1}
            alignItems={{
              base: "center",
              md: "flex-start",
            }}
            flexWrap="wrap"
          >
            {filtersApplied.tags
              ? filtersApplied.tags.map((selectedTag, index) => (
                  <Button
                    key={index}
                    onPress={() => removeSelectedTag(selectedTag)}
                    colorScheme="info"
                    mb="1"
                    size="sm"
                    backgroundColor={"violet.600"}
                  >
                    {selectedTag}
                  </Button>
                ))
              : null}
          </Stack>
        </Box>
        {/* plans list */}
        <ScrollView w="100%">
          {isTagsSearch ? (
            <TagsAutocomplete
              tagSearchInput={tagSearchInput}
              filtersApplied={filtersApplied}
              setFiltersApplied={setFiltersApplied}
              setTagSearchInput={setTagSearchInput}
              setIsTagsSearch={setIsTagsSearch}
            />
          ) : (
            <ExploreView
              filtersApplied={filtersApplied}
              setIsLoading={setIsLoading}
              isTagsSearch={isTagsSearch}
              setIsTagsSearch={setIsTagsSearch}
              userID={userID}
              navigation={navigation}
            />
          )}
        </ScrollView>
      </PageView>
    </Box>
  );
}
