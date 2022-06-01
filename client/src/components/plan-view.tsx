import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Text, Box, extendTheme, Center } from "native-base";

// "condensed" view of travel plan, used on home page etc.
export default function PlanView() {
    return (
      <NativeBaseProvider>
        <Box bg="tertiary.300" p={"3"}>
            <Center>
                I am a travel plan
            </Center>
        </Box>     
      </NativeBaseProvider>
    );
}
