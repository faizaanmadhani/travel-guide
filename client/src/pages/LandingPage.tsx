import React from "react";
import { useWindowDimensions, ImageBackground } from "react-native";
import { NativeBaseProvider, Button, SunIcon, Text, Box, Icon, extendTheme, Center, Image, HStack, VStack, Container, AspectRatio, Divider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExplorePage from "./ExplorePage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import PageView from "../components/PageView";

const Stack = createNativeStackNavigator();

export default function LandingPage({ navigation }) {
    <Stack.Navigator>
        <Stack.Screen name="Explore" component={ExplorePage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Login" component={LoginPage} />
    </Stack.Navigator>

    return (
        <PageView>
        <ImageBackground
        source={{uri:"https://prod-virtuoso.dotcmscloud.com/dA/188da7ea-f44f-4b9c-92f9-6a65064021c1/heroImage1/PowerfulReasons_hero.jpg"}}
        imageStyle={{opacity:0.5}}>
        <Center h={1.2 * useWindowDimensions().height}>
            <VStack h={useWindowDimensions().height}>
                <Box h={0.9 * useWindowDimensions().height}>
                </Box>
                <HStack>
                    <Box>
                        <Button height={0.08 * useWindowDimensions().height}
                                width={0.5 * useWindowDimensions().width}
                                variant="subtle" colorScheme="primary"
                                onPress={() => navigation.navigate("Login")}>
                            Log In
                        </Button>
                    </Box>

                    <Box>
                        <Button height={0.08 * useWindowDimensions().height}
                                width={0.5 * useWindowDimensions().width}
                                variant="solid" colorScheme="primary"
                                onPress={() => navigation.navigate("Register")}>
                            Register
                        </Button>
                    </Box>
                </HStack>
            </VStack>
        </Center>
        </ImageBackground>
        </PageView>
    );
}