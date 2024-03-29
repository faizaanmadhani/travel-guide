import React from "react";
import {
  Stack,
  Heading,
  Text,
  Box,
  Image,
  HStack,
  AspectRatio,
} from "native-base";
import { Pressable } from "react-native";

export type PlanView_Data = {
  id: String;
  name: String;
  budget: number;
  rating: number;
  tags: String[];
  description: String;
  countries: String[];
  months: String[];
};

export default function PlanView(plan: PlanView_Data, navigation?: any) {
  const displayBudget = (budget: Number) => {
    let dollarSigns = "";

    for (let i = 0; i < budget; i++) {
      dollarSigns = dollarSigns + "$";
    }

    return dollarSigns;
  };

  const displayCountries = (countries: Array<String>) => {
    if (countries.length) {
      let countriesList = "";

      for (let i = 0; i < countries.length; i++) {
        if (i !== 0) {
          countriesList = countriesList + " " + "\u2022" + " ";
        }

        countriesList = countriesList + countries[i];
      }

      return countriesList;
    } else {
      return "No Countries";
    }
  };

  return (
    <Box
      maxW="260"
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700",
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: "gray.50",
      }}
    >
      <Stack p="5" space={3}>
        {/* <Stack space={2}> */}
        <Heading size="sm" ml="-1">
          {plan.name}
        </Heading>
        <Text
          fontSize="xs"
          _light={{
            color: "gray.800",
          }}
          _dark={{
            color: "gray.800",
          }}
          fontWeight="500"
          ml="-0.5"
          mt="-1"
        >
          {displayCountries(plan.countries)}
        </Text>
        <Text
          fontSize="xs"
          _light={{
            color: "gray.800",
          }}
          _dark={{
            color: "gray.800",
          }}
          fontWeight="500"
          ml="-0.5"
          mt="-1"
        >
          {plan.rating} Stars {"\u2022"} {displayBudget(plan.budget)}
        </Text>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Text fontWeight="400">{plan.description}</Text>
        <HStack>
          <Box
            backgroundColor={"violet.600"}
            p="1"
            m="1"
            rounded="xs"
            _text={{
              fontSize: "xs",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {plan.tags[0] ? plan.tags[0] : null}
          </Box>
          <Box
            backgroundColor={"violet.600"}
            p="1"
            m="1"
            rounded="xs"
            _text={{
              fontSize: "xs",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {plan.tags[1] ? plan.tags[1] : null}
          </Box>
          <Box
            backgroundColor={"violet.600"}
            p="1"
            m="1"
            rounded="xs"
            _text={{
              fontSize: "xs",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {plan.tags[2] ? plan.tags[2] : null}
          </Box>
          {/* <Box
              backgroundColor={"violet.600"}
              p="1"
              m="1"
              rounded="xs"
              _text={{
                fontSize: "xs",
                fontWeight: "bold",
                color: "white",
              }}
            >
              +
            </Box> */}
        </HStack>
      </Stack>
    </Box>
  );
}
