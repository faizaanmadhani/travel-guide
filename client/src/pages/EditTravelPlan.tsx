import React, { useState } from "react";
import {
  Input,
  Box,
  Stack,
  FormControl,
  ScrollView,
  Text,
  Divider,
  WarningOutlineIcon,
  TextArea,
  Button,
} from "native-base";
import StyledTagInput from "../components/taginput";
import { gql, useMutation } from "@apollo/client";

const CREATE_PLAN = gql`
  mutation CreatePlan {
    addPlan(
      input: {
        name: "Climb the Arindoracks"
        creatorId: "629ad1210c267cfbc50d0440"
        rating: 4
        budget: 2
        tags: ["adrenaline_rush", "exciting", "high", "so_cool", "wow"]
        description: "Climb the highest peaks of the Arindoracks in this guided adventure!"
      }
    ) {
      name
      creator {
        id
        name
      }
      rating
      budget
      tags
      description
    }
  }
`;

export default function EditTravelPlan() {
  const [tags, setTags] = useState({
    tag: "",
    tagsArray: [],
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = () => {};

  return (
    <ScrollView w="100%">
      <Stack
        space={2.5}
        alignSelf="center"
        px="4"
        safeArea
        w={{
          base: "100%",
          md: "25%",
        }}
      >
        <Box>
          <FormControl mb="1" isRequired>
            <FormControl.Label>Title</FormControl.Label>
            <Input value={title} onChangeText={(text) => setTitle(text)} />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              This field is required
            </FormControl.ErrorMessage>
          </FormControl>
        </Box>
        <Box>
          <FormControl mb="1"></FormControl>
        </Box>
        <FormControl mb="1" isRequired>
          <FormControl.Label>Description</FormControl.Label>
          <TextArea
            h={20}
            placeholder="Add Plan Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
            autoCompleteType={undefined}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            This field is required
          </FormControl.ErrorMessage>
        </FormControl>
        <Box>
          <FormControl mb="1">
            <FormControl.Label>Tags</FormControl.Label>
            <StyledTagInput tags={tags} setTags={setTags} />
          </FormControl>
        </Box>
        <Box>
          <Button onPress={onSubmit} mt="5" colorScheme="#06B6D4">
            Done
          </Button>
        </Box>
      </Stack>
    </ScrollView>
  );
}
