import React, { useState } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';

import Display from '../components/Display';
import HistoryList from '../components/HistoryList';
import ButtonGrid from '../components/ButtonGrid';
import { performCalculation, performScientificOperation } from '../utils/calculations';

const CalculatorScreen: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentNumber, setCurrentNumber] = useState<string>('0');
  const [lastNumber, setLastNumber] = useState<string>('');
  const [operation, setOperation] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const toggleTheme = () => setIsDarkMode(previousState => !previousState);

  const colors = {
    background: isDarkMode ? '#1C1C1C' : '#F5F5F5',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    buttonBg: isDarkMode ? '#505050' : '#E0E0E0',
    buttonText: isDarkMode ? '#FFFFFF' : '#000000',
    operatorButtonBg: '#FF9500',
    functionButtonBg: isDarkMode ? '#D4D4D2' : '#A5A5A5',
    functionButtonText: '#000000',
  };

  const handleNumberPress = (buttonValue: string) => {
    if (buttonValue === '.' && currentNumber.includes('.')) return;
    if (currentNumber === '0' && buttonValue !== '.') {
      setCurrentNumber(buttonValue);
    } else {
      setCurrentNumber(currentNumber + buttonValue);
    }
  };

  const handleOperationPress = (buttonValue: string) => {
    if (currentNumber === 'Erro: Divisão por 0') return;
    setLastNumber(currentNumber);
    setCurrentNumber('0');
    setOperation(buttonValue);
  };

  const handleClear = () => {
    setCurrentNumber('0');
    setLastNumber('');
    setOperation(null);
  };

  const handleDelete = () => {
    if (currentNumber.length > 1) {
      setCurrentNumber(currentNumber.slice(0, -1));
    } else {
      setCurrentNumber('0');
    }
  };

  const handleScientificFunction = (func: string) => {
    const num = parseFloat(currentNumber);
    const result = performScientificOperation(num, func);
    setCurrentNumber(String(result));
  };
  
  const handleEquals = () => {
    const num1 = parseFloat(lastNumber);
    const num2 = parseFloat(currentNumber);

    if (operation === '÷' && num2 === 0) {
      setCurrentNumber('Erro: Divisão por 0');
      return;
    }
    if (!operation || !lastNumber) return;

    const result = performCalculation(num1, num2, operation);
    
    const calculation = `${lastNumber} ${operation} ${currentNumber} = ${result}`;
    setHistory([calculation, ...history.slice(0, 4)]);

    setCurrentNumber(String(result));
    setLastNumber('');
    setOperation(null);
  };
  
  const handleButtonPress = (buttonValue: string) => {
    if (!isNaN(Number(buttonValue)) || buttonValue === '.') {
      handleNumberPress(buttonValue);
    } else if (['+', '-', '×', '÷'].includes(buttonValue)) {
      handleOperationPress(buttonValue);
    } else if (buttonValue === '=') {
      handleEquals();
    } else if (buttonValue === 'AC') {
      handleClear();
    } else if (buttonValue === 'DEL') {
      handleDelete();
    } else {
      handleScientificFunction(buttonValue);
    }
  };

  const clearHistory = () => setHistory([]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.themeToggleContainer}>
        <Text style={{ color: colors.text }}>Modo Escuro</Text>
        <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleTheme}
            value={isDarkMode}
        />
      </View>
      <Display value={currentNumber} textStyle={{ color: colors.text }} />
      <HistoryList 
        history={history} 
        onClearHistory={clearHistory}
        style={{ borderColor: colors.text }}
        textStyle={{ color: colors.text }}
      />
      <ButtonGrid onButtonPress={handleButtonPress} colors={colors} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end' },
  themeToggleContainer: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', padding: 10, marginTop: 40 },
});

export default CalculatorScreen;