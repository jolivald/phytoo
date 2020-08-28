import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Appbar } from 'react-native-paper';
import { expo } from './app.json';
import TopBar from './components/TopBar';
// import logo from './assets/favicon_48x48.png'; 

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#008900'
  }
}

// StatusBar style= A string, either: 'auto', 'inverted', 'light', or 'dark'.
export default function App() {
  return (
    <PaperProvider theme={customTheme}>
      <View>
        <StatusBar style="light" hidden={false} />
        <TopBar />
        <Text>Open up App.js to start working on your app ... !!!</Text>
      </View>
    </PaperProvider>
  );
};

AppRegistry.registerComponent(expo.name, () => App);
