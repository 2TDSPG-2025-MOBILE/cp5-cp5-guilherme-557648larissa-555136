// src/screens/CalculatorScreen.tsx

import React, { useState } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';

import Display from '../components/Display';
import HistoryList from '../components/HistoryList';
import ButtonGrid from '../components/ButtonGrid';
import { performCalculation, performScientificOperation } from '../utils/calculations';

// Função para formatar os resultados (continua a mesma)
const formatResult = (num: number): string => {
    let numStr = String(num);
    if (numStr.length > 6) {
        if (Math.abs(num) >= 1_000_000) {
            return num.toExponential(1);
        } else if (numStr.includes('.')) {
            return numStr.slice(0, 6);
        }
    }
    return numStr;
};

const CalculatorScreen: React.FC = () => {
  // Estados internos para a lógica
  const [currentNumber, setCurrentNumber] = useState<string>('0');
  const [lastNumber, setLastNumber] = useState<string>('');
  const [operation, setOperation] = useState<string | null>(null);
  
  // Estado para o visor
  const [displayValue, setDisplayValue] = useState<string>('0');

  // NOVO: A flag que vai resolver nosso problema de digitação.
  const [isTypingNextNumber, setIsTypingNextNumber] = useState<boolean>(false);

  // Estados dos bônus
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);

  const toggleTheme = () => setIsDarkMode((previousState: boolean) => !previousState);

  const colors = {
    background: isDarkMode ? '#1C1C1C' : '#F5F5F5',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    buttonBg: isDarkMode ? '#505050' : '#E0E0E0',
    buttonText: isDarkMode ? '#FFFFFF' : '#000000',
    operatorButtonBg: '#FF9500',
    functionButtonBg: isDarkMode ? '#D4D4D2' : '#A5A5A5',
    functionButtonText: '#000000',
  };

  const handleClear = () => {
    setCurrentNumber('0');
    setLastNumber('');
    setOperation(null);
    setDisplayValue('0');
    setIsTypingNextNumber(false); // Reseta a flag
  };

  // MODIFICADO: A lógica de digitação agora usa a nova flag.
  const handleNumberPress = (buttonValue: string) => {
    if (currentNumber.length >= 6) return;

    let newCurrentNumber;
    // Se a flag estiver ativa, significa que este é o *primeiro* dígito do novo número.
    if (isTypingNextNumber) {
        newCurrentNumber = buttonValue === '.' ? '0.' : buttonValue;
        setIsTypingNextNumber(false); // Desativa a flag para que os próximos dígitos sejam anexados.
    } else {
        // Se a flag não estiver ativa, anexa os dígitos normalmente.
        newCurrentNumber = currentNumber === '0' && buttonValue !== '.' ? buttonValue : currentNumber + buttonValue;
    }
    
    setCurrentNumber(newCurrentNumber);

    if (operation) {
      setDisplayValue(`${lastNumber} ${operation} ${newCurrentNumber}`);
    } else {
      setDisplayValue(newCurrentNumber);
    }
  };

  // MODIFICADO: Ativa a flag para indicar que o próximo número será digitado.
  const handleOperationPress = (buttonValue: string) => {
    if (currentNumber === 'Erro: Divisão por 0') return;

    if (operation && lastNumber && !isTypingNextNumber) {
        const partialResult = performCalculation(parseFloat(lastNumber), parseFloat(currentNumber), operation);
        const formattedResult = formatResult(partialResult);
        setLastNumber(formattedResult);
        setDisplayValue(`${formattedResult} ${buttonValue}`);
    } else {
        setLastNumber(currentNumber);
        setDisplayValue(`${currentNumber} ${buttonValue}`);
    }

    setOperation(buttonValue);
    setIsTypingNextNumber(true); // ATIVA A FLAG!
  };

  const handleEquals = () => {
    if (!operation || !lastNumber) return;

    if (operation === '÷' && parseFloat(currentNumber) === 0) {
      setDisplayValue('Erro');
      setCurrentNumber('Erro');
      setLastNumber('');
      setOperation(null);
      setIsTypingNextNumber(false);
      return;
    }

    const result = performCalculation(parseFloat(lastNumber), parseFloat(currentNumber), operation);
    const formattedResult = formatResult(result);
    const calculation = `${lastNumber} ${operation} ${currentNumber} = ${formattedResult}`;
    setHistory([calculation, ...history.slice(0, 4)]);

    setDisplayValue(formattedResult);
    setCurrentNumber(formattedResult);
    setLastNumber('');
    setOperation(null);
    setIsTypingNextNumber(false); // Reseta a flag
  };

  const handleDelete = () => {
    // Só permite apagar o número que está sendo ativamente digitado.
    if (!isTypingNextNumber && currentNumber !== '0') {
      const newCurrentNumber = currentNumber.slice(0, -1) || '0';
      setCurrentNumber(newCurrentNumber);
      if (operation) {
        setDisplayValue(`${lastNumber} ${operation} ${newCurrentNumber}`);
      } else {
        setDisplayValue(newCurrentNumber);
      }
    }
  };
  
  const handleScientificFunction = (func: string) => {
    const num = parseFloat(displayValue);
    const result = performScientificOperation(num, func);
    const formattedResult = formatResult(result);
    setDisplayValue(formattedResult);
    setCurrentNumber(formattedResult);
    setLastNumber('');
    setOperation(null);
    setIsTypingNextNumber(false); // Reseta a flag
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
      <Display value={displayValue} textStyle={{ color: colors.text }} />
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