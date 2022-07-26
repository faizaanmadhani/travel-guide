import React from "react";
import {
  Stack,
  Heading,
  Text,
  Box,
  Image,
  HStack,
  AspectRatio,
  IconButton,
  FavouriteIcon,
  Pressable,
} from "native-base";
import { gql, useMutation } from "@apollo/client";

export const UPDATE_WISHLIST = gql`
  mutation updateWishlist($input: AddWishlistPlanInput!) {
    updateWishlistPlan(input: $input) {
      id
      name
      wishlistPlans
    }
  }
`;

// props: plan, userID, size: "sm" or "lg"
//   plan: PlanView_Data,
//   updateWishlist: Function,
//   userID: String,
//   size: String,
export default function PlanCardSmall(props) {
  const [updateWishlist, { data: data, loading: loading, error: error }] =
    useMutation(UPDATE_WISHLIST, { refetchQueries: [] });

  if (loading) console.log("Loading...");
  if (error) console.log(`Error! ${error.message}`);

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

  function UpdateWishlist() {
    if (true) {
      console.log(
        updateWishlist({
          variables: { input: { userID: props.userID, planID: props.plan.id } },
        })
      );
    } else {
      // removeWishlist({variables : {input : {userID : userID, planID : plan.id}}})
    }
  }

  return (
    <Pressable
      onPress={() => {
        props.navigation.navigate("View Plan", { planId: props.plan.id });
      }}
    >
      <Box
        maxW={props.size === "sm" ? "260" : null}
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
          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <Heading size="sm" ml="-1">
              {props.plan.name}
            </Heading>

            <IconButton
              icon={<FavouriteIcon />}
              borderRadius="full"
              _icon={{ color: "red.100" }}
              _pressed={{
                _icon: {
                  color: "red.400",
                },
              }}
              onPress={() => {
                UpdateWishlist();
              }}
            />
          </HStack>

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
            fontStyle="italic"
          >
            {displayCountries(props.plan.countries)}
          </Text>
          <Text
            fontSize="xs"
            _light={{
              color: "gray.800",
            }}
            _dark={{
              color: "gray.800",
            }}
            fontWeight="600"
            ml="-0.5"
            mt="-1"
          >
            {props.plan.rating} STARS {"\u2022"}{" "}
            {displayBudget(props.plan.budget)}
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
          <Text fontWeight="400">{props.plan.description}</Text>
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
              {props.plan.tags[0] ? props.plan.tags[0] : null}
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
              {props.plan.tags[1] ? props.plan.tags[1] : null}
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
              {props.plan.tags[2] ? props.plan.tags[2] : null}
            </Box>
          </HStack>
        </Stack>
      </Box>
    </Pressable>
  );
}
