import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  Platform,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from '../styles/helpStyles';
import { useVoice } from '../hooks/useVoice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HelpScreen = () => {
  const [name, setName] = useState('');
  const [need, setNeed] = useState('');
  const [address, setAddress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [micClicked, setMicClicked] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const VoiceButton = useVoice([
    'Solicitação de ajuda a vizinhos',
    `Nome: ${name || 'não preenchido'}`,
    `Ajuda: ${need || 'não preenchida'}`,
    `Endereço: ${address || 'não preenchido'}`,
    'Preencha os campos abaixo ou dite pelo microfone.',
  ]);

  const handleMic = (fieldSetter: (text: string) => void) => {
    if (Platform.OS === 'web') {
      if (!micClicked) {
        setModalVisible(true);
        setMicClicked(true);
        return;
      }

      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        Alert.alert('Erro', 'Reconhecimento de voz não é suportado.');
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = 'pt-BR';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        fieldSetter(transcript);
      };

      recognition.start();
    }
  };

  const handleNext = async () => {
    if (!name || !need || !address) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const registro = {
      nome: name,
      ajuda: need,
      endereco: address,
      data: new Date().toLocaleString(),
      tipo: 'Ajuda dos Vizinhos',
    };

    try {
      await AsyncStorage.setItem(`@ajuda-${Date.now()}`, JSON.stringify(registro));
      navigation.navigate('HelpMap', { name, need, address });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a solicitação.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitar ajuda a um vizinho</Text>

      <Text style={styles.label}>Seu nome:</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ex: Ana Silva"
        />
        <Pressable onPress={() => handleMic(setName)} style={styles.micIcon}>
          <Ionicons name="mic-outline" size={20} color="#2E7D32" />
        </Pressable>
      </View>

      <Text style={styles.label}>Ajuda necessária:</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={need}
          onChangeText={setNeed}
          placeholder="Ex: carregar cadeira de rodas"
        />
        <Pressable onPress={() => handleMic(setNeed)} style={styles.micIcon}>
          <Ionicons name="mic-outline" size={20} color="#2E7D32" />
        </Pressable>
      </View>

      <Text style={styles.label}>Endereço:</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Ex: Rua das Árvores, 123"
        />
        <Pressable onPress={() => handleMic(setAddress)} style={styles.micIcon}>
          <Ionicons name="mic-outline" size={20} color="#2E7D32" />
        </Pressable>
      </View>

      <Pressable onPress={handleNext} style={styles.button}>
        <Text style={styles.buttonText}>CONTINUAR</Text>
      </Pressable>

      <VoiceButton />

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons
              name="information-circle-outline"
              size={48}
              color="#2E7D32"
            />
            <Text style={styles.modalText}>
              Esta funcionalidade só está habilitada para uso no navegador (site).
            </Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>ENTENDI</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    </View>
  );
};
