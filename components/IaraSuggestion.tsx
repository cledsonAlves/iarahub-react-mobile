import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';

const SuggestionCard = styled.View`
  background-color: #0066CC;
  margin: 16px;
  padding: 16px;
  border-radius: 12px;
`;

const SuggestionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const SuggestionTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const SuggestionIcon = styled.View`
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
`;

const SuggestionContent = styled.Text`
  color: white;
  margin-bottom: 12px;
`;

const StartButton = styled.TouchableOpacity`
  background-color: #003366;
  padding: 12px 24px;
  border-radius: 20px;
  align-self: flex-start;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

const IaraSuggestion = () => {
  const [suggestion, setSuggestion] = useState('');
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      fetchSuggestion();
    }, [])
  );

  const fetchSuggestion = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const { progress } = JSON.parse(userData);
        
        const response = await axios.post('https://bff-iarahub.vercel.app/api/ia/stackspot', {
          prompt: `Com base no progresso atual do usuário de ${progress}, sugira um plano de estudo personalizado e conciso para AWS Developer Associate em no máximo 3 linhas`,
          system: "Você é um mentor especialista em AWS"
        });

        setSuggestion(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching suggestion:', error);
      setSuggestion('Foque em praticar com simulados e laboratórios AWS para melhorar seu desempenho.');
    }
  };

  const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;

const ActionButton = styled.TouchableOpacity`
  background-color: #003366;
  padding: 12px 24px;
  border-radius: 20px;
  flex: 1;
  align-items: center;
`;

return (
    <SuggestionCard>
      <SuggestionHeader>
        <SuggestionTitle>Sugestão da IARA</SuggestionTitle>
        <SuggestionIcon>
          <Icon name="lightbulb" size={24} color="white" />
        </SuggestionIcon>
      </SuggestionHeader>
      <SuggestionContent>{suggestion}</SuggestionContent>
      <ButtonContainer>
        <ActionButton onPress={() => router.push({
          pathname: '/study',
          params: { suggestion }
        })}>
          <ButtonText>Estudar</ButtonText>
        </ActionButton>
        <ActionButton onPress={() => router.push('/simulados')}>
          <ButtonText>Simulados</ButtonText>
        </ActionButton>
      </ButtonContainer>
    </SuggestionCard>
);
};

export default IaraSuggestion;