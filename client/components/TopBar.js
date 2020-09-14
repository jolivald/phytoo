import React from 'react';
import { Platform } from 'react-native';
import { Appbar } from 'react-native-paper';
import logo from '../assets/logo-white_32.png'; 

const TopBar = ({ navigation }) => {
  const handlePressLogo = () => {
    navigation.navigate('home');
    // navigation.goBack();
  };
  return (
    <Appbar style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingLeft: 8,
      paddingRight: 8,
      ...(Platform.OS === 'web'
        ? { /*height: 62,*/ paddingTop: 0 }
        : { height: 'auto', paddingTop: 24, paddingBottom: 8 }
      )
    }}>
      <Appbar.Action icon={logo} onPress={handlePressLogo} />
      <Appbar.Content title="Phytoo" subtitle={'Tout naturellement'} />
    </Appbar>
  ) 
};

export default TopBar;
