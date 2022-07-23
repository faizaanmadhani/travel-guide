import React from "react";
import { Input, Box, Flex, HStack, View, Container } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "native-base";
import { useDebounce } from "../../hooks/useDebounce";

// card view of travel plan, used on home page etc.
export default function SearchWithTags(props) {
  const [search, setSearch] = React.useState({
    term: "",
    fetchPredictions: false,
  });

  const ltrim = (str) => {
    if (!str) return str;
    return str.replace(/^\s+/g, "");
  };

  const onChangeText = () => {
    if (search.term.trim() === "" || !search.fetchPredictions) {
      props.setIsTagsSearch(false);

      if (props.currentFilters.name !== "") {
        const newFiltersApplied = { ...props.currentFilters, name: "" };
        props.refetchPlans(newFiltersApplied);
      }
      return;
    }

    if (search.term.trim().startsWith("#")) {
      props.setIsTagsSearch(true);
      const tag = search.term.trim().substring(1);
      props.setTagSearchInput(tag);

      if (props.currentFilters.name !== "") {
        const newFiltersApplied = { ...props.currentFilters, name: "" };
        props.refetchPlans(newFiltersApplied);
      }
    } else {
      props.setIsTagsSearch(false);
      const name = ltrim(search.term);
      const newFiltersApplied = { ...props.currentFilters, name: name };
      props.refetchPlans(newFiltersApplied);
    }

    setSearch({ term: search.term, fetchPredictions: false });
  };

  useDebounce(onChangeText, 500, [search.term]);

  return (
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
      placeholder="Search Plans"
      onChangeText={(text) => setSearch({ term: text, fetchPredictions: true })}
      value={search.term}
    />
  );
}
