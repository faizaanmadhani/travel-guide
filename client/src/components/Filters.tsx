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
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { ArgumentNode } from "graphql";

export default function Filters() {
  const [selectedPriceRange, setSelectedPriceRange] =
    React.useState<string>("all");
  const [selectedRatings, setSelectedRatings] =
    React.useState<string>("all-ratings");
  const [selectedMonths, setSelectedMonths] = React.useState<string[]>([]);

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

  return (
    <Box>
      <ScrollView>
        {/* Filter 1: Destination */}
        <Actionsheet.Item>
          <Text
            // w="100%"
            pt="8px"
            fontSize="lg"
            fontWeight={600}
            color="coolGray.600"
          >
            Destination
          </Text>
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
          <Text pt="8px" fontSize="lg" fontWeight={600} color="coolGray.600">
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
              <Box mr={4}>
                <Radio value="all-ratings" my={1}>
                  All
                </Radio>
              </Box>
              <Box mr={4}>
                <Radio value="four-plus" my={1}>
                  4.0 +
                </Radio>
              </Box>
              <Box mr={4}>
                <Radio value="three-plus" my={1}>
                  3.0 +
                </Radio>
              </Box>
              <Box mr={4}>
                <Radio value="twp-plus" my={1}>
                  2.0 +
                </Radio>
              </Box>
              <Box mr={4}>
                <Radio value="one-plus" my={1}>
                  1.0 +
                </Radio>
              </Box>
            </Flex>
          </Radio.Group>
        </Actionsheet.Item>

        {/* Filter 3: Price Range */}
        <Actionsheet.Item>
          <Text pt="8px" fontSize="lg" fontWeight={600} color="coolGray.600">
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
              <Box mr={4}>
                <Radio value="all" my={1}>
                  All
                </Radio>
              </Box>
              <Box mr={4}>
                <Radio value="cheap" my={1}>
                  $
                </Radio>
              </Box>
              <Box mr={4}>
                <Radio value="normal" my={1}>
                  $$
                </Radio>
              </Box>
              <Box mr={4}>
                <Radio value="expensive" my={1}>
                  $$$
                </Radio>
              </Box>
            </Flex>
          </Radio.Group>
        </Actionsheet.Item>

        {/* Filter 4: Popular Months */}
        <Actionsheet.Item>
          <Text pt="8px" fontSize="lg" fontWeight={600} color="coolGray.600">
            Popular Months to Travel
          </Text>

          <Flex direction="row" wrap="wrap" pt="16px">
            <Box mr={4}>
              <Checkbox
                value="Jan"
                my="1"
                onChange={(state) => toggleMonth(state, "Jan")}
              >
                Jan
              </Checkbox>
            </Box>
            <Box mr={4}>
              <Checkbox
                value="Feb"
                my="1"
                onChange={(state) => toggleMonth(state, "Feb")}
              >
                Feb
              </Checkbox>
            </Box>
            <Box mr={4}>
              <Checkbox
                value="Mar"
                my="1"
                onChange={(state) => toggleMonth(state, "Mar")}
              >
                Mar
              </Checkbox>
            </Box>
            <Box mr={4}>
              <Checkbox
                value="Apr"
                my="1"
                onChange={(state) => toggleMonth(state, "Apr")}
              >
                Apr
              </Checkbox>
            </Box>
            <Box mr={4}>
              <Checkbox
                value="May"
                my="1"
                onChange={(state) => toggleMonth(state, "May")}
              >
                May
              </Checkbox>
            </Box>
            <Box mr={4}>
              <Checkbox
                value="Jun"
                my="1"
                onChange={(state) => toggleMonth(state, "Jun")}
              >
                Jun
              </Checkbox>
            </Box>
            <Box mr={4}>
              <Checkbox
                value="Jul"
                my="1"
                onChange={(state) => toggleMonth(state, "Jul")}
              >
                Jul
              </Checkbox>
            </Box>
            <Box mr={4}>
              <Checkbox
                value="Aug"
                my="1"
                onChange={(state) => toggleMonth(state, "Aug")}
              >
                Aug
              </Checkbox>
            </Box>
            <Box mr={4}>
              <Checkbox
                value="Sep"
                my="1"
                onChange={(state) => toggleMonth(state, "Sep")}
              >
                Sep
              </Checkbox>
            </Box>
            <Box mr={4}>
              <Checkbox
                value="Oct"
                my="1"
                onChange={(state) => toggleMonth(state, "Oct")}
              >
                Oct
              </Checkbox>
            </Box>
            <Box mr={4}>
              <Checkbox
                value="Nov"
                my="1"
                onChange={(state) => toggleMonth(state, "Nov")}
              >
                Nov
              </Checkbox>
            </Box>
            <Box mr={4}>
              <Checkbox
                value="Dec"
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
  );
}
