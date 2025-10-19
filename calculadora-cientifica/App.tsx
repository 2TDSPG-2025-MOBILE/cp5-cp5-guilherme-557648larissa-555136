// App.tsx

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import CalculatorScreen from './src/screens/CalculatorScreen';

export default function App() {
  return (
    <>
      <CalculatorScreen />
      <StatusBar style="auto" />
    </>
  );
}