import React, { useState } from 'react';
import { Text } from 'react-native';
import { Searchbar, ActivityIndicator, List } from 'react-native-paper';
import removeMD from 'remove-markdown';
import ScreenWrapper from './ScreenWrapper';
import ScreenTitle from './ScreenTitle';
import { apiFetch } from '../utils';

const SearchScreen = props => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const handleChangeSearch = value => {
    setSearchValue(value);
    if (value.length < 3){
      setSearchResults([]);
      return;
    }
    handleSubmitSearch(null, value);
  };
  const handleSubmitSearch = (event, value) => {
    setSearchLoading(true);
    setSearchResults([]);
    console.log('auto-suggest', value, searchValue)
    apiFetch('auto-suggest', {
      method: 'POST',
      body: JSON.stringify({ query: value || searchValue })
    })
      .then(response => response.json())
      .then(results => {
        setSearchResults(results);
        setSearchLoading(false);
      });
  };
  return (<ScreenWrapper {...props} onFABPress={handleSubmitSearch}>
    <ScreenTitle label="Rechercher" />
    <Searchbar
        value={searchValue}
        placeholder="Termes à trouver..."
        iconColor="#008900"
        onChangeText={handleChangeSearch}
        onIconPress={handleSubmitSearch}
      />
    {searchResults.length > 0
      ? searchResults.map(({ id, genus, species, description}) => (
        <List.Item
          key={id}
          title={genus.name + ' ' + species.name}
          description={removeMD(description)}
          left={props => (<List.Icon {...props} icon="leaf" />)}
          onPress={() => props.navigation.navigate('plant', { id })}
        />
      ))
      : (searchLoading
          ? (<ActivityIndicator
              animating={true}
              color="#008900"
              size="large"
              style={{ marginTop: 20 }}
            />)
          : (<List.Item
              title="Vous cherchez quelque chose?"
              description="Entrez dans le champs ci-dessus les termes à rechercher."
              left={props => (<List.Icon {...props} icon="help" />)}
            />)
      )
    }
  </ScreenWrapper>);
};

export default SearchScreen;
