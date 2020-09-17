import React from 'react';
import { FAB } from 'react-native-paper';
import ScreenWrapper from './ScreenWrapper';
import ScreenTitle from './ScreenTitle';

const HomeScreen = props => {
  const handlePress = event => {
    props.navigation.navigate('search');
  };
  return (<ScreenWrapper {...props}>
    <ScreenTitle label="Bienvenue" />
  </ScreenWrapper>);
};

export default HomeScreen;
/*    <FAB
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
    />*/