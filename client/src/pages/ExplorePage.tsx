import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { NativeBaseProvider, Text, Box, extendTheme, Heading, HStack, Divider, Center, Icon, Input, VStack, ScrollView, Hidden } from "native-base";
import {  SafeAreaView, SafeAreaProvider, SafeAreaInsetsContext, useSafeAreaInsets,initialWindowMetrics } from 'react-native-safe-area-context';
  
import PlanView from "../components/plan-view";

export default function ExplorePage() {
    return (
        <NativeBaseProvider>
            <SafeAreaView style={{ flex : 1}}>
                <VStack width={"90%"} alignSelf={'center'}>
                    <Input
                        placeholder="Search"
                        variant="filled"
                        borderRadius="10"
                        py="1"
                        px="2"
                        borderWidth="0"
                    />
                
                    <Heading size={"xl"}>
                        Recommended for You
                    </Heading>
                    
                   
                     <ScrollView horizontal={true} minH={"180"} _contentContainerStyle={{ p : "2px"}}>
                        <Box maxW={ useWindowDimensions().width }>
                            {PlanView()}
                        </Box>
                        <Box maxW={ useWindowDimensions().width }>
                            {PlanView()}
                        </Box>
                        <Box maxW={ useWindowDimensions().width }>
                            {PlanView()}
                        </Box>
                    </ScrollView>
                </VStack>
            </SafeAreaView>    
        </NativeBaseProvider>
    );
}
