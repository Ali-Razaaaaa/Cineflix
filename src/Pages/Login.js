import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your email and password');
      return;
    }

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email.trim(), password);

      Alert.alert('Success', 'Login successful');

      navigation.navigate('NavigatorCineflix');
    } catch (error) {
      console.log('Firebase Login Error:', error);

      let message = 'Login failed';

      switch (error.code) {
        case 'auth/invalid-email':
          message = 'Invalid email address';
          break;

        case 'auth/invalid-credential':
          message = 'Invalid email or password';
          break;

        case 'auth/user-not-found':
          message = 'No account found with this email';
          break;

        case 'auth/wrong-password':
          message = 'Incorrect password';
          break;

        case 'auth/too-many-requests':
          message = 'Too many attempts. Try again later.';
          break;
      }

      Alert.alert('Login Error', message);
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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
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

export default Login;
