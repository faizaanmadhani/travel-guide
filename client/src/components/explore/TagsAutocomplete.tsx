import React from "react";
import { Box, Text, Spinner, Button } from "native-base";
import { gql, useQuery, NetworkStatus } from "@apollo/client";

export const GET_FILTERED_TAGS = gql`
  query getFilteredTags($input: TagInput!) {
    filteredTags(input: $input) {
      name
    }
  }
`;

export default function TagsAutocomplete(props) {
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_FILTERED_TAGS,
    {
      variables: {
        input: { keywords: props.tagSearchInput },
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  React.useEffect(() => {
    refetch({ input: { keywords: props.tagSearchInput } });
  }, [props.tagSearchInput]);

  if (networkStatus === NetworkStatus.refetch || loading) {
    return (
      <Box pt="6">
        <Spinner color="indigo.500" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box pt="6">
        <Text color="red.800">Error! {error}</Text>
      </Box>
    );
  }

  const selectTag = (tagName) => {
    const newTagsSelected = [...props.filtersApplied.tags, tagName];
    const newFiltersSelected = {
      ...props.filtersApplied,
      tags: newTagsSelected,
    };
    props.setFiltersApplied(newFiltersSelected);
    props.setTagSearchInput("");
    props.setIsTagsSearch(false);
  };

  return (
    <Box>
      {data.filteredTags.map((tag, index) => (
        <Button key={index} onPress={() => selectTag(tag.name)}>
          <Text>#{tag.name}</Text>
        </Button>
      ))}
    </Box>
  );
}
