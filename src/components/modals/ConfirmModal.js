import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BaseModal from './BaseModal';

export default function ConfirmModal({
  visible,
  title = 'Confirm',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = true,
  onConfirm,
  onCancel,
}) {
  return (
    <BaseModal visible={visible} title={title} onRequestClose={onCancel}>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelText}>{cancelLabel}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.confirmButton, destructive && styles.destructive]}
          onPress={onConfirm}
        >
          <Text style={styles.confirmText}>{confirmLabel}</Text>
        </TouchableOpacity>
      </View>
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  message: {
    color: '#aaa',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
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
  confirmButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 8,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  destructive: {
    backgroundColor: '#E50914',
  },
  confirmText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
});
