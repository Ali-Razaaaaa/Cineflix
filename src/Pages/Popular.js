import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, HttpLink } from '@apollo/client';

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
      renderItem={({ item }) => (
        <View style={styles.card}>
          {item.poster && <Image source={{ uri: item.poster }} style={styles.poster} />}
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.filmTitle}>{item.title}</Text>
            <Text style={styles.cardText}>Release: {item.releaseDate}</Text>
            <Text style={styles.cardText}>Rating: {item.rating}</Text>
            <Text numberOfLines={3} style={[styles.cardText, { marginTop: 5 }]}>{item.overview}</Text>
          </View>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}

export default function Popular() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text style={styles.title}>Popular Movies</Text>
        <MoviesList />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: 'black' },
  loader: { marginTop: 50 },
  errorText: { color: 'red', marginTop: 50, textAlign: 'center', fontSize: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', color: 'white' },
  card: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#1c1c1c',
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 6,
  },
  filmTitle: { fontWeight: 'bold', fontSize: 18, color: 'white' },
  cardText: { color: '#ccc', fontSize: 13 },
});
