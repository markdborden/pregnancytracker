import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function DueDatePicker({ onDateSelected }) {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onChange = async (event, selectedDate) => {
    if (selectedDate) {
      setSelectedDate(selectedDate);
      onDateSelected(selectedDate);
      await AsyncStorage.setItem('dueDate', selectedDate.toISOString());
    }
    setShowPicker(false);
  };
  
  const showDatepicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDatepicker} style={styles.datePickerContainer}>
        <Text style={styles.dateText}>{selectedDate.toDateString()}</Text>
        <Ionicons name="calendar" size={24} color="black" />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
