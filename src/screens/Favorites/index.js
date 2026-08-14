import { styles } from './styles';
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

export default function FavoritesScreen() {
  const favorites = useSelector(state => state.favorites);

  const renderItem = ({ item }) => (
    <View style={styles.movieCard}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
        resizeMode="cover"
      />
      <Text style={styles.movieTitle} numberOfLines={1}>
        {item.title}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
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
    </View>
  );
}


