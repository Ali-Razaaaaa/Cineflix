import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from './src/screens/Splash';
import HomeScreen from './src/screens/HomeScreen';
import Signup from './src/Pages/Signup';
import Login from './src/Pages/Login';
import NavigatorCineflix from './src/Pages/NavigatorCineflix';
import MovieDetail from './src/screens/MovieDetail';
import VideoPlayer from './src/screens/VideoPlayer';
import { Provider } from 'react-redux';
import store, { persistor } from './src/redux/store';
import { useState, useEffect } from 'react';

const Stack = createNativeStackNavigator();

function LoadingScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0a0a0a', justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#E50914" />
    </View>
  );
}

export default function Setter() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsSplashVisible(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isSplashVisible ? (
              <Stack.Screen name="Splash" component={SplashScreen} />
            ) : (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="NavigatorCineflix" component={NavigatorCineflix} />
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
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
