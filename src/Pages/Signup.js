import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your email and password');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    try {
      await auth().createUserWithEmailAndPassword(email.trim(), password);

      Alert.alert('Success', 'Account created successfully');

      navigation.navigate('NavigatorCineflix');
    } catch (error) {
      console.log('Firebase Signup Error:', error);

      let message = 'Signup failed';

      switch (error.code) {
        case 'auth/invalid-email':
          message = 'Invalid email address';
          break;

        case 'auth/email-already-in-use':
          message = 'An account already exists with this email';
          break;

        case 'auth/weak-password':
          message = 'Password is too weak';
          break;
      }

      Alert.alert('Signup Error', message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>CINEFLIX</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Enter Your Email:</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Enter Password:</Text>

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.or}>OR</Text>

        <TouchableOpacity style={styles.codeButton}>
          <Text style={styles.codeButtonText}>Use a sign-in code</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  logo: {
    color: 'red',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 40,
    alignSelf: 'flex-start',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'flex-start',
    width: '100%',
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  or: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  codeButton: {
    backgroundColor: '#555',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  codeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    width: '100%',
  },
});

export default Signup;
