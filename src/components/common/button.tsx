import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
}

const CustomButton: React.FC<ButtonProps> = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1C756C',
    width: 180,
    alignItems: 'center',
    elevation: 6,
  },
  title: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default CustomButton;
