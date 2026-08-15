import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BaseModal from './BaseModal';

export default function ErrorModal({ visible, title = 'Error', message, onDismiss }) {
  return (
    <BaseModal visible={visible} onRequestClose={onDismiss}>
      <Ionicons name="alert-circle-outline" size={36} color="#E50914" style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={onDismiss}>
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 8,
  },
  message: {
    color: '#aaa',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ccc',
    fontWeight: '600',
    fontSize: 14,
  },
});
