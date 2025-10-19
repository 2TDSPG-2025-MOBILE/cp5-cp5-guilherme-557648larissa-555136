// src/screens/CalculatorScreen.tsx

import React, { useState } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';

import Display from '../components/Display';
import HistoryList from '../components/HistoryList';
import ButtonGrid from '../components/ButtonGrid';
import { performCalculation, performScientificOperation } from '../utils/calculations';

const CalculatorScreen: React.FC = () => {
  // --- ESTADOS INTERNOS PARA A LÓGICA ---
  const [currentNumber, setCurrentNumber] = useState<string>('0');
  const [lastNumber, setLastNumber] = useState<string>('');
  const [operation, setOperation] = useState<string | null>(null);
  
  // --- NOVO ESTADO: A FONTE DA VERDADE PARA O VISOR ---
  const [displayValue, setDisplayValue] = useState<string>('0');

  // Estados dos bônus (não mudam)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
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

  // --- FUNÇÕES MODIFICADAS PARA ATUALIZAR O NOVO VISOR ---

  const handleClear = () => {
    // Reseta todos os estados para o valor inicial
    setCurrentNumber('0');
    setLastNumber('');
    setOperation(null);
    setDisplayValue('0'); // Limpa o visor
  };

  const handleNumberPress = (buttonValue: string) => {
    // Atualiza o número que está sendo digitado
    const newCurrentNumber = (currentNumber === '0' && buttonValue !== '.') || operation
      ? buttonValue
      : currentNumber + buttonValue;
    
    setCurrentNumber(newCurrentNumber);

    // Constrói a string que aparecerá no visor
    if (operation) {
      setDisplayValue(`${lastNumber} ${operation} ${newCurrentNumber}`);
    } else {
      setDisplayValue(newCurrentNumber);
    }
  };

  const handleOperationPress = (buttonValue: string) => {
    if (currentNumber === 'Erro: Divisão por 0') return;

    // Se já houver uma operação, calcula o resultado parcial
    if (operation && lastNumber) {
        const partialResult = performCalculation(parseFloat(lastNumber), parseFloat(currentNumber), operation);
        setLastNumber(String(partialResult));
        setDisplayValue(`${String(partialResult)} ${buttonValue}`);
    } else {
        setLastNumber(currentNumber);
        setDisplayValue(`${currentNumber} ${buttonValue}`);
    }

    setOperation(buttonValue);
    setCurrentNumber('0'); // Prepara para o próximo número internamente
  };

  const handleEquals = () => {
    if (!operation || !lastNumber) return;

    if (operation === '÷' && parseFloat(currentNumber) === 0) {
      setDisplayValue('Erro: Divisão por 0');
      setCurrentNumber('Erro: Divisão por 0');
      setLastNumber('');
      setOperation(null);
      return;
    }

    const result = performCalculation(parseFloat(lastNumber), parseFloat(currentNumber), operation);
    const calculation = `${lastNumber} ${operation} ${currentNumber} = ${result}`;
    setHistory([calculation, ...history.slice(0, 4)]);

    // Atualiza o visor e o estado interno com o resultado final
    setDisplayValue(String(result));
    setCurrentNumber(String(result));
    setLastNumber('');
    setOperation(null);
  };

  const handleDelete = () => {
    // A função DEL agora opera diretamente no que está sendo digitado
    if (currentNumber !== '0' && currentNumber.length > 0 && !operation) {
        const newCurrentNumber = currentNumber.slice(0, -1) || '0';
        setCurrentNumber(newCurrentNumber);
        setDisplayValue(newCurrentNumber);
    }
  };
  
  const handleScientificFunction = (func: string) => {
    const num = parseFloat(displayValue); // Opera no número que está no visor
    const result = performScientificOperation(num, func);
    setDisplayValue(String(result));
    setCurrentNumber(String(result));
    setLastNumber('');
    setOperation(null);
  };
  
  // Função "maestro" que decide qual ação tomar (não precisa de muitas mudanças)
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
      {/* O Display agora usa o novo estado `displayValue` */}
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