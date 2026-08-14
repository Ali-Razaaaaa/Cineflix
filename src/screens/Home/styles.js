import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  logo: {
    color: 'red',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingLeft: 10,
  },
  mainPoster: {
    width: '100%',
    height: 370,
    marginBottom: 20,
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  button: {
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: 'white',
    paddingHorizontal: 40,
    paddingVertical: 5,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  posterImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  movieTitle: {
    color: 'white',
    width: 120,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
});
