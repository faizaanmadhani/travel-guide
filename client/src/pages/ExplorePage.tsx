import React from "react";
import { useWindowDimensions } from "react-native";
import { Box, useDisclose } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import ExplorePlans from "../components/explore/ExplorePlans";
import Filters from "../components/Filters";

export default function ExplorePage() {
  const { isOpen, onOpen, onClose } = useDisclose();

  return <Box>{ExplorePlans()}</Box>;
}
