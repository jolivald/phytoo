import React, { useState } from 'react';
import { Title, Searchbar } from 'react-native-paper';
import ScreenWrapper from './ScreenWrapper';
import ScreenTitle from './ScreenTitle';

const SearchScreen = props => {
  const [searchValue, setSearchValue] = useState('');
  const handleChangeSearch = value => {
    setSearchValue(value);
  };
  return (<ScreenWrapper>
    <ScreenTitle label="Rechercher" />
    <Searchbar
        value={searchValue}
        placeholder="Termes à trouver..."
        iconColor="#008900"
        onChangeText={handleChangeSearch}
      />
  </ScreenWrapper>);
};

export default SearchScreen;
