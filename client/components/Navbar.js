import React from 'react';
import { Image, StyleSheet, Text, View, TextInput } from 'react-native';
import logo from '../assets/favicon_48x48.png'; 


export default function Navbar() {
  return (
    <View style={styles.navbar}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.branding}>Phytoo</Text>
      <TextInput style={styles.search} placeholder="Rechercher..." />
    </View>
  )
};

const styles = StyleSheet.create({
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'red'
  },
  logo: {
    height: 48,
    width: 48
  },
  branding: {
    flexGrow: 1,
    fontSize: 32,
    fontWeight: 700,
    marginLeft: 8,
    marginRight: 8
  },
  search: {
    fontSize: 16,
    height: 32,
    paddingLeft: 8,
    paddingRight: 8,
    borderColor: '#000',
    borderWidth: 1
  }
});
