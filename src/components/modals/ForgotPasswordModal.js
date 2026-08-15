import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { getAuth, sendPasswordResetEmail } from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BaseModal from './BaseModal';

export default function ForgotPasswordModal({ visible, onClose }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async () => {
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await sendPasswordResetEmail(getAuth(), email.trim());
      setSent(true);
    } catch (err) {
      let msg = 'Failed to send reset email. Please try again.';
      if (err.code === 'auth/invalid-email') msg = 'Please enter a valid email address.';
      if (err.code === 'auth/user-not-found') msg = 'No account found with this email.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setSent(false);
    setError(null);
    onClose();
  };

  return (
    <BaseModal visible={visible} title="Reset Password" onRequestClose={handleClose}>
      {sent ? (
        <>
          <Ionicons
            name="checkmark-circle-outline"
            size={40}
            color="#4caf50"
            style={styles.successIcon}
          />
          <Text style={styles.successText}>
            Reset email sent to {email.trim()}. Check your inbox.
          </Text>
          <TouchableOpacity style={styles.doneButton} onPress={handleClose}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.description}>
            Enter your email and we'll send a link to reset your password.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#555"
            value={email}
            onChangeText={text => {
              setEmail(text);
              setError(null);
            }}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.row}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sendButton, loading && styles.sendDisabled]}
              onPress={handleSend}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.sendText}>Send Email</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  description: {
    color: '#aaa',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#111',
    color: 'white',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    borderWidth: 1.5,
    borderColor: '#333',
    marginBottom: 8,
  },
  errorText: {
    color: '#E50914',
    fontSize: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 8,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
  },
  cancelText: {
    color: '#ccc',
    fontWeight: '600',
    fontSize: 14,
  },
  sendButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 8,
    backgroundColor: '#E50914',
    alignItems: 'center',
  },
  sendDisabled: {
    opacity: 0.6,
  },
  sendText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  successIcon: {
    alignSelf: 'center',
    marginBottom: 14,
  },
  successText: {
    color: '#aaa',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 24,
  },
  doneButton: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#ccc',
    fontWeight: '600',
    fontSize: 14,
  },
});
