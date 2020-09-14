import React from 'react';
import { Title } from 'react-native-paper';

const ScreenTitle = ({ label }) => (
  <Title style={{
    marginTop: 10,
    marginBottom: 10,
    color: '#008900'
  }}>
    {label}
  </Title>
);

export default ScreenTitle;