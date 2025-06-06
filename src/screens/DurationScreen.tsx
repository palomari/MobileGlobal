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


export const DurationScreen = () => {
  const [duration, setDuration] = useState('');
  const VoiceButton = useVoice([duration || 'Digite ou dite uma duração']);
  const [isListening, setIsListening] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const isWeb = Platform.OS === 'web';

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
      setDuration(transcript);
    };

    recognition.onerror = (event: any) => {
      window.alert('Erro ao reconhecer fala: ' + event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  const saveDuration = async () => {
    if (!duration) {
      Alert.alert('Erro', 'Informe o tempo.');
      return;
    }

    const draft = await AsyncStorage.getItem('@draft');
    if (!draft) {
      Alert.alert('Erro', 'Nenhum rascunho encontrado.');
      return;
    }

    const updated = { ...JSON.parse(draft), tempo: duration };
    await AsyncStorage.mergeItem('@draft', JSON.stringify({ tempo: duration }));
    navigation.navigate('Prejuízos Causados');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tempo estimado ou real sem energia:</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          value={duration}
          onChangeText={(text) => {
            setDuration(text);
            setIsListening(false);
          }}
          onFocus={() => setIsListening(true)}
          onBlur={() => setIsListening(false)}
          style={styles.input}
          placeholder={isListening ? '' : 'Ex: 2 horas'}
          keyboardType="default"
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
        <Button title="CONTINUAR" onPress={saveDuration} color="#2E7D32" />
      </View>
      {/* Botão de voltar para Home */}
      <Pressable
        onPress={() => navigation.navigate('Localização Atingida')}
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
