import React from 'react';
import Setter from './Setter';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <Setter />
    </SafeAreaProvider>
  );
}
