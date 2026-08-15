import { styles } from './styles';
import React from 'react';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function SplashScreen() {
  return (
    <LinearGradient
      colors={['#2c2c2c', '#000']}
      style={styles.container}
    >
      <Text style={styles.title}>CINEFLIX</Text>
    </LinearGradient>
  );
}

