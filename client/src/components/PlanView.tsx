import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Button, SunIcon, Text, Box, Icon, extendTheme, Center, Image, HStack, VStack, Container, AspectRatio, Divider } from "native-base";
import { Entypo } from '@expo/vector-icons';
import { UserProvider } from "../../../server/src/provider"
import { gql, useQuery, ApolloProvider } from "@apollo/client";
import { client } from "../../App";

export const GET_PLANS = gql`query GetPlan {
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
      countries
      months
    }
  }`;

export type PlanView_Data = {
    name : String;
    budget: number;
    rating: number;
    tags: String[];
    description: String;
    countries: String[];
    months: String[];
};

// card view of travel plan, used on home page etc.
export default function PlanView(plan : PlanView_Data) {
    const plan_name = plan.name;
    const plan_tags = plan.tags;
    const plan_rating = plan.rating;
    const plan_budget = plan.budget;
    const plan_description = plan.description;
    const plan_countries = plan.countries;
    const plan_months = plan.months;

    let plan_budget_display = "" as String;
    for (let i = 0; i < plan_budget; i++) {
        plan_budget_display = plan_budget_display.concat("$".toString());
    }    
    
    let plan_labels= []
    let plan_tags_display = []
    for (let i = 0; i < 3; i++) {
        if (plan_countries[i] != undefined)
        {
            plan_labels.push(
                <Box key={i} bg="success.100" rounded="lg" justifyContent="center">
                    <Text ml={"1"} mr={"1"}>
                            {plan_countries[i]}
                    </Text>
                </Box>
            );
        }
    }
    for (let i = 0; i < 3; i++) {
        if (plan_months[i] != undefined)
        {
            plan_labels.push(
                <Box key={i+3} bg="info.100" rounded="lg" justifyContent="center">
                    <Text ml={"1"} mr={"1"}>
                            {plan_months[i]}
                    </Text>
                </Box>
            );
        }
    }
    for (let i = 0; i < 6; i++) {
        if (plan_tags[i] != undefined)
        {
            plan_tags_display.push(
                <Box key={i} bg="orange.100" rounded="lg" justifyContent="center">
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
                <VStack width={'100%'} ml={"1.5"} mr={"1"}>
                    
                    <HStack width={'100%'} mb={"1"} mt={"1"} mr={"1"} justifyContent="space-between">
                        <Text bold alignSelf={'center'} fontSize={"lg"}>
                            {plan_name}
                        </Text>      
                        <Icon as={Entypo} name={"dots-three-horizontal"} size={"lg"} color={"black"} mr={"3"} alignSelf={'baseline'}/> 
                    </HStack>
                    
                    <HStack width={"95%"} mb={"1"} mt={"1"} justifyContent="space-between">
                        <HStack justify-content={"start"} space={2}>
                            <Box bg="yellow.100" rounded="lg" justifyContent="center">
                                <Text alignSelf={'center'} ml={"1"} mr={"1"}>
                                    {plan_rating}/5
                                    {/* <SunIcon color={"black"} alignSelf={'baseline'} ml={"1"} mr={"1"}/>  */}
                                </Text>
                            </Box>
                            <Box bg="red.100" rounded="lg" justifyContent="center">
                                <Text  alignSelf={'center'} ml={"1"} mr={"1"}>
                                    {plan_budget_display}
                                </Text>
                            </Box>
                        </HStack>
                        
                        <Text justifyContent={"center"}>
                            Last Updated: Jun 6, 2022
                        </Text>                     
                    </HStack>

                    
                    <Center width={'100%'} justifyContent={'center'} ml={"-1.5"} mb={"1"} mt={"1"}>
                        <Image rounded="lg" source={{
                            uri: "https://prod-virtuoso.dotcmscloud.com/dA/188da7ea-f44f-4b9c-92f9-6a65064021c1/heroImage1/PowerfulReasons_hero.jpg"
                            }} alt="Alternate Text" height={"120"} width={"325"} resizeMode={"contain"} alignSelf={"center"}/>
                    </Center>

                    <Box width={'90%'} mb={"1"} mt={"1"}>
                        <Text numberOfLines={2} ellipsizeMode='tail' width={'100%'} alignSelf={'center'} ml={"1.5"} mr={"1.5"}>
                            {plan_description}
                        </Text>             
                    </Box>
                    <HStack space={1} alignItems={"center"} width={'30%'} mb={"2"} mt={"1"}>
                        {plan_labels}
                    </HStack>
                    
                    <HStack space={1} alignItems={"center"} width={'30%'} mb={"2"} mt={"1"}>
                        {plan_tags_display}
                    </HStack>
                </VStack>
            </Box>    
        </NativeBaseProvider>
    );
}
