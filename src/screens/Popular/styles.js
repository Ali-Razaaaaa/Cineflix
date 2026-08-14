import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: 'black' },
  loader: { marginTop: 50 },
  errorText: { color: 'red', marginTop: 50, textAlign: 'center', fontSize: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', color: 'white' },
  card: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#1c1c1c',
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 6,
  },
  filmTitle: { fontWeight: 'bold', fontSize: 18, color: 'white' },
  cardText: { color: '#ccc', fontSize: 13 },
});
