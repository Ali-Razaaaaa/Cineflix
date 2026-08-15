import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

import { TMDB_BASE_URL, TMDB_ACCESS_TOKEN, TMDB_IMAGE_BASE_URL } from '../../constants';

export default function Popular() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
          }
        });
        const result = await response.json();
        if (result.success === false) {
          throw new Error(result.status_message);
        }
        // Map TMDB response to the format expected by the UI
        const mappedMovies = (result.results || []).map(m => ({
          id: m.id,
          title: m.title,
          releaseDate: m.release_date,
          overview: m.overview,
          poster: m.poster_path ? `${TMDB_IMAGE_BASE_URL}${m.poster_path}` : null,
          rating: m.vote_average
        }));
        setData(mappedMovies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const renderContent = () => {
    if (loading) return <ActivityIndicator style={styles.loader} size="large" color="red" />;
    if (error) return <Text style={styles.errorText}>Error: {error}</Text>;

    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const imageUri = item.poster || 'https://via.placeholder.com/500x750/333333/FFFFFF?text=No+Poster';
          return (
            <View style={styles.card}>
              <Image source={{ uri: imageUri }} style={styles.poster} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.filmTitle}>{item.title}</Text>
                <Text style={styles.cardText}>Release: {item.releaseDate}</Text>
                <Text style={styles.cardText}>Rating: {item.rating}</Text>
                <Text numberOfLines={3} style={[styles.cardText, { marginTop: 5 }]}>{item.overview}</Text>
              </View>
            </View>
          );
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Popular Movies</Text>
      {renderContent()}
    </SafeAreaView>
  );
}
