import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyText: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  listContainer: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  movieCard: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    alignItems: 'center',
    padding: 10,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  movieTitle: {
    flex: 1,
    color: 'white',
    fontSize: 18,
    marginLeft: 15,
    fontWeight: '600',
  },
});
