import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Text, Box, extendTheme, Heading, HStack, Divider, Center, Icon, Input, VStack, ScrollView} from "native-base";
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
                
                    <Heading size={"xl"} paddingTop={"2"}>
                        Recommended for You
                    </Heading>
                    
                    <ScrollView horizontal={true}
                    _contentContainerStyle={{ flexGrow: 1 }}>
                        {PlanView()}
                        {PlanView()}
                        {PlanView()}
                        {PlanView()}

                    </ScrollView>
                </VStack>
            </SafeAreaView>    
        </NativeBaseProvider>
    );
}
