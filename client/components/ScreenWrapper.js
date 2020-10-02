import React from 'react';
import { View, ScrollView } from 'react-native';
import { FAB } from 'react-native-paper';
// import { LinearGradient } from 'expo'; // TODO

const ScreenWrapper = ({ navigation, children, onFABPress }) => {
  const handlePress = onFABPress || (event => {
    navigation.navigate('search'); 
  });
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1}}>
        <View style={{ flex: 1, margin: 20 }}>
          {children}
        </View>
      </ScrollView>
      <FAB
        icon="magnify"
        onPress={handlePress}
        accessibilityLabel="Rechercher"
        style={{
          position: 'absolute',
          right: 20,
          bottom: 20,
          backgroundColor: '#008900'
        }}
      />
      </View>
  );
};

export default ScreenWrapper;
