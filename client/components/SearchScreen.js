import React, { useState } from 'react';
import { Title, Searchbar } from 'react-native-paper';
import ScreenTitle from './ScreenTitle';

const SearchScreen = props => {
  const [searchValue, setSearchValue] = useState('');
  const handleChangeSearch = value => {
    console.log('searching', value);
    setSearchValue(value);
  };
  return (<>
    <ScreenTitle label="Rechercher" />
    <Searchbar
        value={searchValue}
        placeholder="Termes à trouver..."
        iconColor="#008900"
        onChangeText={handleChangeSearch}
      />
  </>);
};

export default SearchScreen;
