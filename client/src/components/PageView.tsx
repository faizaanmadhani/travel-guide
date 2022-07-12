import React from "react";
import { Center, Container } from "native-base";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function PageView({ children }) {
  const { height } = useWindowDimensions();
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView>
      <Center maxH={height - (tabBarHeight + insets.top)} p="4">
        {children}
      </Center>
    </SafeAreaView>
  );
}
