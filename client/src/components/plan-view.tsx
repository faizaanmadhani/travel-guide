import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Text, Box, extendTheme, Center, Image, HStack, VStack, Container, AspectRatio, Divider } from "native-base";
import { Entypo } from '@expo/vector-icons';
import { UserProvider } from "../../../server/src/provider"
import { gql, useQuery, ApolloProvider } from "@apollo/client";
import { client } from "../../App";

// "condensed" view of travel plan, used on home page etc.
export default function PlanView() {
    return (
        <NativeBaseProvider>
            <Box bg="tertiary.300" borderWidth="1" width={"80%"} >
                <VStack width={'100%'}>
                    <HStack alignItems={'center'} width={'100%'}>
                        <Box width={'70%'}>
                        <Image source={{
                            uri: "https://prod-virtuoso.dotcmscloud.com/dA/188da7ea-f44f-4b9c-92f9-6a65064021c1/heroImage1/PowerfulReasons_hero.jpg"
                            }} alt="Alternate Text" width={'100%'} height={'80%'} />
                        
                        </Box>
                        
                        <VStack space={1} alignItems={"center"} width={'30%'}>
                            <Box bg="secondary.200">
                                <Text>
                                    Tag 1
                                </Text>
                            </Box>
                            <Box bg="secondary.200">
                                <Text>
                                    Tag 2
                                </Text>
                            </Box>
                            <Box bg="secondary.200">
                                <Text>
                                    Tag 3
                                </Text>
                            </Box>
                        </VStack>
                    </HStack>
                    <HStack width={'80%'}>
                        <Text width={'100%'} alignSelf={'center'}>
                            Travel Plan Name
                        </Text>
                        <Box alignSelf={"center"}>
                            <Entypo name="dots-three-horizontal" size={24} color="black" /> 
                        </Box>
                                                    
                    </HStack>
                </VStack>
            </Box>    
        </NativeBaseProvider>
    );
}
