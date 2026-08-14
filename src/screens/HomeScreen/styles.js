import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  background: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logo: {
    color: 'red',
    fontSize: 45,
    fontWeight: 'bold',
  },
  topRight: {
    flexDirection: 'row',
    gap: 15,
  },
  topText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 15,
  },
  content: {
    position: 'absolute',
    bottom: 80,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    marginTop: 20,
    fontSize: 14,
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 20,
    paddingHorizontal: 120,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
