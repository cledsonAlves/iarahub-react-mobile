import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Defina a estrutura do layout
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 0 20px;
`;

const Logo = styled.Image`
  width: 120px;
  height: 40px;
  position: absolute;
  top: 40px;
  resize-mode: contain;
`;

const ProfileImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border-width: 3px;
  border-color: #fff;
  margin-bottom: 20px;
`;

const Greeting = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const ModuleTitle = styled.Text`
  font-size: 18px;
  color: #007bff;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Description = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 30px;
  text-align: center;
`;

const Button = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #007bff;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  elevation: 5;
`;

export default function Welcome() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          setUser(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#007bff" />
      </Container>
    );
  }

  const navigateToTutorial = () => {
    router.push('/tutorial');
  };

  return (
    <Container>
      <Logo source={{ uri: 'https://www.nttdata.com/global/en/_assets/img/logo-nttdata.svg' }} resizeMode="contain" />
      <ProfileImage source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} />
      <Greeting>Olá, {user.name}</Greeting>
      <ModuleTitle>{user.enterprise}</ModuleTitle>
      <Description>Prepare-se para certificação</Description>
      <Button onPress={navigateToTutorial}>
        <Icon name="arrow-forward" size={30} color="#fff" />
      </Button>
    </Container>
  );
}
