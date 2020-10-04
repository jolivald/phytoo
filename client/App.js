import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { expo } from './app.json';
import TopBar from './components/TopBar';
import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';
import PlantScreen from './components/PlantScreen';
import GenusScreen from './components/GenusScreen';
import EffectScreen from './components/EffectScreen';
import VernacularScreen from './components/VernacularScreen';
import ImageScreen from './components/ImageScreen';
import CguScreen from './components/CguScreen';

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#008900'
  }
};

const Stack = createStackNavigator();

console.disableYellowBox = true;

export default function App() {
  return (<>
    <PaperProvider theme={customTheme}>
      <NavigationContainer>
        <Stack.Navigator
          headerMode="screen"
          screenOptions={{
            header: props => (<TopBar { ...props} />)
          }}
        >
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="search" component={SearchScreen} />
          <Stack.Screen name="plant" component={PlantScreen} />
          <Stack.Screen name="genus" component={GenusScreen} />
          <Stack.Screen name="effect" component={EffectScreen} />
          <Stack.Screen name="vernacular" component={VernacularScreen} />
          <Stack.Screen name="image" component={ImageScreen} />
          <Stack.Screen name="cgu" component={CguScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    <StatusBar style="light" hidden={false} />
  </>);
};

AppRegistry.registerComponent(expo.name, () => App);
