import React, { useState } from 'react';
import { Text } from 'react-native';
import {
  Searchbar, ActivityIndicator, List, Button, RadioButton, Snackbar
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import removeMD from 'remove-markdown';
import ScreenWrapper from './ScreenWrapper';
import ScreenTitle from './ScreenTitle';
import { apiFetch } from '../utils';

const SearchScreen = props => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [radioChecked, setRadioChecked] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const handleChangeSearch = value => {
    setSearchValue(value);
    if (value.length < 3){
      setSearchResults([]);
      return;
    }
    handleAutoSuggest(value);
  };
  const handleAutoSuggest = value => {
    if (expanded){ return; }
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
  const handleSubmitSearch = (event, value=searchValue) => {
    if (expanded){
      return handleAdvancedSearch(null, value);
    }
    if (value.length < 3){
      return setErrorMessage('Entrez au moins trois caractères pour lancer une recherche');
    }
    setSearchLoading(true);
    setSearchResults([]);
    apiFetch('simple-search', {
      method: 'POST',
      body: JSON.stringify({ query: value })
    })
      .then(response => response.json())
      .then(results => {
        setSearchResults(results);
        setSearchLoading(false);
      });
  };
  const handleAdvancedSearch = (event, value=searchValue) => {
    if (value.length < 3){
      return setErrorMessage('Entrez au moins trois caractères pour lancer une recherche');
    }
    const request = {
      query: value,
      model: radioChecked
    };
    apiFetch('advanced-search', {
      method: 'POST',
      body: JSON.stringify(request)
    })
      .then(response => response.json())
      .then(results => {
        setSearchResults(results);
        setSearchLoading(false);
      });
  }
  const handleRadioPress = value => {
    setRadioChecked(value);
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
    <Snackbar
      visible={!!errorMessage}
      onDismiss={() => setErrorMessage(null)}
      action={{
        label: <Icon name="close" size={20} color="#ffffff" />,
        onPress: () => setErrorMessage(null),
      }}
      style={{ backgroundColor: '#008900' }}
      wrapperStyle={{
        position: 'absolute',
        top: 0
      }}
    >
      Entrez au moins trois caractères à rechercher
    </Snackbar>
    <List.Accordion
      title={ expanded ? 'Filtrer par:' : 'Filtrer'}
      expanded={expanded}
      onPress={() => setExpanded(!expanded)}
    >
      <RadioButton.Group onValueChange={handleRadioPress} value={radioChecked}>
        <RadioButton.Item label="Nom communs" value="vernacular" color="#008900" />
        <RadioButton.Item label="Genres" value="genus" color="#008900" />
        <RadioButton.Item label="Effets" value="effect" color="#008900" />
        <RadioButton.Item label="Images" value="image" color="#008900" />
      </RadioButton.Group>
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
          : (expanded || <List.Item
              title="Vous cherchez quelque chose?"
              description="Entrez dans le champs ci-dessus les termes à rechercher."
              left={props => (<List.Icon {...props} icon="help" />)}
            />)
      )
    }
  </ScreenWrapper>);
};

export default SearchScreen;
