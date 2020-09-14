import React from 'react';
import { FAB } from 'react-native-paper';
import ScreenTitle from './ScreenTitle';

const HomeScreen = ({ navigation }) => {
  const handlePress = event => {
    navigation.navigate('search');
  };
  return (<>
    <ScreenTitle label="Bienvenue" />
    <FAB
      icon="magnify"
      onPress={handlePress}
      accessibilityLabel="Rechercher"
      style={{
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#008900'
      }}
    />
  </>);
};

export default HomeScreen;
