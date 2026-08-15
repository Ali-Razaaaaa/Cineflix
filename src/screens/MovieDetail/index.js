import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../redux/favoritesSlice';
import { addToHistory } from '../../redux/historySlice';

import { styles } from './styles';
import { TMDB_BASE_URL, TMDB_ACCESS_TOKEN } from '../../constants';
const PLACEHOLDER =
  'https://via.placeholder.com/500x750/1a1a1a/FFFFFF?text=No+Poster';
const BACKDROP_PLACEHOLDER =
  'https://via.placeholder.com/1280x720/1a1a1a/FFFFFF?text=No+Image';

export default function MovieDetail({ navigation, route }) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites || []);
  const isFavorite = favorites.some(m => m.id === movieId);

  const fetchDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/${movieId}?language=en-US&append_to_response=credits,similar`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
            accept: 'application/json',
          },
        },
      );
      if (!response.ok) throw new Error('Failed to fetch movie details');
      const data = await response.json();
      setMovie(data);
      dispatch(
        addToHistory({
          id: data.id,
          title: data.title,
          poster_path: data.poster_path,
        }),
      );
    } catch (err) {
      setError('Could not load movie details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [movieId]);

  const handleToggleFavorite = () => {
    if (!movie) return;
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(
        addFavorite({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        }),
      );
    }
  };

  const handlePlay = () => {
    navigation.navigate('VideoPlayer');
  };

  const formatRuntime = minutes => {
    if (!minutes) return 'N/A';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const formatDate = dateStr => {
    if (!dateStr) return 'Unknown';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Loading details…</Text>
      </SafeAreaView>
    );
  }

  if (error || !movie) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Ionicons
          name="alert-circle-outline"
          size={48}
          color="#555"
          style={{ marginBottom: 12 }}
        />
        <Text style={styles.errorText}>{error || 'Something went wrong.'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchDetail}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const backdropUri = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : BACKDROP_PLACEHOLDER;

  const topCast = movie.credits?.cast?.slice(0, 15) || [];
  const similarMovies = movie.similar?.results?.slice(0, 15) || [];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Backdrop */}
      <View style={styles.backdropContainer}>
        <Image
          source={{ uri: backdropUri }}
          style={styles.backdrop}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', '#0a0a0a']}
          style={styles.backdropOverlay}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.contentScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          {/* Title + Favorite */}
          <View style={styles.titleRow}>
            <Text style={styles.title}>{movie.title}</Text>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={handleToggleFavorite}
            >
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={26}
                color={isFavorite ? '#E50914' : '#888'}
              />
            </TouchableOpacity>
          </View>

          {/* Meta Info */}
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>
              {formatDate(movie.release_date)}
            </Text>
            <Text style={styles.metaText}>•</Text>
            <Text style={styles.metaText}>{formatRuntime(movie.runtime)}</Text>
            <Text style={styles.metaText}>•</Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={13} color="#f5c518" />
              <Text style={styles.ratingText}>
                {movie.vote_average?.toFixed(1)} / 10
              </Text>
            </View>
          </View>

          {/* Genres */}
          {movie.genres?.length > 0 && (
            <View style={styles.genresRow}>
              {movie.genres.map(g => (
                <View key={g.id} style={styles.genreChip}>
                  <Text style={styles.genreText}>{g.name}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Overview */}
          <Text style={styles.overview}>
            {movie.overview || 'No overview available.'}
          </Text>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
              <Ionicons name="play" size={20} color="white" />
              <Text style={styles.playButtonText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.myListButton}
              onPress={handleToggleFavorite}
            >
              <Ionicons
                name={isFavorite ? 'checkmark' : 'add'}
                size={20}
                color="white"
              />
              <Text style={styles.myListButtonText}>
                {isFavorite ? 'In My List' : 'My List'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Cast */}
          {topCast.length > 0 && (
            <>
              <View style={styles.divider} />
              <Text style={styles.sectionTitle}>Top Cast</Text>
              <FlatList
                data={topCast}
                horizontal
                keyExtractor={item =>
                  item.cast_id?.toString() || item.id?.toString()
                }
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  const avatarUri = item.profile_path
                    ? `${TMDB_IMAGE_BASE_URL}${item.profile_path}`
                    : 'https://via.placeholder.com/200x200/1a1a1a/FFFFFF?text=?';
                  return (
                    <View style={styles.castCard}>
                      <Image
                        source={{ uri: avatarUri }}
                        style={styles.castAvatar}
                      />
                      <Text style={styles.castName} numberOfLines={2}>
                        {item.name}
                      </Text>
                      <Text style={styles.castCharacter} numberOfLines={1}>
                        {item.character}
                      </Text>
                    </View>
                  );
                }}
              />
            </>
          )}

          {/* Similar Movies */}
          {similarMovies.length > 0 && (
            <>
              <View style={styles.divider} />
              <Text style={styles.sectionTitle}>Similar Movies</Text>
              <FlatList
                data={similarMovies}
                horizontal
                keyExtractor={item => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  const posterUri = item.poster_path
                    ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}`
                    : PLACEHOLDER;
                  return (
                    <TouchableOpacity
                      style={styles.similarCard}
                      onPress={() =>
                        navigation.push('MovieDetail', { movieId: item.id })
                      }
                    >
                      <Image
                        source={{ uri: posterUri }}
                        style={styles.similarPoster}
                        resizeMode="cover"
                      />
                      <Text style={styles.similarTitle} numberOfLines={2}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </>
          )}

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
