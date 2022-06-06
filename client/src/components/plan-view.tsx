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

// "condensed" view of travel plan, used on home page etc.
export default function PlanView() {
    const { loading, error, data } = useQuery(GET_PLANS);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const plan_name = data.plans[0].name;
    const plan_tags = data.plans[0].tags;
    const plan_rating = data.plans[0].rating;
    const plan_budget = data.plans[0].budget;
    const plan_description = data.plans[0].description;

    let plan_budget_display = "" as String;
    for (let i = 0; i < plan_budget; i++) {
        plan_budget_display = plan_budget_display.concat("$".toString());
    }      

    return (
        <NativeBaseProvider>
            <Box bg="tertiary.300" borderWidth="1" width={"80%"} >
                <VStack width={'100%'}>
                    <HStack alignItems={'center'} width={'100%'}>
                        <Box width={'70%'}>
                        <Image source={{
                            uri: "https://prod-virtuoso.dotcmscloud.com/dA/188da7ea-f44f-4b9c-92f9-6a65064021c1/heroImage1/PowerfulReasons_hero.jpg"
                            }} alt="Alternate Text" width={'100%'} height={"120"} />
                        
                        </Box>
                        
                        <VStack space={1} alignItems={"center"} width={'30%'}>
                            <Box bg="secondary.200">
                                <Text>
                                    {plan_tags[0]}
                                </Text>
                            </Box>
                            <Box bg="secondary.200">
                                <Text>
                                    {plan_tags[1]}
                                </Text>
                            </Box>
                            <Box bg="secondary.200">
                                <Text>
                                    {plan_tags[2]}
                                </Text>
                            </Box>
                        </VStack>
                    </HStack>
                    <HStack width={'80%'}>
                        <Text bold width={'100%'} alignSelf={'center'} fontSize={"lg"}>
                            {plan_name}
                        </Text>             
                    </HStack>
                    
                    <HStack width={'80%'}>
                        <Text width={'100%'} alignSelf={'center'}>
                            {plan_rating}/5
                        </Text>
                        <Text width={'100%'} alignSelf={'center'}>
                            {plan_budget_display}
                        </Text>                     
                    </HStack>

                    <Box width={'80%'}>
                        <Text width={'100%'} alignSelf={'center'}>
                            {plan_description}
                        </Text>             
                    </Box>
                </VStack>
            </Box>    
        </NativeBaseProvider>
    );
}
