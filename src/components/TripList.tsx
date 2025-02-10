import React, {useState} from 'react';
import {FlatList, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import TripItem from './TripItem'; // Import the TripItem component
import {Colors} from '../constants/Colors';

interface ScheduleItem {
  time: string;
  status: string;
}

interface TripListProps {
  schedule: ScheduleItem[];
  onSelect: (item: ScheduleItem) => Promise<void>;
}

const TripList: React.FC<TripListProps> = ({schedule, onSelect}) => {
  const [selectedItem, setSelectedItem] = useState<ScheduleItem>(schedule[0]); // Default to the first item

  // Function to handle item press
  const handleItemPress = async (item: ScheduleItem) => {
    setSelectedItem(item);
    await onSelect(item);
  };

  const renderItem = ({item}: {item: ScheduleItem}) => {
    const isSelected = selectedItem.time === item.time;
    return (
      <TripItem item={item} isSelected={isSelected} onPress={handleItemPress} />
    );
  };

  return (
    <View style={styles.tripListContainer}>
      <FlatList
        data={schedule}
        keyExtractor={item => item.time}
        renderItem={renderItem}
      />
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          console.log('Comenzar viaje');
        }}
        style={styles.startJourneyButton}
      >
        <MaterialCommunityIcons name="bus-clock" size={24} color="white" />
        <Text style={styles.startJourneyButtonText}>Comenzar viaje</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tripListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.notFocusColor,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    borderRadius: 20,
  },
  startJourneyButton: {
    width: 185,
    height: 56,
    backgroundColor: Colors.secondaryColor,
    padding: 15,
    borderRadius: 100,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  startJourneyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 500,
  },
});

export default TripList;
