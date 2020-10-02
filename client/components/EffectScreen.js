import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator } from 'react-native-paper';
import Markdown from 'react-native-markdown-renderer';
import { apiFetch } from '../utils';
import ScreenWrapper from './ScreenWrapper';
import ScreenTitle from './ScreenTitle';

const EffectScreen = props => {
  const { id } = props.route.params;
  const [effectInfo, setEffectInfo] = useState(null);
  useEffect(() => {
    apiFetch(`effects/${id}`)
      .then(response => response.json())
      .then(effect => {
        setEffectInfo(effect);
      })
  }, []);
  return effectInfo
    ? (<ScreenWrapper {...props}>
        <ScreenTitle label={effectInfo.name} />
        <Markdown>{effectInfo.description}</Markdown>
      </ScreenWrapper>)
    : (<ActivityIndicator
        animating={true}
        color="#008900"
        size="large"
        style={{ marginTop: 20 }}
      />);
};

export default EffectScreen;
