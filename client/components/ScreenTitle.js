import React from 'react';
import { Title } from 'react-native-paper';

const ScreenTitle = (props) => (
  <Title style={{
    marginBottom: 10,
    color: '#008900'
  }} {...props}>
    {props.label}
  </Title>
);

export default ScreenTitle;
