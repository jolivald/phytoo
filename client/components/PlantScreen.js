import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Badge, Chip } from 'react-native-paper';
import { apiFetch } from '../utils';
import ScreenTitle from './ScreenTitle';
import ScreenWrapper from './ScreenWrapper';

const PlantScreen = props => {
  const { id } = props.route.params;
  //const [plantId, setPlantId] = useState(id);
  const [plantInfo, setPlantInfo] = useState(null);
  useEffect(() => {
    apiFetch(`plants/${id}`)
      .then(response => response.json())
      .then(plant => {
        setPlantInfo(plant);
      })
  }, []);
  console.log('plant info', plantInfo);
  // TODO externalize species ???
  return (<ScreenWrapper {...props}>
    {plantInfo && (<>
      <ScreenTitle label={`${plantInfo.genus.name} ${plantInfo.species}`} />
      <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}>
        {plantInfo.vernaculars.map(verna => (
          <Chip key={verna.id} style={{ marginRight: 5, marginBottom: 5 }}>
            {verna.name}
          </Chip>
        ))}
      </View>
    </>)}
  </ScreenWrapper>)
};

export default PlantScreen;
