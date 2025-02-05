import React, {useRef, useState} from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

import {MaterialIcons} from '@expo/vector-icons';

const AutocompleteTextInput = ({
  label,
  suggestions,
}: {
  label: string;
  suggestions: string[];
}) => {
  const [text, setText] = useState('');
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const textInputRef = useRef(null);

  const styles = useStyles();

  // Handle change in input text
  const handleTextChange = (input: string) => {
    setText(input);
    if (input) {
      const filteredSuggestions = suggestions.filter((item: string) =>
        item.toLowerCase().includes(input.toLowerCase()),
      );
      setFilteredData(filteredSuggestions);
    } else {
      setFilteredData(suggestions);
    }
  };

  const handleFocus = () => {
    setFilteredData(suggestions);
    setIsFocused(true);
  };

  const handleBLur = () => {
    setFilteredData([]);
    setIsFocused(false);
  };

  const toggleFocus = () => {
    if (!textInputRef.current) {
      return;
    }
    if (isFocused) {
      textInputRef.current.blur(); // Remove focus
    } else {
      textInputRef.current.focus(); // Set focus
    }
  };

  // Handle selection of an autocomplete suggestion
  const handleSuggestionSelect = (suggestion: string) => {
    setText(suggestion);
    setFilteredData([]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={textInputRef}
        label={label}
        value={text}
        onChangeText={handleTextChange}
        left={<TextInput.Icon icon="magnify" />}
        right={
          <TextInput.Icon
            icon={() => (
              <MaterialIcons
                name="arrow-drop-down"
                size={24}
                style={{transform: [{rotate: isFocused ? '0deg' : '270deg'}]}}
              />
            )}
            onPress={toggleFocus}
          />
        } // Right icon (arrow-drop-down)
        onFocus={handleFocus}
        onBlur={handleBLur}
        mode="outlined"
        style={styles.input}
      />

      {/* Display filtered suggestions */}
      {filteredData.length > 0 && (
        <FlatList
          style={styles.suggestionList}
          data={filteredData}
          keyExtractor={(item: string) => item}
          renderItem={({item}: {item: string}) => (
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
      shadowOffset: {width: 10, height: 4},
      shadowOpacity: 0.5,
      shadowRadius: 5,

      // Elevation for Android
      elevation: 5,
    },
  });
};

export default AutocompleteTextInput;
