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

// const TravelPlanForm = ({
//   navigation,
//   planID,
//   title,
//   triggerNext,
// }: {
//   navigation: any;
//   planID: string;
//   title: string;
//   triggerNext: any;
// }) => {

//   return (
//   );
// };

export default function EditTravelPlan({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [numDays, setNumDays] = useState(1);
  const [daysLabels, setDaysLabels] = useState(["Intro", "Day 1"]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [title, setTitle] = useState("");

  const [addPlan, { data, loading, error }] = useMutation(CREATE_PLAN);

  const { planID, justCreated } = route.params;
  const [isJustCreated, setIsJustCreated] = useState(justCreated);

  const [tags, setTags] = useState({
    tag: "",
    tagsArray: [],
  });
  const [description, setDescription] = useState("");

  const updatePlan = () => {};

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
                  onPress={(_) => {
                    setActiveTab(index);
                    updatePlan();
                  }}
                  key={label}
                  backgroundColor="#06B6D4"
                >
                  {label}
                </Button>
              ) : (
                <Button
                  marginRight="1"
                  variant="outline"
                  onPress={(_) => {
                    setActiveTab(index);
                    updatePlan();
                  }}
                  key={label}
                >
                  {label}
                </Button>
              )
            )}
            <IconButton
              icon={<AntDesign name="plus" size={25} color="#06B6D4" />}
              onPress={incrementDays}
              disabled={!isJustCreated}
            />
          </HStack>
        </ScrollView>
      </Stack>
      {
        activeTab == 0 ? (
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
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
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
                <Button backgroundColor="#3CB371">Finish Plan</Button>
              </FormControl>
            </Box>
            <Box>
              <FormControl mb="1">
                <Button backgroundColor="#AF2C43">Delete Plan</Button>
              </FormControl>
            </Box>
          </Stack>
        ) : (
          <BlockPage navigation={navigation} planID={planID} />
        ) /* Create a Block Component to Render here */
      }
    </ScrollView>
  );
}
