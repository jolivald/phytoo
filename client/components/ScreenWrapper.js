import React from 'react';
import { View } from 'react-native';
import { FAB } from 'react-native-paper';
// import { LinearGradient } from 'expo'; // TODO

const ScreenWrapper = ({ navigation, children }) => {
  const handlePress = event => {
    navigation.navigate('search');
  };
  return (
    <View style={{ flex: 1, margin: 20 }}>
      {children}
      <FAB
        icon="magnify"
        onPress={handlePress}
        accessibilityLabel="Rechercher"
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          backgroundColor: '#008900'
        }}
      />
    </View>
  );
};

export default ScreenWrapper;
