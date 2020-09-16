import React, { useState } from 'react';
import { Title, Searchbar } from 'react-native-paper';
import ScreenWrapper from './ScreenWrapper';
import ScreenTitle from './ScreenTitle';
import { apiFetch } from '../utils';

const SearchScreen = props => {
  const [searchValue, setSearchValue] = useState('');
  const handleChangeSearch = value => {
    setSearchValue(value);
    apiFetch('search', {
      method: 'POST',
      body: JSON.stringify({ query: 'lol' })
    })
      .then(res => res.json())
      .then(res => {
        console.log('response', res);
      });
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
