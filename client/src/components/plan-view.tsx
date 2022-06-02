import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Text, Box, extendTheme, Center, Image, HStack, VStack } from "native-base";
import { Entypo } from '@expo/vector-icons';
import { UserProvider } from "../../../server/src/provider"

// "condensed" view of travel plan, used on home page etc.
export default function PlanView() {
    return (
        <NativeBaseProvider>
            <Center>
                <Box bg="tertiary.300" width={'90%'}>
                    <Center>
                        <HStack>
                            <Image source={{
                                uri: "https://prod-virtuoso.dotcmscloud.com/dA/188da7ea-f44f-4b9c-92f9-6a65064021c1/heroImage1/PowerfulReasons_hero.jpg"
                                }} alt="Alternate Text" size="xl" />
                            <VStack>
                                <Box bg="secondary.200">
                                    Tag 1
                                </Box>
                                <Box bg="secondary.200">
                                    Tag 2
                                </Box>
                                <Box bg="secondary.200">
                                    Tag 3
                                </Box>
                                <Entypo name="dots-three-horizontal" size={24} color="black" />
                            </VStack>
                        </HStack>
                       
                            Name of Travel Plan
                    </Center>
                </Box>     
            </Center>
        </NativeBaseProvider>
    );
}
