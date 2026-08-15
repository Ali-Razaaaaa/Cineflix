import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import PasswordInput from '../../components/PasswordInput';
import ErrorModal from '../../components/modals/ErrorModal';
import { styles } from './styles';
import { COLORS } from '../../constants';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showError = (msg) => {
    setErrorMessage(msg);
    setErrorVisible(true);
  };

  const handleSignup = async () => {
    if (!email || !password) {
      showError('Please enter your email and password');
      return;
    }
    if (password.length < 6) {
      showError('Password must be at least 6 characters');
      return;
    }

    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
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
      showError(message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.keyboardContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.logo}>CINEFLIX</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Enter Your Email:</Text>
          <TextInput
            style={[styles.input, emailFocused && styles.inputFocused]}
            placeholder="Email"
            placeholderTextColor={COLORS.textDim}
            value={email}
            onChangeText={setEmail}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Enter Password:</Text>
          <PasswordInput
            value={password}
            onChangeText={setPassword}
            focused={passwordFocused}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.or}>OR</Text>

          <TouchableOpacity style={styles.codeButton}>
            <Text style={styles.codeButtonText}>Use a sign-in code</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ErrorModal
        visible={errorVisible}
        message={errorMessage}
        onDismiss={() => setErrorVisible(false)}
      />
    </View>
  );
};

export default Signup;
