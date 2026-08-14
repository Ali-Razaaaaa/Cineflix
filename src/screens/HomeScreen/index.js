import { styles } from './styles';
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../../assets/image.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.header}>
        <Text style={styles.logo}>C</Text>
        <View style={styles.topRight}>
          <Text style={styles.topText}>PRIVACY</Text>
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.topText}>SIGN UP</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Unlimited films,</Text>
        <Text style={styles.title}>TV Programmes</Text>
        <Text style={styles.title}>&amp; More</Text>

        <Text style={styles.subtitle}>Already Have An Account?</Text>

        <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}


