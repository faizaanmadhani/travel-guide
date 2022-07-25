import React from "react";
import {
  Box,
  HStack,
  Text,
  Stack,
  Image,
  IconButton,
  Center,
  AspectRatio,
  Heading,
} from "native-base";
import OptionsMenu from "react-native-option-menu";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export type IBlockProps = {
  location: string;
  title: string;
  description?: string;
  assets?: string[];
  budget: number;
  links: string[];
  navigation: any;
  imageUrl: string;
};

export default function BlockView(props: IBlockProps) {
  console.log("the props here", props);
  const EditBlock = () => {
    props.navigation.navigate("Edit Block", {
      fields: props,
    });
  };

  const convertBudgetToString = (val: number) => {
    let dollarSign = "$";
    let multiDollarSign = dollarSign.repeat(val);
    return multiDollarSign;
  };
  return (
    <Box
      maxW="400"
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
      marginTop={3}
      marginBottom={3}
    >
      <Stack p="5" space="2">
        <HStack justifyContent="space-between">
          <Heading size="lg" ml="-1">
            {props.title}
          </Heading>
          <IconButton
            mr="0"
            variant="ghost"
            size={6}
            backgroundColor="blue"
            icon={<AntDesign name="edit" />}
            onPress={EditBlock}
          />
        </HStack>
        <Heading size="sm" ml="-1">
          {props.location}
        </Heading>
        <AspectRatio w="100%" ratio={16 / 9}>
          <Image
            source={{
              uri: props.imageUrl,
            }}
            alt="image"
          />
        </AspectRatio>
        <Text
          fontSize="sm"
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
          {convertBudgetToString(props.budget)}
        </Text>
        <Text>{props.description}</Text>
      </Stack>
    </Box>
  );
}
