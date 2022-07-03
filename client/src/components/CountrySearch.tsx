import React from "react";
import {
  Text,
  Box,
  Input,
  Actionsheet,
  Button,
  HStack,
  ScrollView,
  Icon,
  VStack,
  Menu,
  IconButton,
  ChevronLeftIcon,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default function CountrySearch(props) {
  // const [countriesList, setCountriesList] = React.useState(null);
  const [filteredCountriesList, setFilteredCountriesList] = React.useState(
    props.countriesList
  );
  const [value, setValue] = React.useState("");

  const handleChange = (text) => {
    setValue(text);

    const newFilteredCountriesList = props.countriesList.filter((country) =>
      country.country.match(text)
    );

    setFilteredCountriesList(newFilteredCountriesList);
  };

  const displayCountriesList = () => {
    return filteredCountriesList.map((country, index) => {
      return (
        <Menu.Item
          key={index}
          onPress={() => {
            props.handleSelect(country.country);
            props.handleClose();
          }}
        >
          {country.country}
        </Menu.Item>
      );
    });
  };

  return (
    <Box>
      <ScrollView>
        <Actionsheet.Item>
          <HStack alignItems="Center">
            <IconButton
              onPress={() => props.handleClose()}
              mr="4"
              variant="ghost"
              size={6}
              icon={<ChevronLeftIcon />}
            />

            <Text fontSize="lg" fontWeight={600} color="coolGray.600">
              Select a country
            </Text>
          </HStack>
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
              size="sm"
              placeholder="Search Country"
              value={value}
              onChangeText={handleChange}
            />
          </HStack>
          {/* </Actionsheet.Item>
        <Actionsheet.Item> */}
          {filteredCountriesList ? (
            <VStack pt="2">{displayCountriesList()}</VStack>
          ) : null}
        </Actionsheet.Item>
      </ScrollView>
    </Box>
  );
}
