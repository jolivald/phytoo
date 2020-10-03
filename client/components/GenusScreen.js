import React, { useEffect, useState } from 'react';
import { ActivityIndicator, List} from 'react-native-paper';
import Markdown from 'react-native-markdown-renderer';
import removeMD from 'remove-markdown';
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
        console.log('genus', genus);
      })
  }, []);
  return genusInfo
    ? (<ScreenWrapper {...props} style={{ marginBottom: 0 }}>
        <ScreenTitle label={genusInfo.name} />
        <Markdown>{genusInfo.description}</Markdown>
        {genusInfo.plants.map(({ id, species, description }) => (
          <List.Item
            key={id}
            title={genusInfo.name + ' ' + species.name}
            description={removeMD(description)}
            left={props => (<List.Icon {...props} icon="leaf" />)}
            onPress={() => props.navigation.navigate('plant', { id })}
          />
        ))}
      </ScreenWrapper>)
    : (<ActivityIndicator
        animating={true}
        color="#008900"
        size="large"
        style={{ marginTop: 20 }}
      />);
};

export default GenusScreen;
