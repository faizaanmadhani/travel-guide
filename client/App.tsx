import React from "react";
import { render } from 'react-dom';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Text, Box, extendTheme } from "native-base";
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";

import explorePage from "./src/pages/explore";

const client = new ApolloClient({
    uri: 'mongodb://localhost:27017',
    cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider>
        {explorePage()}
      </NativeBaseProvider>
    </ApolloProvider>
  );
}
