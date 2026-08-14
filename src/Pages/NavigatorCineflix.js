import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CineflixHome from '../screens/Home';
import CineflixSearch from '../screens/Search';
import FavoritesScreen from '../screens/Favorites';
import Popular from '../screens/Popular';

const Tab = createBottomTabNavigator();

export default function NavigatorCineflix() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#E50914',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#0d0d0d',
          borderTopColor: '#1a1a1a',
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 62,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={CineflixHome}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={CineflixSearch}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="My List"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'My List',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'heart' : 'heart-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Popular"
        component={Popular}
        options={{
          tabBarLabel: 'Popular',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'trending-up' : 'trending-up-outline'} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
