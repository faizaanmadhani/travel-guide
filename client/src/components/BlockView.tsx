import React from "react";
import { Box, HStack, Text, Stack, Image, IconButton } from "native-base";
import OptionsMenu from "react-native-option-menu";
import { Feather } from "@expo/vector-icons";

export type IBlockProps = {
  location: string;
  title: string;
  description?: string;
  assets?: string[];
  budget: number;
  links: string[];
  navigation: any;
};

export default function BlockView({ props }: { props: IBlockProps }) {
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
    <Box bg="tertiary.300" borderWidth="1">
      <Stack>
        <HStack justifyContent="space-between">
          <Text bold fontSize="14px" width="70%">
            props.title
          </Text>
          <OptionsMenu
            button={<Feather name="more-vertical" size={24} color="black" />}
            buttonStyle={{
              width: 32,
              height: 8,
              margin: 7.5,
              resizeMode: "contain",
            }}
            destructiveIndex={1}
            options={["Edit", "Cancel"]}
            actions={[EditBlock]}
            width="10%"
          />
        </HStack>
        <Image
          source={{
            uri: props.assets[0],
          }}
          alt="Alternate Text"
          size="md"
        />
        <Text>{convertBudgetToString(props.budget)}</Text>
        <Text>{props.description}</Text>
      </Stack>
    </Box>
  );
}
