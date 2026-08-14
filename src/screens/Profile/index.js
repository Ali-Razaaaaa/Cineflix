import React, { useState } from 'react';
import {
  View, Text, ScrollView, FlatList, Image,
  TouchableOpacity, Alert, Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { clearHistory } from '../../redux/historySlice';
import { TMDB_IMAGE_BASE_URL } from '../../constants';
import { styles } from './styles';

const PLACEHOLDER = 'https://via.placeholder.com/500x750/1a1a1a/FFFFFF?text=No+Poster';

function ConfirmModal({ visible, message, onConfirm, onCancel }) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={{
        flex: 1, backgroundColor: 'rgba(0,0,0,0.75)',
        justifyContent: 'center', alignItems: 'center', padding: 30,
      }}>
        <View style={{
          backgroundColor: '#1a1a1a', borderRadius: 14,
          padding: 24, width: '100%',
          borderWidth: 1, borderColor: '#2a2a2a',
        }}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 10 }}>
            Confirm
          </Text>
          <Text style={{ color: '#aaa', fontSize: 14, lineHeight: 21, marginBottom: 24 }}>
            {message}
          </Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              onPress={onCancel}
              style={{
                flex: 1, paddingVertical: 12, borderRadius: 8,
                backgroundColor: '#2a2a2a', alignItems: 'center',
              }}
            >
              <Text style={{ color: '#ccc', fontWeight: '600' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              style={{
                flex: 1, paddingVertical: 12, borderRadius: 8,
                backgroundColor: '#E50914', alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: '700' }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const history = useSelector(state => state.history || []);
  const favorites = useSelector(state => state.favorites || []);
  const currentUser = useSelector(state => state.auth?.currentUser);

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [clearHistoryModalVisible, setClearHistoryModalVisible] = useState(false);

  const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Cineflix User';
  const email = currentUser?.email || 'user@cineflix.app';
  const initials = displayName.slice(0, 2).toUpperCase();

  const handleLogout = () => {
    setLogoutModalVisible(false);
    // TODO: call Firebase signOut() here when auth is wired
    // import { getAuth, signOut } from '@react-native-firebase/auth';
    // signOut(getAuth()).then(() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] }));
    Alert.alert('Logged Out', 'Firebase signOut will be called here once auth is wired.');
  };

  const handleClearHistory = () => {
    dispatch(clearHistory());
    setClearHistoryModalVisible(false);
  };

  const renderMovieCard = ({ item, navigate }) => {
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Avatar & User Info */}
        <View style={styles.headerSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>

        {/* Continue Watching */}
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
            renderItem={({ item }) => renderMovieCard({ item })}
          />
        )}

        <View style={styles.divider} />

        {/* My Favorites */}
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
            renderItem={({ item }) => renderMovieCard({ item })}
          />
        )}

        <View style={styles.divider} />

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => setLogoutModalVisible(true)}>
          <Ionicons name="log-out-outline" size={20} color="#E50914" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Cineflix v1.0.0</Text>
      </ScrollView>

      {/* Logout Confirm Modal */}
      <ConfirmModal
        visible={logoutModalVisible}
        message="Are you sure you want to sign out of your Cineflix account?"
        onConfirm={handleLogout}
        onCancel={() => setLogoutModalVisible(false)}
      />

      {/* Clear History Confirm Modal */}
      <ConfirmModal
        visible={clearHistoryModalVisible}
        message="This will clear your entire watch history. This cannot be undone."
        onConfirm={handleClearHistory}
        onCancel={() => setClearHistoryModalVisible(false)}
      />
    </SafeAreaView>
  );
}
