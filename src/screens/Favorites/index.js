import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { TMDB_IMAGE_BASE_URL } from '../../constants';
import { styles } from './styles';

export default function FavoritesScreen() {
  const favorites = useSelector(state => state.favorites || []);

  const renderItem = ({ item }) => {
    const imageUri = item.poster_path 
      ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}`
      : 'https://via.placeholder.com/500x750/333333/FFFFFF?text=No+Poster';

    return (
      <View style={styles.movieCard}>
        <Image
          source={{ uri: imageUri }}
          style={styles.poster}
          resizeMode="cover"
        />
        <Text style={styles.movieTitle} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Your Favorite Movies</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites added yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}
