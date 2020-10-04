import React, { useState } from 'react';
import { Text } from 'react-native';
import { Searchbar, ActivityIndicator, List, Checkbox, Button } from 'react-native-paper';
import removeMD from 'remove-markdown';
import ScreenWrapper from './ScreenWrapper';
import ScreenTitle from './ScreenTitle';
import { apiFetch } from '../utils';

const SearchScreen = props => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [vernacularChecked, setVernacularChecked] = useState(false);
  const [genusChecked, setGenusChecked] = useState(false);
  const [effectChecked, setEffectChecked] = useState(false);
  const [imageChecked, setImageChecked] = useState(false);
  const handleChangeSearch = value => {
    setSearchValue(value);
    if (value.length < 3){
      setSearchResults([]);
      return;
    }
    handleAutoSuggest(value);
  };
  const handleAutoSuggest = value => {
    setSearchLoading(true);
    setSearchResults([]);
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
  const handleSubmitSearch = (event, value) => {
    setSearchLoading(true);
    setSearchResults([]);
    apiFetch('simple-search', {
      method: 'POST',
      body: JSON.stringify({ query: value || searchValue })
    })
      .then(response => response.json())
      .then(results => {
        setSearchResults(results);
        setSearchLoading(false);
      });
  };
  const handleAdvancedSearch = (event, value) => {
    const request = {
      query: searchValue || value,
      genus: genusChecked,
      vernacular: vernacularChecked,
      effect: effectChecked,
      image: imageChecked
    }
    console.log('advanced search', request);
  }
  return (<ScreenWrapper {...props} onFABPress={handleSubmitSearch}>
    <ScreenTitle label="Rechercher" />
    <Searchbar
      value={searchValue}
      placeholder="Termes à trouver..."
      iconColor="#008900"
      onChangeText={handleChangeSearch}
      onIconPress={handleSubmitSearch}
    />
    <List.Accordion
      title={ expanded ? 'Rechercher parmi:' : 'Recherche avancée'}
      expanded={expanded}
      onPress={() => setExpanded(!expanded)}
    >
      <Checkbox.Item
        label="Nom communs"
        status={vernacularChecked ? 'checked' : 'unchecked'}
        onPress={() => setVernacularChecked(!vernacularChecked)}
        color="#008900"
      />
      <Checkbox.Item
        label="Genres"
        status={genusChecked ? 'checked' : 'unchecked'}
        onPress={() => setGenusChecked(!genusChecked)}
        color="#008900"
      />
      <Checkbox.Item
        label="Effets"
        status={effectChecked ? 'checked' : 'unchecked'}
        onPress={() => setEffectChecked(!effectChecked)}
        color="#008900"
      />
      <Checkbox.Item
        label="Images"
        status={imageChecked ? 'checked' : 'unchecked'}
        onPress={() => setImageChecked(!imageChecked)}
        color="#008900"
      />
      <Button icon="magnify" mode="contained" onPress={handleAdvancedSearch}>
        Recherche avancée
      </Button>
    </List.Accordion>
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
