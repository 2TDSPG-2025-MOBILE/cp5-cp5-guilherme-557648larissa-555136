// src/components/HistoryList.tsx

import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';

interface HistoryListProps {
  history: string[];
  onClearHistory: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onClearHistory, style, textStyle }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={[styles.title, textStyle]}>Histórico</Text>
        <TouchableOpacity onPress={onClearHistory}>
          <Text style={[styles.clearButton, textStyle]}>Limpar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={history}
        renderItem={({ item }) => <Text style={[styles.historyItem, textStyle]}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    padding: 10,
    borderTopWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    fontSize: 16,
    color: '#FF6347',
  },
  historyItem: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'right',
  },
});

export default HistoryList;