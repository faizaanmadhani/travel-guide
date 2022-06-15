import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Text, Box, extendTheme, Center, Image, HStack, VStack, Container, AspectRatio, Divider } from "native-base";
import { Entypo } from '@expo/vector-icons';
import { UserProvider } from "../../../server/src/provider"
import { gql, useQuery, ApolloProvider } from "@apollo/client";
import { client } from "../../App";

const GET_PLANS = gql`query GetPlan {
    plans {
      id
      name
      creator {
        id
        name
      }
      rating
      budget
      description
      tags
    }
  }`;

// card view of travel plan, used on home page etc.
export default function PlanView(idx : number) {
    const { loading, error, data } = useQuery(GET_PLANS);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const plan_name = data.plans[idx].name;
    const plan_tags = data.plans[idx].tags;
    const plan_rating = data.plans[idx].rating;
    const plan_budget = data.plans[idx].budget;
    const plan_description = data.plans[idx].description;

    let plan_budget_display = "" as String;
    for (let i = 0; i < plan_budget; i++) {
        plan_budget_display = plan_budget_display.concat("$".toString());
    }    
    
    let plan_tags_display = []
    for (let i = 0; i < 10; i++) {
        if (plan_tags[i] != undefined)
        {
            plan_tags_display.push(
                <Box key={i} bg="secondary.200" rounded="lg">
                    <Text ml={"1"} mr={"1"}>
                            {plan_tags[i]}
                    </Text>
                </Box>
            );
        }
    }

    return (
        <NativeBaseProvider>
            <Box bg="white" rounded="lg" overflow="hidden" borderWidth="0" width={"80%"} shadow={"2"}>
                <VStack width={'100%'}>
                    
                    <HStack width={'80%'}>
                        <Text bold width={'100%'} alignSelf={'center'} fontSize={"lg"} ml={"1"}>
                            {plan_name}
                        </Text>             
                    </HStack>
                    
                    <HStack width={'80%'}>
                        <Text width={'20%'} alignSelf={'center'}>
                            {plan_rating}/5
                        </Text>
                        <Text width={'20%'} alignSelf={'center'}>
                            {plan_budget_display}
                        </Text>
                        <Text width={'110%'} alignSelf={'center'}>
                            Last Updated: Jun 6, 2022
                        </Text>                     
                    </HStack>

                    <HStack alignItems={'center'} width={'100%'}>
                        <Box width={'100%'}>
                        <Image source={{
                            uri: "https://prod-virtuoso.dotcmscloud.com/dA/188da7ea-f44f-4b9c-92f9-6a65064021c1/heroImage1/PowerfulReasons_hero.jpg"
                            }} alt="Alternate Text" width={'100%'} height={"120"} />
                        
                        </Box>
                    </HStack>

                    <Box width={'100%'}>
                        <Text width={'100%'} alignSelf={'center'} ml={"1"}>
                            {plan_description}
                        </Text>             
                    </Box>
                    <HStack space={1} alignItems={"center"} width={'30%'} ml={"1"} mb={"1"}>
                        {plan_tags_display}
                    </HStack>
                </VStack>
            </Box>    
        </NativeBaseProvider>
    );
}
