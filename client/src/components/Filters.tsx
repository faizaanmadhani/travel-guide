import React from "react";
import {
  Text,
  Box,
  Actionsheet,
  Button,
  HStack,
  ScrollView,
  Stack,
} from "native-base";
import axios from "axios";
import CountrySearch from "./CountrySearch";

export default function Filters(props) {
  const [isCountrySearchOpen, setIsCountrySearchOpen] =
    React.useState<boolean>(false);
  const [countriesList, setCountriesList] = React.useState(null);
  const [countriesSelected, setCountriesSelected] = React.useState(
    props.currentFilters ? props.currentFilters.countries : []
  ); // countries filter
  const [ratingsSelected, setRatingsSelected] = React.useState(
    props.currentFilters ? props.currentFilters.ratings : []
  );
  const [priceRangesSelected, setPriceRangesSelected] = React.useState(
    props.currentFilters ? props.currentFilters.priceRanges : []
  );
  const [monthsSelected, setMonthsSelected] = React.useState(
    props.currentFilters ? props.currentFilters.months : []
  );

  React.useEffect(() => {
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

  const selectCountry = (country: String) => {
    if (!countriesSelected.includes(country)) {
      let newCountriesSelected = countriesSelected;
      newCountriesSelected.push(country);
      setCountriesSelected(newCountriesSelected);
    }
  };

  const removeCountry = (country: String) => {
    if (countriesSelected.includes(country)) {
      const newCountriesSelected = countriesSelected.filter(
        (countrySelected) => countrySelected !== country
      );
      setCountriesSelected(newCountriesSelected);
    }
  };

  const closeCountrySearch = () => {
    setIsCountrySearchOpen(false);
  };

  const displayCountries = () => {
    return countriesSelected.map((countrySelected, index) => {
      return (
        <Box key={index} mb="1">
          <Button
            key="sm"
            size="sm"
            onPress={() => removeCountry(countrySelected)}
          >
            {countrySelected}
          </Button>
        </Box>
      );
    });
  };

  const updateMonthsSelected = (monthOption: string) => {
    let newMonthsSelected = [];

    const index = monthsSelected.indexOf(monthOption);

    monthsSelected.map((month) => newMonthsSelected.push(month));
    if (index > -1) {
      newMonthsSelected.splice(index, 1);
    } else {
      newMonthsSelected.push(monthOption);
    }
    setMonthsSelected(newMonthsSelected);
  };

  const updatePriceRangesSelected = (priceRangeOption: string) => {
    let newPriceRangesSelected = [];

    if (priceRangeOption === "allPriceRanges") {
      setPriceRangesSelected([]);
    } else {
      const index = priceRangesSelected.indexOf(priceRangeOption);

      priceRangesSelected.map((priceRange) =>
        newPriceRangesSelected.push(priceRange)
      );
      if (index > -1) {
        newPriceRangesSelected.splice(index, 1);
      } else {
        newPriceRangesSelected.push(priceRangeOption);
      }
      setPriceRangesSelected(newPriceRangesSelected);
    }
  };

  const updateRatingsSelected = (ratingOption: string) => {
    let newRatingsSelected = [];

    if (ratingOption === "allRatings") {
      setRatingsSelected([]);
    } else {
      const index = ratingsSelected.indexOf(ratingOption);

      ratingsSelected.map((rating) => newRatingsSelected.push(rating));
      if (index > -1) {
        newRatingsSelected.splice(index, 1);
      } else {
        newRatingsSelected.push(ratingOption);
      }
      setRatingsSelected(newRatingsSelected);
    }
  };

  const applyFilters = () => {
    props.refetchPlans(
      countriesSelected,
      ratingsSelected,
      priceRangesSelected,
      monthsSelected
    );
    props.closeFilters();
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
              <Text fontSize="md" fontWeight={600} color="coolGray.600">
                COUNTRIES
              </Text>

              {countriesSelected ? (
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
                  {displayCountries()}
                  <Box mb="1">
                    <Button
                      key="sm"
                      size="sm"
                      variant={"outline"}
                      onPress={() => setIsCountrySearchOpen(true)}
                    >
                      + Select a country
                    </Button>
                  </Box>
                </Stack>
              ) : null}
            </Actionsheet.Item>

            {/* Filter 2: Ratings */}
            <Actionsheet.Item>
              <Text fontSize="md" fontWeight={600} color="coolGray.600">
                RATINGS
              </Text>
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
                <Box mb="1">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={ratingsSelected.length === 0}
                    onPress={() => updateRatingsSelected("allRatings")}
                  >
                    All
                  </Button>
                </Box>
                <Box mb="1">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={ratingsSelected.includes("oneRating")}
                    onPress={() => updateRatingsSelected("oneRating")}
                  >
                    1 Star
                  </Button>
                </Box>
                <Box mb="1">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={ratingsSelected.includes("twoRating")}
                    onPress={() => updateRatingsSelected("twoRating")}
                  >
                    2 Stars
                  </Button>
                </Box>
                <Box mb="1">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={ratingsSelected.includes("threeRating")}
                    onPress={() => updateRatingsSelected("threeRating")}
                  >
                    3 Stars
                  </Button>
                </Box>
                <Box mb="1">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={ratingsSelected.includes("fourRating")}
                    onPress={() => updateRatingsSelected("fourRating")}
                  >
                    4 Stars
                  </Button>
                </Box>
              </Stack>
            </Actionsheet.Item>

            {/* Filter 3: Price Range */}
            <Actionsheet.Item>
              <Text fontSize="md" fontWeight={600} color="coolGray.600">
                PRICE RANGE
              </Text>
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
                <Box mb="1">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={priceRangesSelected.length === 0}
                    onPress={() => updatePriceRangesSelected("allPriceRanges")}
                  >
                    All
                  </Button>
                </Box>
                <Box mb="1">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={priceRangesSelected.includes("onePriceRange")}
                    onPress={() => updatePriceRangesSelected("onePriceRange")}
                  >
                    $ (1)
                  </Button>
                </Box>
                <Box mb="1">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={priceRangesSelected.includes("twoPriceRange")}
                    onPress={() => updatePriceRangesSelected("twoPriceRange")}
                  >
                    $$ (2)
                  </Button>
                </Box>
                <Box mb="1">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={priceRangesSelected.includes("threePriceRange")}
                    onPress={() => updatePriceRangesSelected("threePriceRange")}
                  >
                    $$$ (3)
                  </Button>
                </Box>
                <Box mb="1">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={priceRangesSelected.includes("fourPriceRange")}
                    onPress={() => updatePriceRangesSelected("fourPriceRange")}
                  >
                    $$$$ (4)
                  </Button>
                </Box>
              </Stack>
            </Actionsheet.Item>

            {/* Filter 4: Popular Months */}
            <Actionsheet.Item>
              <Text fontSize="md" fontWeight={600} color="coolGray.600">
                POPULAR MONTHS TO TRAVEL
              </Text>

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
                <Box mb="2">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={monthsSelected.includes("Jan")}
                    onPress={() => updateMonthsSelected("Jan")}
                  >
                    Jan
                  </Button>
                </Box>
                <Box mb="2">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={monthsSelected.includes("Feb")}
                    onPress={() => updateMonthsSelected("Feb")}
                  >
                    Feb
                  </Button>
                </Box>
                <Box mb="2">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={monthsSelected.includes("Mar")}
                    onPress={() => updateMonthsSelected("Mar")}
                  >
                    Mar
                  </Button>
                </Box>
                <Box mb="2">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={monthsSelected.includes("Apr")}
                    onPress={() => updateMonthsSelected("Apr")}
                  >
                    Apr
                  </Button>
                </Box>
                <Box mb="2">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={monthsSelected.includes("May")}
                    onPress={() => updateMonthsSelected("May")}
                  >
                    May
                  </Button>
                </Box>
                <Box mb="2">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={monthsSelected.includes("Jun")}
                    onPress={() => updateMonthsSelected("Jun")}
                  >
                    Jun
                  </Button>
                </Box>
                <Box mb="2">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={monthsSelected.includes("Jul")}
                    onPress={() => updateMonthsSelected("Jul")}
                  >
                    Jul
                  </Button>
                </Box>
                <Box mb="2">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={monthsSelected.includes("Aug")}
                    onPress={() => updateMonthsSelected("Aug")}
                  >
                    Aug
                  </Button>
                </Box>
                <Box mb="2">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={monthsSelected.includes("Sep")}
                    onPress={() => updateMonthsSelected("Sep")}
                  >
                    Sep
                  </Button>
                </Box>
                <Box mb="2">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={monthsSelected.includes("Oct")}
                    onPress={() => updateMonthsSelected("Oct")}
                  >
                    Oct
                  </Button>
                </Box>
                <Box mb="2">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={monthsSelected.includes("Nov")}
                    onPress={() => updateMonthsSelected("Nov")}
                  >
                    Nov
                  </Button>
                </Box>
                <Box mb="2">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={monthsSelected.includes("Dec")}
                    onPress={() => updateMonthsSelected("Dec")}
                  >
                    Dec
                  </Button>
                </Box>
              </Stack>
            </Actionsheet.Item>
          </ScrollView>

          {/* Actions */}
          <Actionsheet.Item>
            <HStack py="16px">
              <Button w="70%" onPress={applyFilters}>
                Apply
              </Button>
              <Box w="30%" pl="2">
                <Button
                  variant="outline"
                  onPress={() => {
                    setCountriesSelected([]);
                    setRatingsSelected([]);
                    setPriceRangesSelected([]);
                    setMonthsSelected([]);
                  }}
                >
                  Clear
                </Button>
              </Box>
            </HStack>
          </Actionsheet.Item>
        </Box>
      )}
    </Box>
  );
}
