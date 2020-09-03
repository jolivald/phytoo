import React, { useState, useRef } from 'react';
import { Platform } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
// import _logo from '../assets/favicon_48x48.png'; 
import logo from '../assets/logo-white_32.png'; 


export default function TopBar() {
  const searchRef = useRef(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const handlePressLogo = () => {
    setSearchVisible(false);
    searchRef.current.blur();
  };
  const handlePressSearch = () => {
    setSearchVisible(true);
    searchRef.current.focus();
  };
  const handleBlurSearch = () => {
    setSearchVisible(false);
  };
  const handleChangeSearch = (query) => {
    setSearchValue(query);
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
      { searchVisible || <Appbar.Action icon="magnify" onPress={handlePressSearch} /> }
      <Searchbar
        ref={searchRef}
        value={searchValue}
        placeholder="Rechercher..."
        iconColor="#008900"
        style={{ display: searchVisible ? 'flex' : 'none' }}
        onBlur={handleBlurSearch}
        onChangeText={handleChangeSearch}
      />
    </Appbar>
  )
};

/*    <View style={styles.navbar}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.branding}>Phytoo</Text>
      <TextInput style={styles.search} placeholder="Rechercher..." />
    </View>
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
    fontWeight: 'bold',
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
*/