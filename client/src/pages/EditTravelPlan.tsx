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
import { Dimensions, Pressable, Image } from "react-native";
import StyledTagInput from "../components/taginput";
import { gql, useMutation } from "@apollo/client";
import { AntDesign } from "@expo/vector-icons";
import BlockPage from "./BlockPage";
import * as ImagePicker from "expo-image-picker";

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

  const { planID, justCreated } = route.params;
  const [isJustCreated, setIsJustCreated] = useState(justCreated);

  const incrementDays = () => {
    setNumDays(numDays + 1);
  };

  useLayoutEffect(() => {
    const newDayStr = "Day " + numDays;
    if (!daysLabels.includes(newDayStr)) {
      setDaysLabels([...daysLabels, newDayStr]);
    }
  }, [numDays]);

  // Form state:
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState({
    tag: "",
    tagsArray: [],
  });
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result["uri"]);
    }
  };

  console.log("The image url", image);

  const updatePlan = () => {};

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
              <Pressable onPress={() => pickImage()}>
                <Center>
                  {!image ? (
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
                  ) : (
                    <Image
                      source={{ uri: image }}
                      style={{ width: 400, height: 400 }}
                    />
                  )}
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
