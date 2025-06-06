import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Platform,
  Pressable,
  Modal,
} from 'react-native';
import { styles } from '../styles/mapStyles';
import { useVoice } from '../hooks/useVoice';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const HelpMapScreen = ({ route }: any) => {
  const { name, need, address } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const casas = [
    { nome: 'Casa da Joana', distancia: '120m' },
    { nome: 'Casa do Pedro', distancia: '200m' },
    { nome: 'Condomínio Sol Nascente', distancia: '350m' },
  ];

  const VoiceButton = useVoice([
    `Mapa de ajuda disponível. ${casas.length} vizinhos encontrados.`,
    ...casas.map(c => `${c.nome} a ${c.distancia}`),
  ]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Mapa de ajuda disponível</Text>

        {Platform.OS === 'web' && (
          <View style={styles.mapContainer}>
            <iframe
              srcDoc={LEAFLET_MAP_HTML}
              style={styles.iframe}
              sandbox="allow-scripts allow-same-origin"
            />
          </View>
        )}

        <Text style={styles.subtitle}>Casas próximas que podem ajudar:</Text>

        {casas.map((casa, index) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.cardText}>{casa.nome}</Text>
            <Text style={styles.cardSub}>{casa.distancia} de distância</Text>
          </Pressable>
        ))}

        {/* Espaço entre os cards e os botões fixos */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Botão de voltar */}
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

      {/* Botão de voz (continua no canto inferior direito) */}
      <VoiceButton />

      {/* Modal de confirmação */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Confirmar solicitação de ajuda</Text>
            <Text style={styles.modalMessage}>
              {name} precisa de ajuda com: {need}, na localização: {address}.
            </Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Confirmar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const LEAFLET_MAP_HTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Mapa Leaflet</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
  <style> html, body, #map { height: 100%; margin: 0; padding: 0; } </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script>
    var map = L.map('map').setView([-23.55, -46.63], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([-23.55, -46.63]).addTo(map).bindPopup('Sua localização');
    L.marker([-23.551, -46.631]).addTo(map).bindPopup('Casa da Joana');
    L.marker([-23.552, -46.632]).addTo(map).bindPopup('Casa do Pedro');
  </script>
</body>
</html>
`;
