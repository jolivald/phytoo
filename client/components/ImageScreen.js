import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import Markdown from 'react-native-markdown-renderer';
import { apiFetch } from '../utils';
import ScreenWrapper from './ScreenWrapper';
import ScreenTitle from './ScreenTitle';

const ImageScreen = props => {
  const { id } = props.route.params;
  const [imageInfo, setImageInfo] = useState(null);
  useEffect(() => {
    apiFetch(`images/${id}`)
      .then(response => response.json())
      .then(image => {
        setImageInfo(image);
      })
  }, []);
  return imageInfo
    ? (<ScreenWrapper {...props} style={{ marginBottom: 0 }}>
        <ScreenTitle label={imageInfo.name} />
        <Image
          source={{ uri: `http://localhost:1337${imageInfo.image[0].url}` }}
          style={{
            height: 200,
            width: 200,
            resizeMode: 'cover'
          }}
        />
        <Markdown>{imageInfo.description}</Markdown>
      </ScreenWrapper>)
    : (<ActivityIndicator
        animating={true}
        color="#008900"
        size="large"
        style={{ marginTop: 20 }}
      />);
};

export default ImageScreen;
