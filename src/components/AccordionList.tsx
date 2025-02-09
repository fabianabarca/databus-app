import React, {useEffect, useState} from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';

import {List} from 'react-native-paper';
import {MaterialIcons} from '@expo/vector-icons';

import {Colors} from '@constants/Colors';
import {Item} from '@/types';

type AccordionListProps<T> = {
  items: Item<T>[];
  defaultLabel?: string;
  selectedItem?: T;
  onSelect?: (item: Item<T>) => void;
};

const AccordionList = <T,>({
  items,
  defaultLabel = 'Select value',
  selectedItem,
  onSelect,
}: AccordionListProps<T>) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>(
    selectedItem
      ? items.find(item => item.value === selectedItem)?.label ?? defaultLabel
      : defaultLabel,
  );
  const theme = useColorScheme() as 'light' | 'dark';
  const styles = useStyles(theme);

  useEffect(() => {
    if (selectedItem) {
      const foundItem = items.find(item => item.value === selectedItem);
      setSelectedLabel(foundItem ? foundItem.label : defaultLabel);
    }
  }, [selectedItem]);

  const handleItemPress = (item: Item<T>) => {
    setSelectedLabel(item.label);
    if (onSelect) {
      onSelect(item);
    }
    setExpanded(false);
  };

  return (
    <List.Accordion
      title={selectedLabel}
      left={props => <List.Icon {...props} icon="" />}
      right={() => (
        <MaterialIcons
          name="arrow-drop-down"
          size={24}
          color={Colors[theme].text}
          style={{transform: [{rotate: expanded ? '0deg' : '270deg'}]}}
        />
      )}
      expanded={expanded}
      onPress={() => setExpanded(!expanded)}
      style={styles.list}
      titleStyle={styles.label}
    >
      <View style={styles.accordionContent}>
        {items.map((item, index) => (
          <List.Item
            key={index}
            title={item.label}
            onPress={() => handleItemPress(item)}
            style={styles.accordionListItem}
          />
        ))}
      </View>
    </List.Accordion>
  );
};

export default AccordionList;

const useStyles = (theme: 'light' | 'dark') => {
  return StyleSheet.create({
    list: {
      borderBottomWidth: 1,
      borderColor: 'grey',
      position: 'relative',
      paddingRight: 15,
      padding: 0,
      backgroundColor: Colors[theme].card,
    },
    label: {
      color: Colors[theme].text,
    },
    accordionContent: {
      position: 'absolute',
      top: '100%',
      width: '100%',
      backgroundColor: Colors.notFocusColor,
      zIndex: 1,
    },
    accordionListItem: {},
  });
};
