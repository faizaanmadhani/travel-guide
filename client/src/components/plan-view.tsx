import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Text, Box, extendTheme, Center } from "native-base";
import { UserProvider } from "../../../server/src/provider"

// "condensed" view of travel plan, used on home page etc.
export default function PlanView() {
    return (
        <NativeBaseProvider>
            <Center>
                <Box bg="tertiary.300" width={'90%'}>
                    <Center>
                        I am a travel plan
                    </Center>
                </Box>     
            </Center>
        </NativeBaseProvider>
    );
}
