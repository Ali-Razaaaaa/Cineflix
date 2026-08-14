import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    paddingTop: 14,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 16,
    paddingHorizontal: 16,
    letterSpacing: -0.3,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 18,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    paddingHorizontal: 14,
    gap: 8,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 15,
    paddingVertical: 13,
  },
  searchButton: {
    padding: 4,
  },
  resultsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  resultItem: {
    flex: 1,
    margin: 6,
    alignItems: 'center',
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 10,
    backgroundColor: '#1a1a1a',
  },
  movieTitle: {
    color: '#ccc',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 4,
    lineHeight: 17,
  },
});
