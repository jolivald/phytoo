import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator } from 'react-native-paper';
import { apiFetch } from '../utils';
import ScreenWrapper from './ScreenWrapper';
import ScreenTitle from './ScreenTitle';

const GenusScreen = props => {
  const { id } = props.route.params;
  const [genusInfo, setGenusInfo] = useState(null);
  useEffect(() => {
    apiFetch(`genera/${id}`)
      .then(response => response.json())
      .then(genus => {
        setGenusInfo(genus);
      })
  }, []);
  return genusInfo
    ? (<ScreenWrapper {...props}>
        <ScreenTitle label={genusInfo.name} />
        <Text>{genusInfo.description}</Text>
      </ScreenWrapper>)
    : (<ActivityIndicator
        animating={true}
        color="#008900"
        size="large"
        style={{ marginTop: 20 }}
      />);
};

export default GenusScreen;
