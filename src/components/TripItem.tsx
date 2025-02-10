import React from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Platform,
  useColorScheme,
} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Colors} from '../constants/Colors';

interface TripItemProps {
  item: {time: string; status: string};
  isSelected: boolean;
  onPress: (item: {time: string; status: string}) => void;
}

const TripItem: React.FC<TripItemProps> = ({item, isSelected, onPress}) => {
  const styles = useStyles();
  return (
    <Pressable onPress={() => onPress(item)}>
      <View
        style={[
          styles.itemContainer,
          isSelected && styles.selectedItemContainer,
        ]}
      >
        <View style={styles.timeContainer}>
          <MaterialCommunityIcons
            name="calendar-today"
            size={24}
            color={isSelected ? 'white' : '#49454F'}
          />
          <Text
            style={[styles.tripText, isSelected && styles.selectedTripTimeText]}
          >
            {item.time}
          </Text>
        </View>
        <View style={styles.tripStatusContainer}>
          <Text
            style={[
              styles.tripText,
              isSelected && styles.selectedTripStatusText,
            ]}
          >
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const useStyles = () => {
  const colorScheme = useColorScheme() as 'light' | 'dark';

  return StyleSheet.create({
    itemContainer: {
      width: '100%',
      backgroundColor: Colors.notFocusColor,
      padding: 15,
      borderRadius: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    selectedItemContainer: {
      backgroundColor: Colors.primaryColor,
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    tripText: {
      fontSize: 16,
      fontWeight: 500,
      color: '#555',
    },
    selectedTripTimeText: {
      color: Colors.dark.text,
      textDecorationLine: 'underline',
    },
    selectedTripStatusText: {
      color: Colors.dark.text,
    },
    tripStatusContainer: {
      justifyContent: 'center',
    },
  });
};

export default TripItem;
