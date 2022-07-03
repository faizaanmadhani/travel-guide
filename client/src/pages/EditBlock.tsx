import React, { useState, useCallback } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { StyleSheet, View } from "react-native";
import { Pressable } from "react-native";
import {
  Box,
  Center,
  Stack,
  FormControl,
  TextArea,
  Button,
  HStack,
  ScrollView,
  IconButton,
  Input,
  Image,
  Text,
  Link,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import SearchBarWithAutocomplete, {
  PredictionType,
} from "../components/SearchBar";
import axios from "axios";
import { useDebounce } from "../hooks/useDebounce";

const GOOGLE_PLACES_API_BASE_URL = "https://maps.googleapis.com/maps/api/place";

// Search Bar Citation: https://medium.com/nerd-for-tech/react-native-custom-search-bar-with-google-places-autocomplete-api-69b1c98de6a0

export const EditBlockForm = ({ navigation }: { navigation: any }) => {
  const [search, setSearch] = useState({ term: "", fetchPredictions: false });
  const [showPredictions, setShowPredictions] = useState(false);
  const [predictions, setPredictions] = useState<PredictionType[]>([]);
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  // Form States
  const [description, setDescription] = useState("");

  const [activeBudgetIndicator, setActiveBudgetIndicator] = useState(0);
  const budgets = ["$", "$$", "$$$", "$$$$"];

  const [links, setLinks] = useState([]);
  const [linkEditable, setLinkEditable] = useState(false);
  const [currLink, setCurrLink] = useState("");

  const deleteLink = (index: number) => {
    let tempLinksArr = links;
    console.log("The index", index);
    console.log("Array: ", tempLinksArr);
    tempLinksArr.splice(index, 1);
    console.log("Array: ", tempLinksArr);
    setLinks(tempLinksArr);
  };

  const renderLink = async (url: string) => {
    const apiUrl = `http://api.linkpreview.net/?key=${process.env.LINK_PREV_KEY}&q=${url}`;
    console.log("API URL", apiUrl);
    try {
      const result = await axios.request({
        method: "get",
        url: apiUrl,
      });
      if (result) {
        console.log("The result");
        setLinks([
          ...links,
          {
            title: result.data?.title,
            description: result.data?.description,
            url: result.data?.url,
            image: result.data?.image,
          },
        ]);
      }
    } catch (e) {
      console.log(e);
    }
    setCurrLink("");
    setLinkEditable(false);
  };

  const onChangeText = async () => {
    if (search.term.trim() === "") return;
    if (!search.fetchPredictions) return;

    const apiUrl = `${GOOGLE_PLACES_API_BASE_URL}/autocomplete/json?key=${process.env.PLACES_API_KEY}&input=${search.term}`;
    try {
      const result = await axios.request({
        method: "post",
        url: apiUrl,
      });
      if (result) {
        const {
          data: { predictions },
        } = result;
        setPredictions(predictions);
        setShowPredictions(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useDebounce(onChangeText, 500, [search.term]);

  const onPredictionTapped = async (placeId: string, description: string) => {
    const apiUrl = `${GOOGLE_PLACES_API_BASE_URL}/details/json?key=${process.env.PLACES_API_KEY}&place_id=${placeId}`;
    try {
      const result = await axios.request({
        method: "post",
        url: apiUrl,
      });
      if (result) {
        const {
          data: {
            result: {
              geometry: { location },
            },
          },
        } = result;
        const { lat, lng } = location;
        setShowPredictions(false);
        setSearch({ term: description, fetchPredictions: false });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView>
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
        <FormControl mb="1">
          <FormControl.Label>Location</FormControl.Label>
          <SearchBarWithAutocomplete
            value={search.term}
            onChangeText={(text) => {
              setSearch({ term: text, fetchPredictions: true });
            }}
            showPredictions={showPredictions}
            predictions={predictions}
            onPredictionTapped={onPredictionTapped}
          />
        </FormControl>
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
        <FormControl mb="1">
          <FormControl.Label>Description</FormControl.Label>
          <TextArea
            h={20}
            placeholder="Add Plan Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
            autoCompleteType={undefined}
          />
        </FormControl>
        <FormControl mb="1">
          <FormControl.Label>Audio File</FormControl.Label>
          <Button
            marginRight="1"
            backgroundColor="#06B6D4"
            //   onPress={(_) => setActiveTab(index)}
            //   key={label}
          >
            Record Audio
          </Button>
        </FormControl>
        <FormControl mb="1">
          <FormControl.Label>Title</FormControl.Label>
          <Input />
        </FormControl>
        <FormControl mb="1">
          <FormControl.Label>Estimated Price</FormControl.Label>
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
        </FormControl>
        <FormControl mb="1">
          <FormControl.Label>Links</FormControl.Label>
          {links.map((obj, index) => (
            <Box
              borderRadius="5"
              borderWidth="2"
              marginTop="1"
              marginBottom="1"
              borderColor="#E5E5E5"
              width="100%"
              key={obj.title}
            >
              <HStack space="0" justifyContent="space-between">
                <Link href={obj.url} isExternal>
                  <HStack width="70%">
                    <Image
                      source={{
                        uri: obj.image,
                      }}
                      alt="Alternate Text"
                      size="md"
                    />
                    <Box width="70%" marginLeft="3%">
                      <Stack>
                        <Text bold>{obj.title}</Text>
                        <Text isTruncated maxW="1000">
                          {obj.description}
                        </Text>
                      </Stack>
                    </Box>
                  </HStack>
                </Link>
                <IconButton
                  icon={<AntDesign name="delete" size={20} color="white" />}
                  backgroundColor="#06B6D4"
                  onPress={() => deleteLink(index)}
                />
              </HStack>
            </Box>
          ))}
          {linkEditable ? (
            <Input
              onChangeText={(text) => setCurrLink(text)}
              onSubmitEditing={() => renderLink(currLink)}
            />
          ) : (
            <IconButton
              icon={<AntDesign name="plus" size={25} color="white" />}
              backgroundColor="#06B6D4"
              onPress={() => setLinkEditable(true)}
            />
          )}
        </FormControl>
        <Box>
          <FormControl mb="1">
            <Button backgroundColor="#06B6D4">Done</Button>
          </FormControl>
        </Box>
        <Box>
          <FormControl mb="1">
            <Button backgroundColor="#AF2C43">Delete Block</Button>
          </FormControl>
        </Box>
      </Stack>
    </ScrollView>
  );
};
