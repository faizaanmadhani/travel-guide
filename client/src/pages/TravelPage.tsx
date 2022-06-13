import React from "react";
import {
  Box,
  AspectRatio,
  Image,
  Center,
  Stack,
  Heading,
  Text,
  HStack,
  VStack,
  ScrollView,
  Input,
  IconButton
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";

const styles = {
  screenLayout: {
    margin: "1rem",
  },
  travelPlan: {
    marginBottom: "1rem",
  },
};

const travelPlan = (
  <VStack marginBottom={"1"}>
    <Box alignItems="center">
      <Box
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
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
              }}
              alt="image"
            />
          </AspectRatio>
          <Center
            bg="violet.500"
            _dark={{
              bg: "violet.400",
            }}
            _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "xs",
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5"
          >
            3 WEEKS
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              Toronto Tours for First-time Visitors
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              Created by Emily
            </Text>
          </Stack>
          <Text fontWeight="400">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="400"
              >
                6 mins ago
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  </VStack>
);

export default function TravelPage({ navigation }: { navigation: any}) {
  return (
    <SafeAreaView>
      <VStack >
      <Box alignItems="flex-start">
        <HStack justifyContent="space-between">
      <Input mx="3" placeholder="Search Travel Plans" w="70%" />
      <IconButton icon={<AntDesign name="filter" size={25} color="#CCD2E3" />} />
      <IconButton icon={<AntDesign name="pluscircle" size={25} color="#06B6D4" />} onPress={() => navigation.navigate('Create Travel Plan')}/>
      </HStack>
    </Box>
        </VStack>
    <VStack margin={"1"}>
      {travelPlan}
      {travelPlan}
    </VStack>
    </SafeAreaView>
  );
}
