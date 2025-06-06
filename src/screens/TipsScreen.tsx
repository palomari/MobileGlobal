import React from 'react';
import { View, ScrollView, Text, Pressable, Platform } from 'react-native';
import { styles } from '../styles/tipsStyles';
import { useVoice } from '../hooks/useVoice';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    'Panorama Geral': undefined;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;


const tips = [
    'Tenha lanternas e pilhas reservas disponíveis.',
    'Mantenha power banks carregados.',
    'Não abra a geladeira para conservar alimentos.',
    'Tenha um rádio com pilhas para emergências.',
    'Combine sinais com vizinhos, como piscar a lanterna 3 vezes.',
];

export const TipsScreen = () => {
    const VoiceButton = useVoice(tips);
    const navigation = useNavigation<NavigationProps>();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Recomendações</Text>
        {tips.map((tip, idx) => (
          <Text key={idx} style={styles.item}>• {tip}</Text>
        ))}
      </ScrollView>

      {/* Botão de voltar para Home */}
      <Pressable
        onPress={() => navigation.navigate('Panorama Geral')}
        style={{
          position: 'absolute',
          bottom: 24,
          left: 24,
          backgroundColor: '#2E7D32',
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Ionicons name="arrow-back-outline" size={28} color="#fff" />
      </Pressable>

      <VoiceButton />
    </View>
  );
};
