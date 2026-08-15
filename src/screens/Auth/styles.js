import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  logo: {
    color: COLORS.primary,
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 80,
    alignSelf: 'center',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  label: {
    color: COLORS.text,
    fontSize: 14,
    marginBottom: 8,
    alignSelf: 'flex-start',
    fontWeight: '600',
  },
  input: {
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 16,
    width: '100%',
    fontSize: 15,
  },
  inputFocused: {
    borderColor: COLORS.primary,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  or: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  codeButton: {
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  codeButtonText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
  },
  forgotPassword: {
    color: COLORS.textMuted,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    width: '100%',
    padding: 10,
  },
});
