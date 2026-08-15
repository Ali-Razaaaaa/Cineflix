import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  logo: {
    color: '#E50914',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 0,
    paddingHorizontal: 16,
    paddingTop: 14,
    letterSpacing: 2,
  },
  description: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
    paddingHorizontal: 20,
    letterSpacing: -0.3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    marginTop: 8,
    marginBottom: 28,
    paddingHorizontal: 16,
  },
  button: {
    alignItems: 'center',
    gap: 4,
  },
  playButton: {
    backgroundColor: 'white',
    paddingHorizontal: 36,
    paddingVertical: 10,
    borderRadius: 6,
    flexDirection: 'row',
    gap: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 10,
    paddingHorizontal: 16,
    letterSpacing: -0.2,
  },
  posterImage: {
    width: 116,
    height: 174,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
  },
  movieTitle: {
    color: '#ccc',
    width: 116,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 5,
    lineHeight: 15,
  },
  homeScreenImageStyle: {
    width: '100%',
    height: '100%',
  },
});
