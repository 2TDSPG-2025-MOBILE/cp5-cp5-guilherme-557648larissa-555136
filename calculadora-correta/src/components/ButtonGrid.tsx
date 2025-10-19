import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Button from './Button';

interface ButtonGridProps {
  onButtonPress: (buttonValue: string) => void;
  colors: {
    buttonBg: string;
    operatorButtonBg: string;
    functionButtonBg: string;
    buttonText: string;
    functionButtonText: string;
  };
}

const ButtonGrid: React.FC<ButtonGridProps> = ({ onButtonPress, colors }) => {
  const buttons: string[][] = [
    ['AC', 'DEL', '%', '÷'],
    ['sin', 'cos', 'tan', '×'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '='],
    ['π', '0', '.', 'x²', '√'],
  ];

  const getButtonStyle = (btn: string): ViewStyle => {
    if (['+', '-', '×', '÷', '='].includes(btn)) return { backgroundColor: colors.operatorButtonBg };
    if (['AC', 'DEL', '%', 'sin', 'cos', 'tan', 'π', 'x²', '√'].includes(btn)) return { backgroundColor: colors.functionButtonBg };
    return { backgroundColor: colors.buttonBg };
  };

  const getButtonTextStyle = (btn: string) => {
    if (['AC', 'DEL', '%', 'sin', 'cos', 'tan', 'π', 'x²', '√'].includes(btn)) return { color: colors.functionButtonText };
    if (['+', '-', '×', '÷', '='].includes(btn)) return { color: '#FFFFFF' };
    return { color: colors.buttonText };
  };

  return (
    <View style={styles.buttonContainer}>
      {buttons.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((btn) => (
            <Button
              key={btn}
              label={btn}
              onPress={onButtonPress}
              style={getButtonStyle(btn)}
              textStyle={getButtonTextStyle(btn)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingBottom: 20,
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});

export default ButtonGrid;