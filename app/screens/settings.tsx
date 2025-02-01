// app/screens/settings.tsx
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert, Platform, TextInput } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '@/app/styles/theme';
import { storageService, UserData } from '@/app/services/storage';
import { BottomNav } from '@/components/common/BottomNav';
import { authService } from '@/app/services/auth';

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const Header = styled.View`
  padding: ${theme.spacing.medium}px;
  background-color: ${theme.colors.primary};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.text.inverse};
`;

const EditButton = styled.TouchableOpacity`
  padding: ${theme.spacing.small}px;
`;

const EditButtonText = styled.Text`
  color: ${theme.colors.text.inverse};
  font-size: 16px;
`;

const ProfileSection = styled.View`
  align-items: center;
  padding: ${theme.spacing.medium}px;
  background-color: ${theme.colors.surface};
`;

const ProfileImage = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${theme.colors.primary};
  justify-content: center;
  align-items: center;
  margin-bottom: ${theme.spacing.medium}px;
`;

const UserName = styled.Text`
  font-size: ${theme.typography.h2.fontSize}px;
  font-weight: bold;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.small}px;
`;

const UserEmail = styled.Text`
  font-size: ${theme.typography.body1.fontSize}px;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.medium}px;
`;

const StyledInput = styled.TextInput`
  width: 90%;
  padding: ${theme.spacing.small}px;
  margin-bottom: ${theme.spacing.small}px;
  border-radius: ${theme.borderRadius.medium}px;
  background-color: ${theme.colors.background};
  font-size: ${theme.typography.body1.fontSize}px;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

const ProgressSection = styled.View`
  margin: ${theme.spacing.medium}px;
  padding: ${theme.spacing.medium}px;
  background-color: white;
  border-radius: ${theme.borderRadius.large}px;
  ${theme.shadows.small}
`;

const ProgressTitle = styled.Text`
  font-size: ${theme.typography.h3.fontSize}px;
  font-weight: bold;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.small}px;
`;

const ProgressBar = styled.View`
  height: 20px;
  background-color: ${theme.colors.surface};
  border-radius: 10px;
  overflow: hidden;
  margin: ${theme.spacing.small}px 0;
`;

const ProgressFill = styled.View<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: ${theme.colors.primary};
`;

const ProgressText = styled.Text`
  font-size: ${theme.typography.body2.fontSize}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
`;

const InfoSection = styled.View`
  margin: ${theme.spacing.medium}px;
  background-color: white;
  border-radius: ${theme.borderRadius.large}px;
  ${theme.shadows.small}
`;

const InfoItem = styled.View`
  padding: ${theme.spacing.medium}px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

const InfoLabel = styled.Text`
  flex: 1;
  font-size: ${theme.typography.body1.fontSize}px;
  color: ${theme.colors.text.primary};
`;

const InfoValue = styled.Text`
  font-size: ${theme.typography.body1.fontSize}px;
  color: ${theme.colors.text.secondary};
`;

const SaveButton = styled.TouchableOpacity`
  margin: ${theme.spacing.medium}px;
  padding: ${theme.spacing.medium}px;
  background-color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.medium}px;
  align-items: center;
`;

const LogoutButton = styled.TouchableOpacity`
  margin: ${theme.spacing.medium}px;
  padding: ${theme.spacing.medium}px;
  background-color: ${theme.colors.error};
  border-radius: ${theme.borderRadius.medium}px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${theme.colors.text.inverse};
  font-size: ${theme.typography.button.fontSize}px;
  font-weight: bold;
`;

export default function SettingsScreen() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const data = await storageService.getUserData();
      setUserData(data);
      setEditableData(data);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (!editableData || !userData?.id) return;

      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Erro', 'Token não encontrado');
        return;
      }

      const response = await authService.update(
        {
          id: userData.id,
          ...editableData
        },
        token
      );

      await storageService.setUserData(editableData);
      setUserData(editableData);
      setIsEditing(false);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Error updating user:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o perfil');
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Confirmar Logout',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            await storageService.clearStorage();
            router.push('/');
          },
        },
      ]
    );
  };

  const progress = parseFloat(userData?.progress || '0');

  return (
    <Container>
      <ScrollView style={{ marginBottom: Platform.OS === 'ios' ? 80 : 70 }}>
        <Header>
          <HeaderText>Configurações</HeaderText>
          <EditButton onPress={() => setIsEditing(!isEditing)}>
            <EditButtonText>{isEditing ? 'Cancelar' : 'Editar'}</EditButtonText>
          </EditButton>
        </Header>

        <ProfileSection>
          <ProfileImage>
            <Icon name="person" size={50} color="white" />
          </ProfileImage>
          {isEditing ? (
            <>
              <StyledInput
                value={editableData?.name}
                onChangeText={(text) => setEditableData(prev => ({ ...prev, name: text }))}
                placeholder="Nome"
              />
              <StyledInput
                value={editableData?.email}
                onChangeText={(text) => setEditableData(prev => ({ ...prev, email: text }))}
                placeholder="Email"
                keyboardType="email-address"
              />
              <StyledInput
                value={editableData?.enterprise}
                onChangeText={(text) => setEditableData(prev => ({ ...prev, enterprise: text }))}
                placeholder="Empresa"
              />
            </>
          ) : (
            <>
              <UserName>{userData?.name || 'Usuário'}</UserName>
              <UserEmail>{userData?.email || 'email@exemplo.com'}</UserEmail>
            </>
          )}
        </ProfileSection>

        <ProgressSection>
          <ProgressTitle>Seu Progresso</ProgressTitle>
          <ProgressBar>
            <ProgressFill progress={progress} />
          </ProgressBar>
          <ProgressText>{progress}% completo</ProgressText>
        </ProgressSection>

        <InfoSection>
          <InfoItem>
            <InfoLabel>Empresa</InfoLabel>
            <InfoValue>{userData?.enterprise || 'Não informado'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Função</InfoLabel>
            <InfoValue>{userData?.role || 'Não informado'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Idioma</InfoLabel>
            <InfoValue>{userData?.language || 'PTBR'}</InfoValue>
          </InfoItem>
        </InfoSection>

        {isEditing && (
          <SaveButton onPress={handleSave}>
            <ButtonText>Salvar Alterações</ButtonText>
          </SaveButton>
        )}
        <LogoutButton onPress={() => router.push('/')} >
          <ButtonText>Sair</ButtonText>
        </LogoutButton>
      </ScrollView>
      <BottomNav />
    </Container>
  );
}