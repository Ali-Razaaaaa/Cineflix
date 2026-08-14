import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, FlatList,
  Linking, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../redux/favoritesSlice';
import { TMDB_API_KEY, TMDB_IMAGE_BASE_URL, TMDB_BASE_URL } from '../../constants';
import { styles } from './styles';

const PLACEHOLDER = 'https://via.placeholder.com/500x750/1a1a1a/FFFFFF?text=No+Poster';

export default function CineflixHome({ navigation }) {
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites || []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [popRes, upRes, topRes] = await Promise.all([
        fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`),
        fetch(`${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1`),
        fetch(`${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`),
      ]);
      if (!popRes.ok || !upRes.ok || !topRes.ok) throw new Error('Fetch failed');
      const [popData, upData, topData] = await Promise.all([
        popRes.json(), upRes.json(), topRes.json(),
      ]);
      setPopular(popData.results || []);
      setUpcoming(upData.results || []);
      setTopRated(topData.results || []);
    } catch (err) {
      setError('Unable to load movies. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAllData(); }, []);

  const isFavorite = (movieId) => favorites.some(m => m.id === movieId);

  const handleToggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  const mainMovie = popular.length > 0 ? popular[0] : null;

  const handleHeroPlay = () => navigation.navigate('VideoPlayer');
  const handleHeroInfo = () => {
    if (mainMovie) navigation.navigate('MovieDetail', { movieId: mainMovie.id });
  };
  const handleHeroMyList = () => { if (mainMovie) handleToggleFavorite(mainMovie); };

  const renderMovieRow = (title, data) => (
    <View style={{ marginBottom: 24 }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const imageUri = item.poster_path
            ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}`
            : PLACEHOLDER;
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
              style={{ marginRight: 10 }}
            >
              <Image source={{ uri: imageUri }} style={styles.posterImage} />
              <Text style={styles.movieTitle} numberOfLines={1}>{item.title}</Text>
              <TouchableOpacity
                onPress={() => handleToggleFavorite(item)}
                style={{ position: 'absolute', top: 5, right: 5 }}
              >
                <Ionicons
                  name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
                  size={22}
                  color={isFavorite(item.id) ? '#E50914' : 'white'}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  const sections = [
    { id: 'popular', title: 'Popular Movies', data: popular },
    { id: 'upcoming', title: 'Upcoming Movies', data: upcoming },
    { id: 'top_rated', title: 'Top Rated Movies', data: topRated },
  ];

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={{ color: '#aaa', marginTop: 12 }}>Loading movies…</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 30 }]}>
        <Ionicons name="alert-circle-outline" size={48} color="#555" />
        <Text style={{ color: 'white', marginVertical: 16, textAlign: 'center', lineHeight: 22 }}>{error}</Text>
        <TouchableOpacity style={{ backgroundColor: '#E50914', padding: 12, borderRadius: 6 }} onPress={fetchAllData}>
          <Text style={{ color: 'white', fontWeight: '700' }}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const backdropUri = mainMovie?.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${mainMovie.backdrop_path}`
    : PLACEHOLDER;

  const ListHeader = () => (
    <>
      <Text style={styles.logo}>CINEFLIX</Text>

      {/* Hero Backdrop */}
      <View style={{ width: '100%', height: 380, marginBottom: 10 }}>
        <Image source={{ uri: backdropUri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.85)', '#0a0a0a']}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 200 }}
        />
      </View>

      <Text style={styles.description}>{mainMovie?.title || 'Featured Movie'}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleHeroMyList}>
          <Ionicons
            name={mainMovie && isFavorite(mainMovie.id) ? 'checkmark' : 'add'}
            size={22}
            color="white"
          />
          <Text style={styles.buttonText}>My List</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.playButton]} onPress={handleHeroPlay}>
          <Ionicons name="play" size={22} color="black" />
          <Text style={[styles.buttonText, { color: 'black' }]}>Play</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleHeroInfo}>
          <Ionicons name="information-circle-outline" size={22} color="white" />
          <Text style={styles.buttonText}>Info</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: 0 }]} edges={['top']}>
      <FlatList
        data={sections}
        keyExtractor={item => item.id}
        ListHeaderComponent={ListHeader}
        renderItem={({ item }) => renderMovieRow(item.title, item.data)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
