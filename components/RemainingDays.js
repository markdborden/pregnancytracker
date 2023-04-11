import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RemainingDays({ dueDate }) {
  const calculateRemainingDays = () => {
    const today = new Date();
    const remainingTime = dueDate.getTime() - today.getTime();
    const remainingDays = Math.ceil(remainingTime / (1000 * 3600 * 24));
    return remainingDays;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {dueDate ? `${calculateRemainingDays()} days until the baby is due` : 'Please select a due date'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
