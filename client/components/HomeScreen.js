import React, { useState, useEffect } from 'react';
import { Image, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import ScreenWrapper from './ScreenWrapper';
import ScreenTitle from './ScreenTitle';
import { apiFetch } from '../utils';

import logo from '../assets/phytoo-logo-256.png';

const HomeScreen = props => {
  const [plantCount, setPlantCount] = useState('?');
  useEffect(() => {
    apiFetch('plants/count')
      .then(response => response.json())
      .then(count => setPlantCount(count));
  }, []);
  const handleCguPress = () => {
    props.navigation.push('cgu');
  };
  const handleSearchPress = event => {
    props.navigation.push('search');
  };
  return (<ScreenWrapper {...props}>
    <ScreenTitle label="Bienvenue" />
    <Text style={{ marginBottom: 10 }}>Cette application vous permets de rechercher parmis les plantes utilisées en phytothérapie.</Text>
    <Text>Il y a actuellement {8} plantes enregistrées dans la base données.</Text>
    <Button
      icon="magnify"
      mode="contained"
      onPress={handleSearchPress}
      style={{ marginTop: 10, marginBottom: 10 }}
    >
      Recherche...
    </Button>
    <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
      <Image source={logo} style={{ height: 150, width: 150 }} />
    </View>
    <Text style={{ marginBottom: 10 }}>Les informations présentées par cette application sont fournies à titre informatif et ne saurait se substituer à un avis médical.</Text>
    <Text>En continuant à utiliser cette application vous déclarez accepter ses conditions générales d'utilisation.</Text>
    
    <Button
      icon="file"
      mode="contained"
      onPress={handleCguPress}
      style={{ marginTop: 10 }}
    >
      Consulter les CGU.
    </Button>
  </ScreenWrapper>);
};

export default HomeScreen;
