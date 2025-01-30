import React, {useState} from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

const AutocompleteTextInput = ({
  label,
  suggestions,
}: {
  label: string;
  suggestions: string[];
}) => {
  const [text, setText] = useState('');
  const [filteredData, setFilteredData] = useState<string[]>([]);

  const styles = useStyles();

  // Sample suggestions for autocomplete

  // Handle change in input text
  const handleTextChange = input => {
    setText(input);
    if (input) {
      const filteredSuggestions = suggestions.filter(item =>
        item.toLowerCase().includes(input.toLowerCase()),
      );
      setFilteredData(filteredSuggestions);
    } else {
      setFilteredData([]);
    }
  };

  // Handle selection of an autocomplete suggestion
  const handleSuggestionSelect = suggestion => {
    setText(suggestion);
    setFilteredData([]); // Hide suggestions after selection
  };

  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        value={text}
        onChangeText={handleTextChange}
        mode="outlined"
        style={styles.input}
        theme={{
          colors: {
            primary: '#005DA4',
          },
        }}
      />

      {/* Display filtered suggestions */}
      {filteredData.length > 0 && (
        <FlatList
          style={styles.suggestionList}
          data={filteredData}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleSuggestionSelect(item)}>
              <View style={styles.suggestionItem}>
                <Text>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      width: '100%',
    },
    input: {
      marginBottom: 0,
    },
    suggestionItem: {
      padding: 10,
    },
    suggestionList: {
      backgroundColor: '#CDDEEB',
      borderRadius: 4,
      position: 'absolute',
      top: 56,
      left: 0,
      right: 0,
      zIndex: 1,
      maxHeight: 200,
      paddingTop: 5,
      paddingBottom: 5,

      // Shadow properties for iOS
      shadowColor: '#000',
      shadowOffset: {width: 10, height: 4}, // Horizontal and vertical offset
      shadowOpacity: 0.5, // Opacity of the shadow
      shadowRadius: 5, // Blur radius

      // Elevation for Android
      elevation: 5, // Android-specific shadow,
    },
  });
};

export default AutocompleteTextInput;
