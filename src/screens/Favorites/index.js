import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { TMDB_IMAGE_BASE_URL } from '../../constants';
import { styles } from './styles';

const PLACEHOLDER = 'https://via.placeholder.com/500x750/1a1a1a/FFFFFF?text=No+Poster';

export default function FavoritesScreen({ navigation }) {
  const favorites = useSelector(state => state.favorites || []);

  const renderItem = ({ item }) => {
    const imageUri = item.poster_path
      ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}`
      : PLACEHOLDER;

    return (
      <TouchableOpacity
        style={styles.movieCard}
        onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
      >
        <Image source={{ uri: imageUri }} style={styles.poster} resizeMode="cover" />
        <Text style={styles.movieTitle} numberOfLines={2}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>My List</Text>
      {favorites.length === 0 ? (
        <View style={{ alignItems: 'center', marginTop: 60 }}>
          <Ionicons name="heart-outline" size={52} color="#333" />
          <Text style={styles.emptyText}>No favorites yet.{'\n'}Tap ♥ on any movie to add it.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}
