import React from 'react';
import ScreenWrapper from './ScreenWrapper';
import ScreenTitle from './ScreenTitle';

const ResultScreen = props => {
  return (<ScreenWrapper {...props}>
    <ScreenTitle label="Résultats" />
  </ScreenWrapper>);
};

export default ResultScreen;
