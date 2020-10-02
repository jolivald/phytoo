import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator, List } from 'react-native-paper';
import Markdown from 'react-native-markdown-renderer';
import removeMD from 'remove-markdown';
import { apiFetch } from '../utils';
import ScreenWrapper from './ScreenWrapper';
import ScreenTitle from './ScreenTitle';

const VernacularScreen = props => {
  const { id } = props.route.params;
  const [vernacularInfo, setVernacularInfo] = useState(null);
  useEffect(() => {
    apiFetch(`vernaculars/${id}`)
      .then(response => response.json())
      .then(vernacular => {
        setVernacularInfo(vernacular);
        console.log(vernacular);
      })
  }, []);
  return vernacularInfo
    ? (<ScreenWrapper {...props} style={{ marginBottom: 0 }}>
        <ScreenTitle label={vernacularInfo.name} />
        {vernacularInfo.plants.map(plant => (
          <List.Item
            key={plant.id}
            title={`${plant.genus.name} ${plant.species.name}`}
            description={removeMD(plant.description)}
            left={props => (<List.Icon {...props} icon="leaf" />)}
            onPress={() => props.navigation.navigate('plant', { id: plant.id })}
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

export default VernacularScreen;
