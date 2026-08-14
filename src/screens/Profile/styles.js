import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  // Header
  headerSection: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 28,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E50914',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
  },
  userName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  userEmail: {
    color: '#666',
    fontSize: 13,
  },
  // Sections
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 26,
    paddingBottom: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  sectionCount: {
    color: '#555',
    fontSize: 13,
  },
  // Movie cards — horizontal list
  horizontalCard: {
    marginLeft: 16,
    width: 100,
  },
  horizontalPoster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    marginBottom: 6,
  },
  horizontalTitle: {
    color: '#ccc',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 15,
  },
  emptyRow: {
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  emptyText: {
    color: '#444',
    fontSize: 13,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: '#1a1a1a',
    marginTop: 26,
    marginHorizontal: 0,
  },
  // Logout
  logoutButton: {
    marginHorizontal: 16,
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1a1a1a',
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  logoutText: {
    color: '#E50914',
    fontSize: 15,
    fontWeight: '700',
  },
  // App version
  versionText: {
    color: '#333',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 28,
  },
});
