import React from 'react';
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
