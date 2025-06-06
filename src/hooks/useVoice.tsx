// hooks/useVoice.tsx
import React, { useEffect, useState } from 'react';
import { Platform, TouchableOpacity, Text } from 'react-native';
import Tts from 'react-native-tts';

export const useVoice = (textList: string[]) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = () => {
    if (Platform.OS === 'web') {
      window.speechSynthesis.cancel();
      textList.forEach(text => {
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'pt-BR';
        window.speechSynthesis.speak(utter);
      });
    } else {
      Tts.stop();
      Tts.setDefaultLanguage('pt-BR');
      textList.forEach(text => Tts.speak(text));
    }
    setIsSpeaking(true);
  };

  const stop = () => {
    if (Platform.OS === 'web') {
      window.speechSynthesis.cancel();
    } else {
      Tts.stop();
    }
    setIsSpeaking(false);
  };

  useEffect(() => {
    return () => stop(); // Para voz ao sair da tela
  }, []);

  const toggle = () => (isSpeaking ? stop() : speak());

  const VoiceButton = () => (
    <TouchableOpacity
      onPress={toggle}
      style={{
        backgroundColor: '#2E7D32',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 24,
        right: 24,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <Text style={{ fontSize: 24, color: '#fff' }}>
        {isSpeaking ? '⏹' : '🔊'}
      </Text>
    </TouchableOpacity>
  );

  return VoiceButton;
};