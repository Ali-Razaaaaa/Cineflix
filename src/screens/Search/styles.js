import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 16,
  },
  title: {
    color: 'red',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#222',
    color: 'white',
    paddingHorizontal: 15,
    borderRadius: 8,
    height: 45,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  resultsContainer: {
    paddingBottom: 40,
  },
  resultItem: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
  },
  poster: {
    width: 140,
    height: 200,
    borderRadius: 10,
  },
  movieTitle: {
    color: 'white',
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    width: 140,
  },
});
