import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    paddingTop: 14,
  },
  heading: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 18,
    paddingHorizontal: 16,
    letterSpacing: -0.3,
  },
  emptyText: {
    color: '#555',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 60,
  },
  listContainer: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  movieCard: {
    flex: 1,
    margin: 5,
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
    lineHeight: 17,
  },
});
