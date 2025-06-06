import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/homeStyles';
import { useVoice } from '../hooks/useVoice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useIsFocused } from '@react-navigation/native';

type RootStackParamList = {
  'Panorama Geral': undefined;
  'Localização Atingida': undefined;
  'Ajuda de Vizinhos': undefined;
  'Recomendações': undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Panorama Geral'>;
};

export const HomeScreen = ({ navigation }: Props) => {
  const [data, setData] = useState<{ key: string; value: any }[]>([]);
  const isFocused = useIsFocused();

  const VoiceButton = useVoice([
    'Panorama Geral',
    ...data.flatMap(item => {
      const value = item.value;
      if (typeof value === 'object') {
        return Object.entries(value)
          .filter(([k]) => k !== 'tipo') // Ignora o tipo na leitura
          .map(([k, v]) => `${k} ${v}`);
      }
      return [`${value}`];
    }),
    'Menu com opções: Registrar ocorrência, SOS Vizinhos e Limpar registros',
  ]);

  const loadData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    setData(
      result.map(([key, value]) => {
        if (!value) return { key, value: '' };
        try {
          const parsed = JSON.parse(value);
          return { key, value: parsed };
        } catch {
          return { key, value };
        }
      })
    );
  };

  useEffect(() => {
    if (isFocused) loadData();
  }, [isFocused]);

  const clearAllData = async () => {
    await AsyncStorage.clear();
    setData([]);
  };

  const renderValue = (value: any) => {
    if (typeof value === 'object') {
      const isAjuda = value?.tipo === 'Ajuda dos Vizinhos';
      return (
        <View>
          {isAjuda && (
            <Text style={[styles.itemTitle, { color: '#C62828' }]}>Ajuda dos Vizinhos</Text>
          )}
          {Object.entries(value)
            .filter(([k]) => k !== 'tipo')
            .map(([k, v]) => (
              <Text key={k} style={styles.itemContent}>
                {k}: {String(v)}
              </Text>
            ))}
        </View>
      );
    } else if (Array.isArray(value)) {
      return value.map((item, idx) => (
        <View key={idx} style={{ marginBottom: 8 }}>
          {Object.entries(item).map(([k, v]) => (
            <Text key={k} style={styles.itemContent}>{k}: {String(v)}</Text>
          ))}
        </View>
      ));
    } else {
      return <Text style={styles.itemContent}>{String(value)}</Text>;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F1F8E9' }}>
      <ScrollView
  contentContainerStyle={styles.container}
  showsVerticalScrollIndicator={false} // <- importante
>


        <Text style={styles.title}>Panorama Geral</Text>

        {data.map((item, index) => (
          <View key={index} style={styles.itemBox}>
            <Text style={styles.itemTitle}>Registro</Text>
            {renderValue(item.value)}
          </View>
        ))}

        {/* <Text style={styles.subtitle}>Menu:</Text> */}
        <View style={styles.buttonGroup}>
          <View style={styles.buttonWrapper}>
            <Button
              title="REGISTRAR OCORRÊNCIA"
              onPress={() => navigation.navigate('Localização Atingida')}
              color="#2E7D32"
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="SOS Vizinhos"
              onPress={() => navigation.navigate('Ajuda de Vizinhos')}
              color="#2E7D32"
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="Recomendações"
              onPress={() => navigation.navigate('Recomendações')}
              color="#2E7D32"
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="LIMPAR REGISTROS"
              onPress={clearAllData}
              color="#C62828"
            />
          </View>
        </View>
      </ScrollView>

      <VoiceButton />
    </View>
  );
};
