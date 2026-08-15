import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    width,
    height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  // Header bar
  headerBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 20,
  },
  closeButton: {
    padding: 6,
  },
  demoLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: '500',
    flex: 1,
    textAlign: 'center',
  },
  // Bottom controls
  controlsBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.55)',
    zIndex: 20,
  },
  seekBarContainer: {
    marginBottom: 10,
  },
  seekBarTrack: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  seekBarFill: {
    height: '100%',
    backgroundColor: '#E50914',
    borderRadius: 2,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  timeText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  playPauseButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 30,
    padding: 12,
  },
  seekButton: {
    padding: 8,
  },
  fullscreenButton: {
    padding: 8,
    position: 'absolute',
    right: 0,
  },
  // Buffering
  bufferingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    zIndex: 10,
  },
  bufferingText: {
    color: 'rgba(255,255,255,0.6)',
    marginTop: 10,
    fontSize: 13,
  },
  // Error
  errorContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  errorText: {
    color: '#ccc',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 12,
  },
  retryButton: {
    backgroundColor: '#E50914',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
});
