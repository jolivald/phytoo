import React, { useReducer } from 'react';
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

// StatusBar style= A string, either: 'auto', 'inverted', 'light', or 'dark'.

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#008900'
  }
};

const Stack = createStackNavigator();
const initialState = {

};
const reducerState = (state, action) => {
  switch (action.type){
    case 'search':
      console.log('search!');
      break;
  }
  return state;
};

export default function App() {
  const [state, dispatch] = useReducer(reducerState, initialState);
  return (<>
    <PaperProvider theme={customTheme}>
      <NavigationContainer>
        <Stack.Navigator
          headerMode="screen"
          screenOptions={{
            header: props => (<TopBar { ...props} />)
          }}
        >
          <Stack.Screen name="home" component={HomeScreen} initialParams={{ dispatch }} />
          <Stack.Screen name="search" component={SearchScreen} initialParams={{ dispatch }} />
          <Stack.Screen name="plant" component={PlantScreen} initialParams={{ dispatch }} />
          <Stack.Screen name="genus" component={GenusScreen} initialParams={{ dispatch }} />
          <Stack.Screen name="effect" component={EffectScreen} initialParams={{ dispatch }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    <StatusBar style="light" hidden={false} />
  </>);
};

AppRegistry.registerComponent(expo.name, () => App);
