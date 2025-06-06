import React, { useEffect } from 'react';
import { View, Text, Image, Platform, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/splashStyles';
import { Ionicons } from '@expo/vector-icons';

export const SplashScreen = () => {
  const navigation = useNavigation<any>();
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timeout = setTimeout(() => {
      navigation.replace('Panorama Geral');
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EnerGenius Acessível</Text>

      <Animated.View style={[styles.hintContainer, { opacity }]}>
  <Ionicons
    name={Platform.OS === 'web' ? 'move-outline' : 'chevron-down-outline'}
    size={32}
    color="#2E7D32"
  />
  <Text style={styles.hintText}>
    {Platform.OS === 'web' ? 'Role com o mouse' : 'Deslize para continuar'}
  </Text>
</Animated.View>

    </View>
  );
};
