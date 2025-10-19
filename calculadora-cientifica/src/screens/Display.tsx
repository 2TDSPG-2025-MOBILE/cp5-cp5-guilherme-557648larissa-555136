import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface DisplayProps {
  value: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Display: React.FC<DisplayProps> = ({ value, style, textStyle }) => {
  return (
    <View style={[styles.display, style]}>
      <Text style={[styles.displayText, textStyle]} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  display: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  displayText: {
    fontSize: 60,
  },
});

export default Display;