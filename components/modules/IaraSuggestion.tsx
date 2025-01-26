// components/modules/IaraSuggestion.tsx
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import { iaService } from '@/app/services/ia';
import { storageService } from '@/app/services/storage';
import { theme } from '@/app/styles/theme';

const SuggestionCard = styled.View`
  background-color: ${theme.colors.secondary};
  margin: ${theme.spacing.medium}px;
  padding: ${theme.spacing.medium}px;
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

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;

const ActionButton = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0.2);
  padding: 12px 24px;
  border-radius: 20px;
  flex: 1;
  align-items: center;
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
      const userData = await storageService.getUserData();
      if (userData) {
        const response = await iaService.getStudyPlan(
          userData.progress || '0', 
          'AWS Developer Associate'
        );
        setSuggestion(response.message);
      }
    } catch (error) {
      console.error('Error fetching suggestion:', error);
      setSuggestion('Foque em praticar com simulados e laboratórios AWS para melhorar seu desempenho.');
    }
  };

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
        <ActionButton 
          onPress={() => router.push({
            pathname: '/screens/study',
            params: { suggestion }
          })}
        >
          <ButtonText>Estudar</ButtonText>
        </ActionButton>
        <ActionButton onPress={() => router.push('/screens/simulados')}>
          <ButtonText>Simulados</ButtonText>
        </ActionButton>
      </ButtonContainer>
    </SuggestionCard>
  );
};

export default IaraSuggestion;