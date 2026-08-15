import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from '../screens/Splash';
import HomeScreen from '../screens/HomeScreen';
import Signup from '../screens/Auth/Signup';
import Login from '../screens/Auth/Login';
import MainTabs from './MainTabs';
import MovieDetail from '../screens/MovieDetail';
import VideoPlayer from '../screens/VideoPlayer';
import { Provider } from 'react-redux';
import store, { persistor } from '../redux/store';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

function LoadingScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0a0a0a', justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#E50914" />
    </View>
  );
}

export default function RootNavigator() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authInstance = getAuth();
    const subscriber = onAuthStateChanged(authInstance, (currentUser) => {
      setUser(currentUser);
    });
    const timer = setTimeout(() => setIsSplashVisible(false), 1000);
    return () => {
      if (subscriber) subscriber();
      clearTimeout(timer);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isSplashVisible ? (
              <Stack.Screen name="Splash" component={SplashScreen} />
            ) : user ? (
              <>
                <Stack.Screen name="NavigatorCineflix" component={MainTabs} />
                <Stack.Screen
                  name="MovieDetail"
                  component={MovieDetail}
                  options={{ animation: 'slide_from_bottom' }}
                />
                <Stack.Screen
                  name="VideoPlayer"
                  component={VideoPlayer}
                  options={{ animation: 'fade', presentation: 'modal' }}
                />
              </>
            ) : (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Login" component={Login} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
