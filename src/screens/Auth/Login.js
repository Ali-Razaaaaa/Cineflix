import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import PasswordInput from '../../components/PasswordInput';
import ErrorModal from '../../components/modals/ErrorModal';
import ForgotPasswordModal from '../../components/modals/ForgotPasswordModal';
import { styles } from './styles';
import { COLORS } from '../../constants';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);

  const showError = msg => {
    setErrorMessage(msg);
    setErrorVisible(true);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showError('Please enter your email and password');
      return;
    }

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
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

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.or}>OR</Text>

          <TouchableOpacity style={styles.codeButton}>
            <Text style={styles.codeButtonText}>Use a sign-in code</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setForgotPasswordVisible(true)}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ErrorModal
        visible={errorVisible}
        message={errorMessage}
        onDismiss={() => setErrorVisible(false)}
      />

      <ForgotPasswordModal
        visible={forgotPasswordVisible}
        onClose={() => setForgotPasswordVisible(false)}
      />
    </View>
  );
};

export default Login;
