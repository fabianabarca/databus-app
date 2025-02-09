import React, {useEffect, useRef, useState} from 'react';
import {
  // Platform,
  // KeyboardAvoidingView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';

import {MaterialIcons} from '@expo/vector-icons';
import {Colors} from '@constants/Colors';

import {useColorScheme} from '@hooks/useColorScheme';

const AutocompleteTextInput = ({
  label,
  suggestions,
  disabled = false,
  value,
  onChangeText,
  onErrorChange,
}: {
  label: string;
  suggestions: string[];
  disabled?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  onErrorChange?: (hasError: boolean) => void;
}) => {
  const [text, setText] = useState('');
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInteractingWithList, setIsInteractingWithList] = useState(false);
  const textInputRef = useRef(null);

  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = useStyles();

  useEffect(() => {
    if (value && value.trim() !== '') {
      console.log();

      setText(value);
    }
  }, [value]);
  const handleTextChange = (input: string) => {
    setIsFocused(true);
    setText(input);
    if (onChangeText) {
      onChangeText(input);
    }

    // Validate the input
    let isValid = true;

    // Filter suggestions based on input
    if (input) {
      const filteredSuggestions = suggestions.filter((item: string) =>
        item.toLowerCase().includes(input.toLowerCase()),
      );
      setFilteredData(filteredSuggestions);
      isValid = filteredSuggestions.length > 0;
    } else {
      setFilteredData(suggestions);
    }

    const errorMessage: string | null = isValid
      ? null
      : 'Entrada inválida. Por favor, seleccione una opción válida.';

    setError(errorMessage);

    if (!isValid && onChangeText) {
      onChangeText(input);
    }
    // Notify the parent about the error state
    if (onErrorChange) {
      onErrorChange(!isValid);
    }

    // Filter suggestions
    setFilteredData(
      input
        ? suggestions.filter(item =>
            item.toLowerCase().includes(input.toLowerCase()),
          )
        : suggestions,
    );
  };

  const handleFocus = () => {
    if ((text && !error) || text.trim() == '') setFilteredData(suggestions);
    setIsFocused(true);
  };

  const handleBLur = () => {
    if (!isInteractingWithList) {
      setFilteredData([]);
      if (!suggestions.includes(text)) {
        setError('Entrada inválida. Por favor, seleccione una opción válida.');
      }
      setIsFocused(false);
    }
  };

  // Handle selection of an autocomplete suggestion
  const handleSuggestionSelect = (suggestion: string) => {
    setIsFocused(false);
    setText(suggestion);
    if (onChangeText) {
      onChangeText(suggestion);
    }
    setError(null);
    setFilteredData([]);
  };

  const handleScroll = () => {
    setIsInteractingWithList(true);
    Keyboard.dismiss();

    setIsInteractingWithList(() => {
      setTimeout(() => setIsInteractingWithList(false), 100);
      return true;
    });
  };

  const toggleFocus = () => {
    if (!textInputRef.current) {
      return;
    }
    if (isFocused) {
      handleBLur();
    } else {
      handleFocus();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={textInputRef}
        label={label}
        placeholder={label}
        value={text}
        disabled={disabled}
        onChangeText={handleTextChange}
        left={<TextInput.Icon icon="magnify" />}
        right={
          <TextInput.Icon
            icon={() => (
              <MaterialIcons
                name="arrow-drop-down"
                size={24}
                style={{
                  transform: [{rotate: isFocused ? '0deg' : '270deg'}],
                }}
                color={!disabled ? Colors[colorScheme].text : '#8C8C98'}
              />
            )}
            onPress={toggleFocus}
            disabled={disabled}
          />
        }
        onFocus={handleFocus}
        onBlur={handleBLur}
        mode="outlined"
        textColor={Colors[colorScheme].text}
        style={styles.input}
        error={!!error}
      />
      {error && <HelperText type="error">{error}</HelperText>}

      {filteredData.length > 0 && (
        <FlatList
          keyboardShouldPersistTaps="handled"
          onScrollBeginDrag={handleScroll}
          style={styles.suggestionList}
          data={filteredData}
          keyExtractor={(item: string) => item}
          renderItem={({item}: {item: string}) => (
            <TouchableOpacity
              activeOpacity={0.1}
              onPress={() => handleSuggestionSelect(item)}
            >
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
      minWidth: 60,
      minHeight: 60,
    },
    input: {
      marginBottom: 0,
      height: 60,
      minHeight: 60,
    },
    suggestionItem: {
      padding: 10,
    },
    suggestionList: {
      backgroundColor: '#CDDEEB',
      borderRadius: 4,
      position: 'absolute',
      top: 68,
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
