import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Appbar } from 'react-native-paper';
import { expo } from './app.json';
import TopBar from './components/TopBar';
import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';
import ResultScreen from './components/ResultScreen';
// import logo from './assets/favicon_48x48.png';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#008900'
  }
};

const Stack = createStackNavigator();

// StatusBar style= A string, either: 'auto', 'inverted', 'light', or 'dark'.
export default function App() {
  return (<>
    <PaperProvider theme={customTheme}>
      <NavigationContainer>
        <Stack.Navigator
          headerMode="screen"
          screenOptions={{
            header: props => (<TopBar {...props} />)
          }}
        >
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="search" component={SearchScreen} />
          <Stack.Screen name="result" component={ResultScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    <StatusBar style="light" hidden={false} />
  </>);
};

AppRegistry.registerComponent(expo.name, () => App);
