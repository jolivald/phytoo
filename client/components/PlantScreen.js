import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { Chip, Text, List } from 'react-native-paper';
import Markdown from 'react-native-markdown-renderer';
import { apiFetch } from '../utils';
import ScreenTitle from './ScreenTitle';
import ScreenWrapper from './ScreenWrapper';
import { TouchableOpacity } from 'react-native-gesture-handler';

// source={{ uri: `http://localhost:1337${plantInfo.images[0].image[0].url}` }}

const PlantScreen = props => {
  const { id } = props.route.params;
  const [plantInfo, setPlantInfo] = useState(null);
  const [plantImage, setPlantImage] = useState(null);
  useEffect(() => {
    apiFetch(`plants/${id}`)
      .then(response => response.json())
      .then(plant => {
        setPlantInfo(plant);
        return fetch(`http://localhost:1337${plant.images[0].image[0].url}`)
          .then(response => response.blob())
          .then(blob => {
            const reader = new FileReader();
            reader.onloadend = () => setPlantImage(reader.result);
            reader.readAsDataURL(blob);
          });
      });
  }, []);
  const handleImagePress = () => {
    props.navigation.navigate('image', { id: plantInfo.images[0].id });
  };
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

      <TouchableOpacity
        onPress={handleImagePress}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Image
          source={{ uri: plantImage }}
          defaultSource={{ uri: 'https://via.placeholder.com/200' }}
          style={{
            height: 200,
            width: 200,
            resizeMode: 'cover',
            marginBottom: 10
          }}
        />
      </TouchableOpacity>

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

      <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Source</Text>
      <Markdown>{plantInfo.source}</Markdown>
    </>)}
  </ScreenWrapper>)
};

export default PlantScreen;
