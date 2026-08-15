import { styles } from './styles';
import React from 'react';
import { View, Text, ImageBackground, Pressable, Linking, Alert } from 'react-native';

export default function HomeScreen({ navigation }) {
  const openPrivacy = () => {
    Linking.openURL('https://policies.google.com/privacy').catch(() =>
      Alert.alert('Error', 'Could not open privacy policy')
    );
  };

  return (
    <ImageBackground
      source={require('../../../assets/image.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.header}>
        <Text style={styles.logo}>C</Text>
        <View style={styles.topRight}>
          <Pressable onPress={openPrivacy}>
            <Text style={styles.topText}>PRIVACY</Text>
          </Pressable>
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

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}
