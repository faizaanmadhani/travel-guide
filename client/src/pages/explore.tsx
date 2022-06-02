import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Text, Box, extendTheme, Heading, HStack, Divider} from "native-base";
import PlanView from "../components/plan-view";

export default function explorePage() {
    return (
        <NativeBaseProvider>
            <Heading size={"3xl"} paddingTop={"10"}> Explore </Heading>
            <Divider my={2}/>
            <HStack space={3} alignItems="center">
                {PlanView()}
            </HStack>     
        </NativeBaseProvider>
    );
}
