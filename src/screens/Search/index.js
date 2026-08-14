import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  Image, Linking, ActivityIndicator, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TMDB_API_KEY, TMDB_IMAGE_BASE_URL, TMDB_BASE_URL } from '../../constants';
import { styles } from './styles';

export default function CineflixSearch({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchMovies = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Search failed');
      const json = await response.json();
      setResults(json.results || []);
    } catch (err) {
      console.error('Search error:', err);
      setError('Unable to fetch search results. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const openTrailer = async (movieId) => {
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
      console.error('Trailer error:', error);
      Alert.alert('Error', 'Failed to load trailer.');
    }
  };

  const renderEmptyState = () => {
    if (loading) return null;
    if (error) {
      return (
        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Text style={{ color: 'white', marginBottom: 20 }}>{error}</Text>
          <TouchableOpacity style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }} onPress={searchMovies}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (hasSearched && results.length === 0) {
      return (
        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Text style={{ color: 'white', fontSize: 16 }}>No results found for "{query}"</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Search Movies</Text>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter movie name"
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={searchMovies}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={searchMovies} style={styles.searchButton}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {loading && (
        <ActivityIndicator size="large" color="red" style={{ marginTop: 20 }} />
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const imageUri = item.poster_path 
            ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}`
            : 'https://via.placeholder.com/500x750/333333/FFFFFF?text=No+Poster';
          return (
            <TouchableOpacity onPress={() => openTrailer(item.id)} style={styles.resultItem}>
              <Image source={{ uri: imageUri }} style={styles.poster} />
              <Text style={styles.movieTitle} numberOfLines={2}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
        numColumns={2}
        contentContainerStyle={[styles.resultsContainer, results.length === 0 && { flex: 1 }]}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
}
