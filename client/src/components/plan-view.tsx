import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Text, Box, extendTheme, Center, Image, HStack, VStack, Container } from "native-base";
import { Entypo } from '@expo/vector-icons';
import { UserProvider } from "../../../server/src/provider"
import { gql, useQuery, ApolloProvider } from "@apollo/client";
import { client } from "../../App";

// export function FetchPlan()
// {
//     const { loading, error, data } = useQuery(gql`query {
//         plans {
//           name
//           description
//           creator {
//             name
//             id
//             email
//             profile_pic
//           }
//         }
//       }`)
//     return (
//         <Text>
            
//         {data.name}
//         </Text>
//     );
// }


// "condensed" view of travel plan, used on home page etc.
export default function PlanView() {
    return (
        <NativeBaseProvider>
                <Container bg="tertiary.300" width={'90%'} flexGrow={'1'}>
                    <Center>
                        <HStack>
                            <Image source={{
                                uri: "https://prod-virtuoso.dotcmscloud.com/dA/188da7ea-f44f-4b9c-92f9-6a65064021c1/heroImage1/PowerfulReasons_hero.jpg"
                                }} alt="Alternate Text" size="xl" />
                            <VStack paddingLeft={'2'}>
                                <Box bg="secondary.200">
                                    Tag 1
                                </Box>
                                <Box bg="secondary.200">
                                    Tag 2
                                </Box>
                                <Box bg="secondary.200">
                                    Tag 3
                                </Box>
                            </VStack>
                        </HStack>
                        <HStack>
                            <Text paddingRight={'2'}>
                                Name of Travel Plan
                            </Text>
                            <Center>
                                <Entypo name="dots-three-horizontal" size={24} color="black" />
                            </Center>
                        </HStack>
                    </Center>
                </Container>    
        </NativeBaseProvider>
    );
}
