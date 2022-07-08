import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  useContext,
} from "react";
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
import { UserContext } from "../../App";
import { LearnMoreLinks } from "react-native/Libraries/NewAppScreen";
import axios from "axios";

const UPDATE_PLAN = gql`
  mutation CreatePlan($input: UpdatePlanInput!) {
    modifyPlan(input: $input) {
      name
      rating
      budget
      tags
      description
      assetLinks
    }
  }
`;

export default function EditTravelPlan({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
  new: boolean;
}) {
  const { planID } = route.params;
  const { userID } = useContext(UserContext);
  const [numDays, setNumDays] = useState(1);
  const [daysLabels, setDaysLabels] = useState(["Intro", "Day 1"]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState({
    tag: "",
    tagsArray: [],
  });
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const budgets = ["$", "$$", "$$$", "$$$$"];
  const [activeBudgetIndicator, setActiveBudgetIndicator] = useState(0);

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

  const uploadImage = async () => {
    // format the image data

    const form = new FormData();

    const imageData: any = {
      uri: image,
      type: "image/jpeg",
      name: "userImage" + planID + "-" + Date.now() + ".jpg",
    };
    form.append("image", imageData);
    // append the image to the object with the title 'image'
    const url = `${process.env.SERVER_URL}/image-upload`;
    // Perform the request. Note the content type - very important
    axios
      .post(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: form,
      })
      .then((res) => {
        console.log("The result", res);
        return res.data;
      })
      .then((results) => {
        setImage(results.imgUrl); // Replace image with cloud image
      })
      .catch((error) => {
        console.error("IMAGE UPLOADING ERROR", JSON.stringify(error, null, 2));
      });
  };

  const [updatePlan, { data, loading, error }] = useMutation(UPDATE_PLAN, {
    onCompleted: (resultData) => {
      console.log("The mad result@!!", resultData);
      const planData = resultData.modifyPlan;
      setImage(resultData.assetLinks[0]); // Hardcoded to first image for now
      setActiveBudgetIndicator(resultData.budget - 1);
      setDescription(resultData.description);
      setTags({
        tag: "",
        tagsArray: resultData.tags,
      });
    },
  });

  const triggerUpdate = () => {
    const inputData: any = {
      id: planID,
      name: title,
      creatorId: userID,
      rating: 4,
      budget: activeBudgetIndicator + 1,
      tags: tags.tagsArray,
      description: description,
      assetLinks: [
        "https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2014/01/scenery.jpg", // HARDCODED asset right now
      ],
    };
    updatePlan({ variables: { input: inputData } }).catch((e) => {
      console.log(JSON.stringify(error, null, 2));
    });
  };

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
                    triggerUpdate();
                    setActiveTab(index);
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
                    triggerUpdate();
                    setActiveTab(index);
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
            <HStack
              alignItems="center"
              justifyContent="space-between"
              //   marginLeft="5"
              //   marginRight="5"
            >
              {budgets.map((item, index) =>
                activeBudgetIndicator === index ? (
                  <Button
                    marginRight="1"
                    onPress={(_) => setActiveBudgetIndicator(index)}
                    key={item}
                    backgroundColor="#06B6D4"
                    width={60}
                  >
                    {item}
                  </Button>
                ) : (
                  <Button
                    marginRight="1"
                    variant="outline"
                    onPress={(_) => setActiveBudgetIndicator(index)}
                    width={60}
                    key={item}
                  >
                    {item}
                  </Button>
                )
              )}
            </HStack>
            <Box>
              <FormControl mb="1">
                <Button
                  backgroundColor="#3CB371"
                  onPress={() => {
                    triggerUpdate();
                    navigation.goBack();
                  }}
                >
                  Finish Plan
                </Button>
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
