import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PasswordInput({
  value,
  onChangeText,
  placeholder = 'Password',
  focused = false,
  onFocus,
  onBlur,
  containerStyle,
}) {
  const [secure, setSecure] = useState(true);

  return (
    <View style={[styles.container, focused && styles.focused, containerStyle]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#555"
        secureTextEntry={secure}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        autoCapitalize="none"
      />
      <TouchableOpacity
        onPress={() => setSecure(s => !s)}
        style={styles.eyeButton}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons
          name={secure ? 'eye-off-outline' : 'eye-outline'}
          size={20}
          color="#666"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#2a2a2a',
    paddingHorizontal: 14,
    marginBottom: 16,
    width: '100%',
  },
  focused: {
    borderColor: '#E50914',
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 15,
    paddingVertical: 14,
  },
  eyeButton: {
    padding: 4,
  },
});
