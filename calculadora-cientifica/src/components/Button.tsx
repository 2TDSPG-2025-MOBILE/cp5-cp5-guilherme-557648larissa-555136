import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

// Definimos os tipos das propriedades que o componente aceita
interface ButtonProps {
  onPress: (label: string) => void;
  label: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({ onPress, label, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={() => onPress(label)}>
      <Text style={[styles.buttonText, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default Button;