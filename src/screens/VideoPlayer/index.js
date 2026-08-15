import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DEMO_VIDEO_URL, VIDEO_REQUEST_HEADERS } from '../../constants';
import { styles } from './styles';
const { width } = Dimensions.get('window');

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function VideoPlayer({ navigation }) {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [buffering, setBuffering] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlTimeout = useRef(null);

  const progress = duration > 0 ? currentTime / duration : 0;

  const resetControlTimeout = useCallback(() => {
    clearTimeout(controlTimeout.current);
    controlTimeout.current = setTimeout(() => setShowControls(false), 3500);
  }, []);

  const toggleControls = () => {
    setShowControls(prev => {
      if (!prev) {
        resetControlTimeout();
        return true;
      }
      clearTimeout(controlTimeout.current);
      return false;
    });
  };

  const togglePlayPause = () => {
    setPaused(p => !p);
    resetControlTimeout();
  };

  const seekForward = () => {
    if (videoRef.current) {
      videoRef.current.seek(Math.min(currentTime + 10, duration));
    }
    resetControlTimeout();
  };

  const seekBackward = () => {
    if (videoRef.current) {
      videoRef.current.seek(Math.max(currentTime - 10, 0));
    }
    resetControlTimeout();
  };

  const handleSeekBarPress = e => {
    const { locationX } = e.nativeEvent;
    const percent = locationX / width;
    if (videoRef.current) {
      videoRef.current.seek(percent * duration);
    }
    resetControlTimeout();
  };

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={52} color="#555" />
        <Text style={styles.errorText}>
          Could not load the video. Please try again.
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => setError(false)}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Video
        ref={videoRef}
        source={{ uri: DEMO_VIDEO_URL, headers: VIDEO_REQUEST_HEADERS }}
        style={styles.video}
        resizeMode="contain"
        paused={paused}
        onBuffer={({ isBuffering }) => setBuffering(isBuffering)}
        onProgress={({ currentTime: t }) => setCurrentTime(t)}
        onLoad={({ duration: d }) => {
          setDuration(d);
          setBuffering(false);
          resetControlTimeout();
        }}
        onError={() => setError(true)}
        repeat={false}
      />

      {/* Tap to toggle controls */}
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={toggleControls}
      />

      {/* Buffering Spinner */}
      {buffering && (
        <View style={styles.bufferingOverlay}>
          <ActivityIndicator size="large" color="#E50914" />
          <Text style={styles.bufferingText}>Buffering…</Text>
        </View>
      )}

      {/* Controls — shown/hidden */}
      {showControls && (
        <>
          {/* Header */}
          <SafeAreaView style={styles.headerBar} edges={['top']}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="close" size={26} color="white" />
            </TouchableOpacity>
            <Text style={styles.demoLabel}>Demo playback — sample content</Text>
            <View style={{ width: 38 }} />
          </SafeAreaView>

          {/* Bottom Controls */}
          <SafeAreaView style={styles.controlsBar} edges={['bottom']}>
            {/* Seek Bar */}
            <View style={styles.seekBarContainer}>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.seekBarTrack}
                onPress={handleSeekBarPress}
              >
                <View
                  style={[styles.seekBarFill, { width: `${progress * 100}%` }]}
                />
              </TouchableOpacity>
              <View style={styles.timeRow}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
              </View>
            </View>

            {/* Buttons Row */}
            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={styles.seekButton}
                onPress={seekBackward}
              >
                <Ionicons name="play-back" size={24} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.playPauseButton}
                onPress={togglePlayPause}
              >
                <Ionicons
                  name={paused ? 'play' : 'pause'}
                  size={30}
                  color="white"
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.seekButton} onPress={seekForward}>
                <Ionicons name="play-forward" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </>
      )}
    </View>
  );
}
