import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Platform,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/locationStyles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { useVoice } from '../hooks/useVoice';

export const DamageScreen = () => {
  const [damage, setDamage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const isWeb = Platform.OS === 'web';
  const VoiceButton = useVoice([damage || 'Digite ou dite um prejuízo']);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleMicPress = () => {
    startWebSpeech();
  };

  const startWebSpeech = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      window.alert('Reconhecimento de voz não é suportado neste navegador.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setDamage(transcript);
    };

    recognition.onerror = (event: any) => {
      window.alert('Erro ao reconhecer fala: ' + event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  const saveDamage = async () => {
      if (!damage) return Alert.alert('Erro', 'Descreva os prejuízos.');
  
      const draft = { prejuizo: damage };
      await AsyncStorage.mergeItem('@draft', JSON.stringify({ prejuizo: damage }));
      navigation.navigate('Panorama Geral');
    };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descreva os prejuízos observados:</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          value={damage}
          onChangeText={(text) => {
            setDamage(text);
            setIsListening(false);
          }}
          onFocus={() => setIsListening(true)}
          onBlur={() => setIsListening(false)}
          style={styles.texto}
          placeholder={
            isListening ? '' : 'Ex: Alimentos estragados, queda de árvore...'
          }
          keyboardType="default"
          multiline
          numberOfLines={3}
          returnKeyType="done"
        />
        <Pressable onPress={handleMicPress} style={styles.micButton}>
          <Ionicons name="mic-outline" size={20} color="#2E7D32" />
        </Pressable>
        {isListening && (
          <Text style={styles.listeningText}>Aguardando áudio...</Text>
        )}
      </View>

      <View
        style={{
          borderRadius: 12,
          overflow: 'hidden',
          alignSelf: isWeb ? 'center' : 'stretch',
          width: isWeb ? 320 : '100%',
        }}
      >
        <Button title="SALVAR REGISTRO" onPress={saveDamage} color="#2E7D32" />
      </View>

      <Pressable
        onPress={() => navigation.navigate('Tempo de Interrupção')}
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
