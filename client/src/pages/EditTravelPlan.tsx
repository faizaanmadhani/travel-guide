import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
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
  HStack,
  IconButton,
  Center,
} from "native-base";
import { Dimensions, Pressable } from "react-native";
import StyledTagInput from "../components/taginput";
import { gql, useMutation } from "@apollo/client";
import { AntDesign } from "@expo/vector-icons";
import BlockPage from "./BlockPage";

const CREATE_PLAN = gql`
  mutation CreatePlan($input: CreatePlanInput) {
    addPlan(input: $input) {
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

const TravelPlanForm = ({ navigation }: { navigation: any }) => {
  console.log("The navigator", navigation);
  const [addPlan, { data, loading, error }] = useMutation(CREATE_PLAN);
  const [tags, setTags] = useState({
    tag: "",
    tagsArray: [],
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = () => {
    // Upload images to Google Cloud Bucket first

    addPlan({
      variables: {
        input: {
          name: title,
          creatorId: "629ad1210c267cfbc50d0440", // hardcoded ID --> replace with context
          rating: 0, // Hardcoded default rating created at the initial plan creation
          tags: tags,
          budget: 0, // Change this to a specific rating
          description: description,
          imageLinks: [String!],
        },
      },
    });
  };

  return (
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
        <Pressable onPress={() => navigation.navigate("Select Images")}>
          <Center>
            <Center
              _text={{
                color: "#B0B0B0",
                fontWeight: "bold",
              }}
              height={200}
              width={{
                base: 200,
                lg: 250,
              }}
            >
              <AntDesign name="plus" size={25} color="#B0B0B0" />
              Add Picture or Video
            </Center>
          </Center>
        </Pressable>
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
        <FormControl mb="1">
          <Button backgroundColor="#06B6D4">Done</Button>
        </FormControl>
      </Box>
      <Box>
        <FormControl mb="1">
          <Button backgroundColor="#AF2C43">Delete Plan</Button>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default function EditTravelPlan({ navigation }: { navigation: any }) {
  const [numDays, setNumDays] = useState(1);
  const [daysLabels, setDaysLabels] = useState(["Intro", "Day 1"]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [title, setTitle] = useState("");

  const incrementDays = () => {
    setNumDays(numDays + 1);
  };

  useLayoutEffect(() => {
    const newDayStr = "Day " + numDays;
    if (!daysLabels.includes(newDayStr)) {
      setDaysLabels([...daysLabels, newDayStr]);
    }
  }, [numDays]);

  // TODO: Implement delete days functionality

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
        <ScrollView horizontal={true}>
          <HStack>
            {daysLabels.map((label, index) =>
              activeTab === index ? (
                <Button
                  marginRight="1"
                  onPress={(_) => setActiveTab(index)}
                  key={label}
                  backgroundColor="#06B6D4"
                >
                  {label}
                </Button>
              ) : (
                <Button
                  marginRight="1"
                  variant="outline"
                  onPress={(_) => setActiveTab(index)}
                  key={label}
                >
                  {label}
                </Button>
              )
            )}
            <IconButton
              icon={<AntDesign name="plus" size={25} color="#06B6D4" />}
              onPress={incrementDays}
            />
          </HStack>
        </ScrollView>
      </Stack>
      {
        activeTab == 0 ? (
          <TravelPlanForm navigation={navigation} />
        ) : (
          <BlockPage navigation={navigation} blocks={[]} />
        ) /* Create a Block Component to Render here */
      }
    </ScrollView>
  );
}
