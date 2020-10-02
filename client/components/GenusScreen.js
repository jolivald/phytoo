import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator } from 'react-native-paper';
import Markdown from 'react-native-markdown-renderer';
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
    ? (<ScreenWrapper {...props} style={{ marginBottom: 0 }}>
        <ScreenTitle label={genusInfo.name} />
        <Markdown>{genusInfo.description}</Markdown>
      </ScreenWrapper>)
    : (<ActivityIndicator
        animating={true}
        color="#008900"
        size="large"
        style={{ marginTop: 20 }}
      />);
};

export default GenusScreen;
