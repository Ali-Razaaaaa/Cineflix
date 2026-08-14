import React from 'react';
import { View, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, HttpLink } from '@apollo/client';
import { styles } from './styles';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://cineflix-backend-graphql-production.up.railway.app/graphql',
  }),
  cache: new InMemoryCache(),
});

const GET_MOVIES = gql`
  query {
    movies {
      id
      title
      releaseDate
      overview
      poster
      rating
    }
  }
`;

function MoviesList() {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <ActivityIndicator style={styles.loader} size="large" color="red" />;
  if (error) return <Text style={styles.errorText}>Error: {error.message}</Text>;

  return (
    <FlatList
      data={data.movies}
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
}

export default function Popular() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Popular Movies</Text>
        <MoviesList />
      </SafeAreaView>
    </ApolloProvider>
  );
}
