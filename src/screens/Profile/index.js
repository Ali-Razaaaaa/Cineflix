import React, { useState } from 'react';
import {
  View, Text, ScrollView, FlatList, Image,
  TouchableOpacity, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { clearHistory } from '../../redux/historySlice';
import { TMDB_IMAGE_BASE_URL } from '../../constants';
import ConfirmModal from '../../components/modals/ConfirmModal';
import { styles } from './styles';

const PLACEHOLDER = 'https://via.placeholder.com/500x750/1a1a1a/FFFFFF?text=No+Poster';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const history = useSelector(state => state.history || []);
  const favorites = useSelector(state => state.favorites || []);
  const currentUser = getAuth().currentUser;

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [clearHistoryModalVisible, setClearHistoryModalVisible] = useState(false);

  const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Cineflix User';
  const email = currentUser?.email || 'user@cineflix.app';
  const initials = displayName.slice(0, 2).toUpperCase();

  const handleLogout = async () => {
    setLogoutModalVisible(false);
    try {
      await signOut(getAuth());
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  const handleClearHistory = () => {
    dispatch(clearHistory());
    setClearHistoryModalVisible(false);
  };

  const renderMovieCard = ({ item }) => {
    const imageUri = item.poster_path ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}` : PLACEHOLDER;
    return (
      <TouchableOpacity
        style={styles.horizontalCard}
        onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
      >
        <Image source={{ uri: imageUri }} style={styles.horizontalPoster} resizeMode="cover" />
        <Text style={styles.horizontalTitle} numberOfLines={2}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerSection}>
      <View style={styles.avatarCircle}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <Text style={styles.userName}>{displayName}</Text>
      <Text style={styles.userEmail}>{email}</Text>
    </View>
  );

  const renderHistory = () => (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Continue Watching</Text>
        {history.length > 0 && (
          <TouchableOpacity onPress={() => setClearHistoryModalVisible(true)}>
            <Text style={{ color: '#555', fontSize: 12 }}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
      {history.length === 0 ? (
        <View style={styles.emptyRow}>
          <Text style={styles.emptyText}>No watch history yet. Open a movie to start.</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          horizontal
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 16 }}
          renderItem={renderMovieCard}
        />
      )}
    </>
  );

  const renderFavorites = () => (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My List</Text>
        <Text style={styles.sectionCount}>{favorites.length} movies</Text>
      </View>
      {favorites.length === 0 ? (
        <View style={styles.emptyRow}>
          <Text style={styles.emptyText}>No favorites yet. Tap ♥ on any movie.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          horizontal
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 16 }}
          renderItem={renderMovieCard}
        />
      )}
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {renderHeader()}
        {renderHistory()}
        <View style={styles.divider} />
        {renderFavorites()}
        <View style={styles.divider} />

        <TouchableOpacity style={styles.logoutButton} onPress={() => setLogoutModalVisible(true)}>
          <Ionicons name="log-out-outline" size={20} color="#E50914" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Cineflix v1.0.0</Text>
      </ScrollView>

      <ConfirmModal
        visible={logoutModalVisible}
        message="Are you sure you want to sign out of your Cineflix account?"
        onConfirm={handleLogout}
        onCancel={() => setLogoutModalVisible(false)}
      />

      <ConfirmModal
        visible={clearHistoryModalVisible}
        message="This will clear your entire watch history. This cannot be undone."
        onConfirm={handleClearHistory}
        onCancel={() => setClearHistoryModalVisible(false)}
      />
    </SafeAreaView>
  );
}
