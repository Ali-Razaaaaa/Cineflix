import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  Image, ActivityIndicator, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TMDB_API_KEY, TMDB_IMAGE_BASE_URL, TMDB_BASE_URL } from '../../constants';
import { styles } from './styles';

const PLACEHOLDER = 'https://via.placeholder.com/500x750/1a1a1a/FFFFFF?text=No+Poster';

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
      setError('Unable to fetch results. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderEmptyState = () => {
    if (loading) return null;
    if (error) {
      return (
        <View style={{ alignItems: 'center', marginTop: 60, paddingHorizontal: 20 }}>
          <Ionicons name="alert-circle-outline" size={48} color="#555" />
          <Text style={{ color: '#ccc', marginVertical: 14, textAlign: 'center', lineHeight: 22 }}>{error}</Text>
          <TouchableOpacity style={{ backgroundColor: '#E50914', padding: 12, borderRadius: 6 }} onPress={searchMovies}>
            <Text style={{ color: 'white', fontWeight: '700' }}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (hasSearched && results.length === 0) {
      return (
        <View style={{ alignItems: 'center', marginTop: 60 }}>
          <Ionicons name="film-outline" size={52} color="#444" />
          <Text style={{ color: '#888', fontSize: 16, marginTop: 14 }}>No results for "{query}"</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Search movies…"
          placeholderTextColor="#666"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={searchMovies}
          returnKeyType="search"
          autoCorrect={false}
        />
        <TouchableOpacity onPress={searchMovies} style={styles.searchButton}>
          <Ionicons name="search" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {loading && (
        <ActivityIndicator size="large" color="#E50914" style={{ marginTop: 30 }} />
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const imageUri = item.poster_path
            ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}`
            : PLACEHOLDER;
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
              style={styles.resultItem}
            >
              <Image source={{ uri: imageUri }} style={styles.poster} />
              <Text style={styles.movieTitle} numberOfLines={2}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
        numColumns={2}
        contentContainerStyle={[styles.resultsContainer, results.length === 0 && { flex: 1 }]}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
