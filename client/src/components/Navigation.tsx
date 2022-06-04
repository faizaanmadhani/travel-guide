import React, { ReactNode, ReactPropTypes } from "react";
import {
  NativeBaseProvider,
  Text,
  Box,
  Center,
  HStack,
  Pressable,
  Icon,
} from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Layout() {
  const [selected, setSelected] = React.useState(1);

  type RootStackParamList = {
    Explore: undefined;
    Travel: undefined;
    Wishlist: undefined;
    Profile: undefined;
  };
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <NativeBaseProvider>
      <Box
        flex={1}
        bg="white"
        safeAreaTop
        width="100%"
        minW="200px"
        alignSelf="center"
      >
        <Center flex={1}></Center>
        <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
          {/* <Pressable
            opacity={selected === 0 ? 1 : 0.5}
            py="3"
            flex={1}
            onPress={() => {
              setSelected(0);
              navigation.navigate("Explore");
            }}
          >
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={selected === 0 ? "home" : "home-outline"}
                  />
                }
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Explore
              </Text>
            </Center>
          </Pressable> */}
          <Pressable
            opacity={selected === 1 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => {
              setSelected(1);
              navigation.navigate("Travel");
            }}
          >
            <Center>
              <Icon
                mb="1"
                as={<MaterialIcons name="search" />}
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Travel
              </Text>
            </Center>
          </Pressable>
          <Pressable
            opacity={selected === 2 ? 1 : 0.6}
            py="2"
            flex={1}
            onPress={() => {
              setSelected(2);
              navigation.navigate("Wishlist");
            }}
          >
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={selected === 2 ? "cart" : "cart-outline"}
                  />
                }
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Wishlist
              </Text>
            </Center>
          </Pressable>
          <Pressable
            opacity={selected === 3 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => {
              setSelected(3);
              navigation.navigate("Profile");
            }}
          >
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={selected === 3 ? "account" : "account-outline"}
                  />
                }
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Profile
              </Text>
            </Center>
          </Pressable>
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
}
