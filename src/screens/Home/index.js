import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, FlatList,
  Linking, ActivityIndicator, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../redux/favoritesSlice';
import { TMDB_API_KEY, TMDB_IMAGE_BASE_URL, TMDB_BASE_URL } from '../../constants';
import { styles } from './styles';

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

      if (!popRes.ok || !upRes.ok || !topRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const popData = await popRes.json();
      const upData = await upRes.json();
      const topData = await topRes.json();

      setPopular(popData.results);
      setUpcoming(upData.results);
      setTopRated(topData.results);
    } catch (err) {
      console.error(err);
      setError('Unable to load movies. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const isFavorite = (movieId) => favorites.some(m => m.id === movieId);

  const handleToggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  const openYouTubeTrailer = async (movieId) => {
    try {
      const res = await fetch(`${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=en-US`);
      const json = await res.json();
      const trailer = json.results.find((vid) => vid.type === 'Trailer' && vid.site === 'YouTube');
      if (trailer) {
        Linking.openURL(`https://www.youtube.com/watch?v=${trailer.key}`);
      } else {
        Alert.alert('Not Available', 'No trailer available for this movie.');
      }
    } catch (error) {
      console.error('Error opening trailer:', error);
      Alert.alert('Error', 'Failed to load trailer.');
    }
  };

  const mainMovie = popular.length > 0 ? popular[0] : null;

  const handleHeroPlay = () => {
    if (mainMovie) {
       Alert.alert('Play', 'VideoPlayer module coming soon.');
    }
  };
  
  const handleHeroInfo = () => {
    if (mainMovie) {
       Alert.alert('Info', 'MovieDetail module coming soon.');
    }
  };

  const handleHeroMyList = () => {
    if (mainMovie) {
      handleToggleFavorite(mainMovie);
    }
  };

  const renderMovieRow = (title, data) => (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const imageUri = item.poster_path 
            ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}`
            : 'https://via.placeholder.com/500x750/333333/FFFFFF?text=No+Poster';
          return (
            <TouchableOpacity onPress={() => openYouTubeTrailer(item.id)} style={{ marginRight: 10 }}>
              <Image source={{ uri: imageUri }} style={styles.posterImage} />
              <Text style={styles.movieTitle} numberOfLines={1}>{item.title}</Text>
              <TouchableOpacity
                onPress={() => handleToggleFavorite(item)}
                style={{ position: 'absolute', top: 5, right: 5 }}
              >
                <Ionicons
                  name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
                  size={24}
                  color={isFavorite(item.id) ? 'red' : 'white'}
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
        <ActivityIndicator size="large" color="red" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: 'white', marginBottom: 20, textAlign: 'center' }}>{error}</Text>
        <TouchableOpacity style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }} onPress={fetchAllData}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const ListHeader = () => (
    <>
      <Text style={styles.logo}>CINEFLIX</Text>
      {mainMovie && (
        <Image
          source={{ uri: mainMovie.poster_path ? `${TMDB_IMAGE_BASE_URL}${mainMovie.poster_path}` : 'https://via.placeholder.com/500x750/333333/FFFFFF?text=No+Poster' }}
          style={styles.mainPoster}
          resizeMode="cover"
        />
      )}
      <Text style={styles.description}>Charming Feel-Good Dramedy Movie</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleHeroMyList}>
          <Ionicons name={mainMovie && isFavorite(mainMovie.id) ? 'checkmark' : 'add'} size={20} color="white" />
          <Text style={styles.buttonText}>My List</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.playButton]} onPress={handleHeroPlay}>
          <Ionicons name="play" size={20} color="black" />
          <Text style={[styles.buttonText, { color: 'black' }]}>Play</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleHeroInfo}>
          <Ionicons name="information-circle-outline" size={20} color="white" />
          <Text style={styles.buttonText}>Info</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sections}
        keyExtractor={item => item.id}
        ListHeaderComponent={ListHeader}
        renderItem={({ item }) => renderMovieRow(item.title, item.data)}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
