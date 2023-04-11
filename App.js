import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DueDatePicker from './components/DueDatePicker';
import RemainingDays from './components/RemainingDays';

export default function App() {
  const [dueDate, setDueDate] = useState(null);
  // Add a new state variable to control the visibility of the DueDatePicker component
  const [showDatePicker, setShowDatePicker] = useState(true);

  // Load the due date when the component mounts
  useEffect(() => {
    loadDueDate();
  }, []);

  const loadDueDate = async () => {
    try {
      const savedDueDate = await AsyncStorage.getItem('dueDate');
      if (savedDueDate) {
        setDueDate(new Date(savedDueDate));
        // Hide the DueDatePicker component if a date is already saved
        setShowDatePicker(false);
      }
    } catch (error) {
      console.error('Error loading due date:', error);
    }
  };

  // Function to handle when a date is selected
  const handleDateSelected = (date) => {
    setDueDate(date);
    // Hide the DueDatePicker component after selecting a date
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      {/* Conditionally render the DueDatePicker or the selected date as an H3 header */}
      {showDatePicker ? (
        <DueDatePicker onDateSelected={handleDateSelected} />
      ) : (
        <Text style={styles.h3}>{dueDate.toDateString()}</Text>
      )}
      <RemainingDays dueDate={dueDate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  h3: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
