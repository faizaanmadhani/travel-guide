import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Text, Box, extendTheme } from "native-base";

import explorePage from "./src/pages/explore";

export default function App() {
  return (
    <NativeBaseProvider>
      {explorePage()}
    </NativeBaseProvider>
  );
}

