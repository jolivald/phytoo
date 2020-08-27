import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider, Appbar } from 'react-native-paper';
import { expo } from './app.json';
import Navbar from './components/Navbar';
import logo from './assets/favicon_48x48.png'; 

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Appbar style={{ width: "100%" }}>
          <Appbar.Action icon={logo} onPress={() => {}}/>
          <Appbar.Content title="Phytoo" subtitle={'Tout naturellement'} />
          <Appbar.Action icon="magnify" onPress={() => {}} />
        </Appbar>
        <Text>Open up App.js to start working on your app!!!</Text>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
};

AppRegistry.registerComponent(expo.name, () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
  },
});
