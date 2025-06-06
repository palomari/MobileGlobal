import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Button, Alert, Platform, Pressable, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/locationStyles';
import { useVoice } from '../hooks/useVoice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export const LocationScreen = () => {
  const [location, setLocation] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const VoiceButton = useVoice([location || 'Digite ou dite uma localização']);
  const isWeb = Platform.OS === 'web';

  useEffect(() => {
    AsyncStorage.removeItem('@draft');
  }, []);

const modalHasBeenShown = useRef(false);

const handleMicPress = () => {
  if (!modalHasBeenShown.current) {
    modalHasBeenShown.current = true;
    setModalVisible(true);
  } else {
    startWebSpeech();
  }
};

  const handleUserChoice = (choice: 'web' | 'mobile') => {
    setModalVisible(false);
    if (choice === 'web') {
      startWebSpeech();
    }
  };

  const startWebSpeech = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      Alert.alert('Erro', 'Reconhecimento de voz não é suportado neste navegador.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: { results: { transcript: any; }[][]; }) => {
      const transcript = event.results[0][0].transcript;
      setLocation(transcript);
    };

    recognition.onerror = (event: { error: string | undefined; }) => {
      Alert.alert('Erro ao reconhecer fala', event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  const saveLocation = async () => {
    if (!location) return Alert.alert('Erro', 'Digite a localização.');

    const draft = { local: location };
    await AsyncStorage.mergeItem('@draft', JSON.stringify({ local: location }));
    navigation.navigate('Tempo de Interrupção');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Bairro, cidade ou CEP:</Text>

      <View style={styles.inputWrapper}>
        <TextInput
            value={location}
            onChangeText={(text) => {
            setLocation(text);
            setIsListening(false);
            }}
            onFocus={() => setIsListening(true)}
            onBlur={() => setIsListening(false)}
            style={styles.input}
            placeholder={isListening ? '' : 'Fale ou digite sua localização'}
            keyboardType="default"
            returnKeyType="done"
        />

        {/* Ícone do microfone DENTRO do input */}
        <Pressable onPress={handleMicPress} style={styles.micButton}>
            <Ionicons name="mic-outline" size={20} color="#2E7D32" />
        </Pressable>

        {isListening && (
            <Text style={styles.listeningText}>Aguardando áudio...</Text>
        )}
    </View>


    <Modal visible={modalVisible} transparent animationType="fade"> 
        <View
        style={styles.view1}>
            <View
            style={styles.view2}>
            <Ionicons name="information-circle-outline" size={48} color="#2E7D32" />
            <Text
            style={styles.textModal}>
                Esta funcionalidade só está habilitada para uso no navegador (site).
                Como você está acessando?
            </Text>

            <Pressable
            onPress={() => handleUserChoice('web')}
            style={[styles.pressableModal, { backgroundColor: '#2E7D32', marginBottom: 8 }]}>
            <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 14 }}>
                Estou no site
            </Text>
            </Pressable>

            <Pressable
            onPress={() => handleUserChoice('mobile')}
            style={[styles.pressableModal, { backgroundColor: '#e0e0e0' }]}>
            <Text style={{ color: '#333', textAlign: 'center', fontWeight: 'bold', fontSize: 14 }}>
                Estou no celular
            </Text>
            </Pressable>

            </View>
        </View>
    </Modal>


      <View style={styles.buttonWrapper}>
        <Button title="CONTINUAR" onPress={saveLocation} color="#2E7D32" />
      </View>
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
