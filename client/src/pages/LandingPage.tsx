import React from "react";
import { NativeBaseProvider, Button, SunIcon, Text, Box, Icon, extendTheme, Center, Image, HStack, VStack, Container, AspectRatio, Divider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExplorePage from "./ExplorePage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";

const Stack = createNativeStackNavigator();

export default function LandingPage({ navigation }) {
    <Stack.Navigator>
        <Stack.Screen name="Explore" component={ExplorePage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Login" component={LoginPage} />
    </Stack.Navigator>

    return (
        <Center>
            <VStack>
            <HStack>
                <Box>
                    <Button size={"md"} variant="outline" colorScheme="primary"
                            onPress={() => navigation.navigate("Login")}>
                        Log In
                    </Button>
                </Box>

                <Box>
                    <Button size={"md"} variant="solid" colorScheme="primary"
                            onPress={() => navigation.navigate("Register")}>
                        Register
                    </Button>
                </Box>
            </HStack>
        </VStack>
        </Center>  
    );
}