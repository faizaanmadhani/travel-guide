import React from "react";
import {
  Text,
  Box,
  Input,
  Actionsheet,
  Button,
  Radio,
  HStack,
  ScrollView,
  Flex,
  Checkbox,
  Icon,
  Center,
  useDisclose,
  Slide,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { ArgumentNode } from "graphql";
import axios from "axios";
import CountrySearch from "./CountrySearch";

export default function Filters() {
  const [selectedPriceRange, setSelectedPriceRange] =
    React.useState<string>("all");
  const [selectedRatings, setSelectedRatings] =
    React.useState<string>("all-ratings");
  const [selectedMonths, setSelectedMonths] = React.useState<string[]>([]);
  const [isCountrySearchOpen, setIsCountrySearchOpen] =
    React.useState<boolean>(false);
  const [countriesList, setCountriesList] = React.useState(null);

  React.useEffect(() => {
    console.log("fetch!");
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

  const toggleMonth = (checked: boolean, month: string): void => {
    let months: string[] = selectedMonths;
    const index: number = months.indexOf(month);
    if (checked) {
      months.push(month);
    } else {
      if (index > -1) {
        months.splice(index, 1);
      }
    }
    setSelectedMonths(months);
  };

  const selectCountry = (country) => {
    console.log("countries selected - ", country);
  };

  const closeCountrySearch = () => {
    setIsCountrySearchOpen(false);
  };

  return (
    <Box>
      {isCountrySearchOpen ? (
        <CountrySearch
          handleClose={closeCountrySearch}
          handleSelect={selectCountry}
          countriesList={countriesList}
        />
      ) : (
        <Box>
          <ScrollView>
            {/* Filter 1: Destination */}
            <Actionsheet.Item>
              <Text
                pt="8px"
                fontSize="lg"
                fontWeight={600}
                color="coolGray.600"
              >
                Countries
              </Text>
              <Button onPress={() => setIsCountrySearchOpen(true)}>
                Select
              </Button>
              <HStack pt="16px">
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
                  w="100%"
                  size="lg"
                  placeholder="Search destination"
                />
              </HStack>
            </Actionsheet.Item>

            {/* Filter 2: Ratings */}
            <Actionsheet.Item>
              <Text
                pt="8px"
                fontSize="lg"
                fontWeight={600}
                color="coolGray.600"
              >
                Ratings
              </Text>
              <Radio.Group
                name="ratings"
                defaultValue="all-ratings"
                value={selectedRatings}
                onChange={(nextValue) => {
                  setSelectedRatings(nextValue);
                }}
              >
                <Flex direction="row" wrap="wrap" pt="16px">
                  <Box mr={4} mb={2}>
                    <Radio value="all-ratings" my={1}>
                      All
                    </Radio>
                  </Box>
                  <Box mr={4} mb={2}>
                    <Radio value="four-plus" my={1}>
                      4.0 +
                    </Radio>
                  </Box>
                  <Box mr={4} mb={2}>
                    <Radio value="three-plus" my={1}>
                      3.0 +
                    </Radio>
                  </Box>
                  <Box mr={4} mb={2}>
                    <Radio value="twp-plus" my={1}>
                      2.0 +
                    </Radio>
                  </Box>
                  <Box mr={4} mb={2}>
                    <Radio value="one-plus" my={1}>
                      1.0 +
                    </Radio>
                  </Box>
                </Flex>
              </Radio.Group>
            </Actionsheet.Item>

            {/* Filter 3: Price Range */}
            <Actionsheet.Item>
              <Text
                pt="8px"
                fontSize="lg"
                fontWeight={600}
                color="coolGray.600"
              >
                Price Range
              </Text>
              <Radio.Group
                name="price-range"
                defaultValue="all"
                value={selectedPriceRange}
                onChange={(nextValue) => {
                  setSelectedPriceRange(nextValue);
                }}
              >
                <Flex direction="row" wrap="wrap" pt="16px">
                  <Box mr={4} mb={2}>
                    <Radio value="all" my={1}>
                      All
                    </Radio>
                  </Box>
                  <Box mr={4} mb={2}>
                    <Radio value="cheap" my={1}>
                      $ +
                    </Radio>
                  </Box>
                  <Box mr={4} mb={2}>
                    <Radio value="normal" my={1}>
                      $$ +
                    </Radio>
                  </Box>
                  <Box mr={4} mb={2}>
                    <Radio value="expensive" my={1}>
                      $$$ +
                    </Radio>
                  </Box>
                </Flex>
              </Radio.Group>
            </Actionsheet.Item>

            {/* Filter 4: Popular Months */}
            <Actionsheet.Item>
              <Text
                pt="8px"
                fontSize="lg"
                fontWeight={600}
                color="coolGray.600"
              >
                Popular Months to Travel
              </Text>

              <Flex
                direction="row"
                wrap="wrap"
                pt="16px"
                justifyContent="space-between"
              >
                <Box w="20%" mr={4} mb={2}>
                  <Checkbox
                    value="Jan"
                    size="md"
                    my="1"
                    onChange={(state) => toggleMonth(state, "Jan")}
                  >
                    Jan
                  </Checkbox>
                </Box>
                <Box w="20%" mr={4} mb={2}>
                  <Checkbox
                    value="Feb"
                    size="md"
                    my="1"
                    onChange={(state) => toggleMonth(state, "Feb")}
                  >
                    Feb
                  </Checkbox>
                </Box>
                <Box w="20%" mr={4} mb={2}>
                  <Checkbox
                    value="Mar"
                    size="md"
                    my="1"
                    onChange={(state) => toggleMonth(state, "Mar")}
                  >
                    Mar
                  </Checkbox>
                </Box>
                <Box w="20%" mr={4} mb={2}>
                  <Checkbox
                    value="Apr"
                    size="md"
                    my="1"
                    onChange={(state) => toggleMonth(state, "Apr")}
                  >
                    Apr
                  </Checkbox>
                </Box>
                <Box w="20%" mr={4} mb={2}>
                  <Checkbox
                    value="May"
                    size="md"
                    my="1"
                    onChange={(state) => toggleMonth(state, "May")}
                  >
                    May
                  </Checkbox>
                </Box>
                <Box w="20%" mr={4} mb={2}>
                  <Checkbox
                    value="Jun"
                    size="md"
                    my="1"
                    onChange={(state) => toggleMonth(state, "Jun")}
                  >
                    Jun
                  </Checkbox>
                </Box>
                <Box w="20%" mr={4} mb={2}>
                  <Checkbox
                    value="Jul"
                    size="md"
                    my="1"
                    onChange={(state) => toggleMonth(state, "Jul")}
                  >
                    Jul
                  </Checkbox>
                </Box>
                <Box w="20%" mr={4} mb={2}>
                  <Checkbox
                    value="Aug"
                    size="md"
                    my="1"
                    onChange={(state) => toggleMonth(state, "Aug")}
                  >
                    Aug
                  </Checkbox>
                </Box>
                <Box w="20%" mr={4} mb={2}>
                  <Checkbox
                    value="Sep"
                    size="md"
                    my="1"
                    onChange={(state) => toggleMonth(state, "Sep")}
                  >
                    Sep
                  </Checkbox>
                </Box>
                <Box w="20%" mr={4} mb={2}>
                  <Checkbox
                    value="Oct"
                    size="md"
                    my="1"
                    onChange={(state) => toggleMonth(state, "Oct")}
                  >
                    Oct
                  </Checkbox>
                </Box>
                <Box w="20%" mr={4} mb={2}>
                  <Checkbox
                    value="Nov"
                    size="md"
                    my="1"
                    onChange={(state) => toggleMonth(state, "Nov")}
                  >
                    Nov
                  </Checkbox>
                </Box>
                <Box w="20%" mr={4} mb={2}>
                  <Checkbox
                    value="Dec"
                    size="md"
                    my="1"
                    onChange={(state) => toggleMonth(state, "Dec")}
                  >
                    Dec
                  </Checkbox>
                </Box>
              </Flex>
            </Actionsheet.Item>
          </ScrollView>

          {/* Actions */}
          <Actionsheet.Item>
            <HStack py="16px">
              <Button w="70%">Apply</Button>
              <Box w="30%" pl="2">
                <Button variant="outline">Clear</Button>
              </Box>
            </HStack>
          </Actionsheet.Item>
        </Box>
      )}
    </Box>
  );
}
