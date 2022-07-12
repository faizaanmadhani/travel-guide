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

  const [filtersSelected, setFiltersSelected] = React.useState(
    props.currentFilters
      ? props.currentFilters
      : {
          countries: [],
          rating: [],
          budget: [],
          months: [],
        }
  );

  React.useEffect(() => {
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

  const displayCountries = () => {
    return filtersSelected.countries.map((countrySelected, index) => {
      return (
        <Box key={index} mb="1">
          <Button
            key="sm"
            size="sm"
            onPress={() => updateFiltersSelected("countries", countrySelected)}
          >
            {countrySelected}
          </Button>
        </Box>
      );
    });
  };

  const updateFiltersSelected = (filterName: string, option: any) => {
    let newFiltersSelected = { ...filtersSelected };

    if (option === 0) {
      newFiltersSelected[filterName] = [];
    } else {
      const index = filtersSelected[filterName].indexOf(option);
      if (index > -1) {
        newFiltersSelected[filterName].splice(index, 1);
      } else {
        newFiltersSelected[filterName].push(option);
      }
    }
    setFiltersSelected(newFiltersSelected);
  };

  const applyFilters = () => {
    props.refetchPlans(filtersSelected);
    props.closeFilters();
  };

  return (
    <Box>
      {isCountrySearchOpen ? (
        <CountrySearch
          handleClose={closeCountrySearch}
          handleSelect={updateFiltersSelected}
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

              {filtersSelected.countries ? (
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
                    isPressed={filtersSelected.rating.length === 0}
                    onPress={() => updateFiltersSelected("rating", 0)}
                  >
                    All
                  </Button>
                </Box>
                <Box mb="1">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={filtersSelected.rating.includes(1)}
                    onPress={() => updateFiltersSelected("rating", 1)}
                  >
                    1 Star
                  </Button>
                </Box>
                <Box mb="1">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={filtersSelected.rating.includes(2)}
                    onPress={() => updateFiltersSelected("rating", 2)}
                  >
                    2 Stars
                  </Button>
                </Box>
                <Box mb="1">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={filtersSelected.rating.includes(3)}
                    onPress={() => updateFiltersSelected("rating", 3)}
                  >
                    3 Stars
                  </Button>
                </Box>
                <Box mb="1">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={filtersSelected.rating.includes(4)}
                    onPress={() => updateFiltersSelected("rating", 4)}
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
                    isPressed={filtersSelected.budget.length === 0}
                    onPress={() => updateFiltersSelected("budget", 0)}
                  >
                    All
                  </Button>
                </Box>
                <Box mb="1">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={filtersSelected.budget.includes(1)}
                    onPress={() => updateFiltersSelected("budget", 1)}
                  >
                    $ (1)
                  </Button>
                </Box>
                <Box mb="1">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={filtersSelected.budget.includes(2)}
                    onPress={() => updateFiltersSelected("budget", 2)}
                  >
                    $$ (2)
                  </Button>
                </Box>
                <Box mb="1">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={filtersSelected.budget.includes(3)}
                    onPress={() => updateFiltersSelected("budget", 3)}
                  >
                    $$$ (3)
                  </Button>
                </Box>
                <Box mb="1">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={filtersSelected.budget.includes(4)}
                    onPress={() => updateFiltersSelected("budget", 4)}
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
                    isPressed={filtersSelected.months.includes("Jan")}
                    onPress={() => updateFiltersSelected("months", "Jan")}
                  >
                    Jan
                  </Button>
                </Box>
                <Box mb="2">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={filtersSelected.months.includes("Feb")}
                    onPress={() => updateFiltersSelected("months", "Feb")}
                  >
                    Feb
                  </Button>
                </Box>
                <Box mb="2">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={filtersSelected.months.includes("Mar")}
                    onPress={() => updateFiltersSelected("months", "Mar")}
                  >
                    Mar
                  </Button>
                </Box>
                <Box mb="2">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={filtersSelected.months.includes("Apr")}
                    onPress={() => updateFiltersSelected("months", "Apr")}
                  >
                    Apr
                  </Button>
                </Box>
                <Box mb="2">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={filtersSelected.months.includes("May")}
                    onPress={() => updateFiltersSelected("months", "May")}
                  >
                    May
                  </Button>
                </Box>
                <Box mb="2">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={filtersSelected.months.includes("Jun")}
                    onPress={() => updateFiltersSelected("months", "Jun")}
                  >
                    Jun
                  </Button>
                </Box>
                <Box mb="2">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={filtersSelected.months.includes("Jul")}
                    onPress={() => updateFiltersSelected("months", "Jul")}
                  >
                    Jul
                  </Button>
                </Box>
                <Box mb="2">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={filtersSelected.months.includes("Aug")}
                    onPress={() => updateFiltersSelected("months", "Aug")}
                  >
                    Aug
                  </Button>
                </Box>
                <Box mb="2">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={filtersSelected.months.includes("Sep")}
                    onPress={() => updateFiltersSelected("months", "Sep")}
                  >
                    Sep
                  </Button>
                </Box>
                <Box mb="2">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={filtersSelected.months.includes("Oct")}
                    onPress={() => updateFiltersSelected("months", "Oct")}
                  >
                    Oct
                  </Button>
                </Box>
                <Box mb="2">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={filtersSelected.months.includes("Nov")}
                    onPress={() => updateFiltersSelected("months", "Nov")}
                  >
                    Nov
                  </Button>
                </Box>
                <Box mb="2">
                  <Button
                    key="sm"
                    size="sm"
                    variant="outline"
                    isPressed={filtersSelected.months.includes("Dec")}
                    onPress={() => updateFiltersSelected("months", "Dec")}
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
                    setFiltersSelected({
                      countries: [],
                      rating: [],
                      budget: [],
                      months: [],
                    });
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
