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
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: 'black' },
      }}
    >
      <Tab.Screen
        name="CineflixHome"
        component={CineflixHome}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CineflixSearch"
        component={CineflixSearch}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'heart' : 'heart-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Popular"
        component={Popular}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'trending-up' : 'trending-up-outline'} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
