import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SplashScreen } from './src/screens/SplashScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { LocationScreen } from './src/screens/LocationScreen';
import { DurationScreen } from './src/screens/DurationScreen';
import { DamageScreen } from './src/screens/DamageScreen';
import { TipsScreen } from './src/screens/TipsScreen';
import { HelpScreen } from './src/screens/HelpScreen';
import { HelpMapScreen } from './src/screens/MapaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
  if (Platform.OS === 'web') {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
      html, body {
        height: 100%;
        overflow-y: scroll;
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }

      ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
        display: none !important;
      }

      * {
        scrollbar-width: none !important;
      }
    `;
    document.head.appendChild(style);
  }
}, []);


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Panorama Geral" component={HomeScreen} />
        <Stack.Screen name="Localização Atingida" component={LocationScreen} />
        <Stack.Screen name="Tempo de Interrupção" component={DurationScreen} />
        <Stack.Screen name="Prejuízos Causados" component={DamageScreen} />
        <Stack.Screen name="Recomendações" component={TipsScreen} />
        <Stack.Screen name="Ajuda de Vizinhos" component={HelpScreen} />
        <Stack.Screen name="HelpMap" component={HelpMapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
