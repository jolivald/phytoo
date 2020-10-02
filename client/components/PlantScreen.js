import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Chip, Text, List } from 'react-native-paper';
import Markdown from 'react-native-markdown-renderer';
import { apiFetch } from '../utils';
import ScreenTitle from './ScreenTitle';
import ScreenWrapper from './ScreenWrapper';

const PlantScreen = props => {
  const { id } = props.route.params;
  const [plantInfo, setPlantInfo] = useState(null);
  useEffect(() => {
    apiFetch(`plants/${id}`)
      .then(response => response.json())
      .then(plant => {
        setPlantInfo(plant);
      })
  }, []);
  return (<ScreenWrapper {...props}>
    {plantInfo && (<>
      <ScreenTitle
        label={`${plantInfo.genus.name} ${plantInfo.species.name}`}
        onPress={() => props.navigation.navigate('genus', { id: plantInfo.genus.id }) }
      />
      <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Noms communs</Text>
      <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginBottom: 10
        }}>
        {plantInfo.vernaculars.map(verna => (
          <Chip
            key={verna.id}
            style={{ marginRight: 5, marginBottom: 5, backgroundColor: '#7dd52f' }}
            onPress={() => props.navigation.navigate('vernacular', { id: verna.id })}
          >
            {verna.name}
          </Chip>
        ))}
      </View>
      <Text style={{ fontWeight: 'bold', marginBottom: 0 }}>Description</Text>
      <Markdown>{plantInfo.description}</Markdown>
      <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Effets thérapeutiques</Text>
      {plantInfo.effects.map(effect => (
        <List.Item
          key={effect.id}
          title={effect.name}
          decription={effect.description}
          left={props => (<List.Icon {...props} icon="check-bold" />)}
          onPress={() => props.navigation.navigate('effect', { id: effect.id })}
        />
      ))}
    </>)}
  </ScreenWrapper>)
};

export default PlantScreen;
