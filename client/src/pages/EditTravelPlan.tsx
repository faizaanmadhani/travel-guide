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
import { Dimensions, Pressable, Image, Platform } from "react-native";
import StyledTagInput from "../components/taginput";
import { gql, useMutation, useQuery } from "@apollo/client";
import { AntDesign } from "@expo/vector-icons";
import BlockPage from "./BlockPage";
import * as ImagePicker from "expo-image-picker";
import { UserContext } from "../../App";
import { LearnMoreLinks } from "react-native/Libraries/NewAppScreen";
import axios from "axios";
import CountrySearch from "../components/CountrySearch";

const UPDATE_PLAN = gql`
  mutation CreatePlan($input: UpdatePlanInput!) {
    modifyPlan(input: $input) {
      name
      rating
      budget
      tags
      description
      imageUrl
      dayLabels
      countries
    }
  }
`;

const DELETE_PLAN = gql`
  mutation deletePlan($planID: String!) {
    deletePlan(id: $planID) {
      id
    }
  }
`;

const GET_PLAN = gql`
  query ($id: String!) {
    plan(id: $id) {
      name
      budget
      rating
      tags
      description
    }
  }
`;

export default function EditTravelPlan({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { planID, isEdit } = route.params;

  const {
    data: QueryData,
    loading: QueryLoading,
    error: QueryError,
  } = useQuery(GET_PLAN, {
    variables: {
      id: planID,
    },
    skip: !isEdit,
  });

  const { userID } = useContext(UserContext);
  const [numDays, setNumDays] = useState(1);
  const [daysLabels, setDaysLabels] = useState(["Intro", "Day 1"]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [title, setTitle] = useState("");
  const [externImgUrl, setExternImgUrl] = useState("");
  const [tags, setTags] = useState({
    tag: "",
    tagsArray: [],
  });
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const imageRef = useRef(null);
  const budgets = ["$", "$$", "$$$", "$$$$"];
  const [activeBudgetIndicator, setActiveBudgetIndicator] = useState(0);

  const [isCountrySearchOpen, setIsCountrySearchOpen] = useState(false);
  const [countriesList, setCountriesList] = useState([]);
  const [countriesSelected, setCountriesSelected] = useState([]);

  const monthsObj = {
    Jan: false,
    Feb: false,
    Mar: false,
    Apr: false,
    May: false,
    Jun: false,
    Jul: false,
    Aug: false,
    Sep: false,
    Oct: false,
    Nov: false,
    Dec: false,
  };

  const [months, setMonths] = useState(new Map(Object.entries(monthsObj)));

  const updateMonths = (selectedMonth: string, state: boolean) => {
    setMonths(new Map(months.set(selectedMonth, !state)));
  };

  useEffect(() => {
    console.log("fetching countries hook");
    axios
      .get("https://countriesnow.space/api/v0.1/countries")
      .then(function (response) {
        // handle success
        setCountriesList(response.data.data);
        // setFilteredCountriesList(response.data.data);
      })
      .catch(function (error) {
        // handle error
      })
      .then(function () {
        // always executed
      });
  }, []);

  const closeCountrySearch = () => {
    setIsCountrySearchOpen(false);
  };

  const updateCountries = (_: any, newSelection: string) => {
    const index = countriesSelected.indexOf(newSelection);
    let countries = [...countriesSelected];

    if (index > -1) {
      countries.splice(index, 1);
    } else {
      countries.push(newSelection);
    }

    setCountriesSelected(countries);
  };

  const createFormData = (photo, body = {}) => {
    const data = new FormData();

    console.log("the uri", photo);

    const imageData: any = {
      uri: Platform.OS === "ios" ? photo.replace("file://", "") : photo,
      type: "image/jpeg",
      name: "image.jpg",
    };

    data.append("image", imageData);

    return data;
  };

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
    try {
      const response = await fetch(
        "https://5070-2620-101-f000-700-3-d157-d176-a79f.ngrok.io/image-upload",
        {
          method: "POST",
          body: createFormData(image),
        }
      );
      const responseJson = await response.json();
      const imageUrl: string = responseJson["imageUrl"];
      console.log("IMAGE UPLOAD RESULT", imageUrl);
      return imageUrl;
    } catch (error) {
      console.log("BIG IMAGE UPLOAD ERROR", error);
      return "";
    }
  };

  const [updatePlan, { data, loading, error }] = useMutation(UPDATE_PLAN, {
    onCompleted: (resultData) => {
      console.log("The mad result@!!", resultData);
      const planData = resultData.modifyPlan;
      setActiveBudgetIndicator(planData.budget - 1);
      setDescription(planData.description);
      setTags({
        tag: "",
        tagsArray: planData.tags,
      });
    },
  });

  const [
    deletePlan,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_PLAN, {
    onCompleted: (resultData) => {
      navigation.goBack();
    },
  });

  const triggerUpdate = async () => {
    console.log("image upload triggered");
    const newImageUrl = await uploadImage();

    const selectedMonths = [...months.keys()].filter(
      (k) => months.get(k) === true
    );
    console.log("these are the selectedmonths", selectedMonths, months);

    const inputData: any = {
      id: planID,
      name: title,
      creatorId: userID,
      rating: 4,
      budget: activeBudgetIndicator + 1,
      tags: tags.tagsArray === undefined ? [] : tags.tagsArray,
      description: description,
      imageUrl: newImageUrl,
      countries: countriesSelected,
      months: selectedMonths,
    };

    console.log("the input data", inputData);
    updatePlan({ variables: { input: inputData } }).catch((error) => {
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

  useEffect(() => {
    if (data && data.plan) {
      setTitle(data.plan.name);
      setActiveBudgetIndicator(data.plan.budget);
      setExternImgUrl(data.plan.image);
      setImage(data.plan.image);
      setTags({ tag: "", tagsArray: data.plan.tags });
      setDescription(data.plan.description);
      setDaysLabels(data.plan.dayLabels);
      setNumDays(data.plan.dayLabels.length - 1);
    }
  }, [data]);

  const displayCountries = () => {
    return countriesSelected.map((countrySelected, index) => {
      return (
        <Box key={index} mb="1">
          <Button
            key="sm"
            size="sm"
            onPress={() => updateCountries("countries", countrySelected)}
          >
            {countrySelected}
          </Button>
        </Box>
      );
    });
  };

  return (
    <Box>
      {isCountrySearchOpen ? (
        <CountrySearch
          handleClose={closeCountrySearch}
          handleSelect={updateCountries}
          countriesList={countriesList}
        />
      ) : (
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
                      onPress={async (_) => {
                        await triggerUpdate();

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
                      onPress={async (_) => {
                        await triggerUpdate();
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
                        onPress={(_) => setActiveBudgetIndicator(index)}
                        key={item}
                        backgroundColor="#06B6D4"
                        width={70}
                      >
                        {item}
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onPress={(_) => setActiveBudgetIndicator(index)}
                        width={70}
                        key={item}
                      >
                        {item}
                      </Button>
                    )
                  )}
                </HStack>
                <FormControl mb="1">
                  <FormControl.Label>Countries</FormControl.Label>
                  {displayCountries()}
                  <Button
                    key="sm"
                    size="sm"
                    variant={"outline"}
                    onPress={() => setIsCountrySearchOpen(true)}
                  >
                    + Select a country
                  </Button>
                </FormControl>
                <FormControl mb="1">
                  <FormControl.Label>Months</FormControl.Label>
                  <Stack
                    mt="4"
                    direction="row"
                    space={1}
                    alignItems={{
                      base: "center",
                      md: "flex-start",
                    }}
                    flexWrap="wrap"
                  >
                    {[...months.entries()].map(([k, v], _) => (
                      <Button
                        key="sm"
                        size="sm"
                        variant="outline"
                        isPressed={v}
                        onPress={() => updateMonths(k, v)}
                      >
                        {k}
                      </Button>
                    ))}
                  </Stack>
                </FormControl>
                <Box>
                  <FormControl mb="1">
                    <Button
                      backgroundColor="#3CB371"
                      onPress={() => {
                        if (title !== "") {
                          triggerUpdate();
                        } else {
                          deletePlan({
                            variables: {
                              planID: planID,
                            },
                          });
                        }
                        navigation.goBack();
                      }}
                    >
                      Finish Plan
                    </Button>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl mb="1">
                    <Button
                      backgroundColor="#AF2C43"
                      onPress={() => {
                        deletePlan({
                          variables: {
                            planID: planID,
                          },
                        });
                      }}
                    >
                      Delete Plan
                    </Button>
                  </FormControl>
                </Box>
              </Stack>
            ) : (
              <BlockPage
                navigation={navigation}
                planID={planID}
                day={activeTab}
              />
            ) /* Create a Block Component to Render here */
          }
        </ScrollView>
      )}
      ;
    </Box>
  );
}
