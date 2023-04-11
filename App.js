import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DueDatePicker from './components/DueDatePicker';
import RemainingDays from './components/RemainingDays';

export default function App() {
  const [dueDate, setDueDate] = useState(null);

  const loadDueDate = async () => {
    try {
      const savedDueDate = await AsyncStorage.getItem('dueDate');
      if (savedDueDate) {
        setDueDate(new Date(savedDueDate));
      }
    } catch (error) {
      console.error('Error loading due date:', error);
    }
  };

  React.useEffect(() => {
    loadDueDate();
  }, []);

  return (
    <View style={styles.container}>
      <DueDatePicker onDateSelected={setDueDate} />
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
});
