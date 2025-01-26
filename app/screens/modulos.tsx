import React from 'react';
import { ScrollView, View, Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
  padding: 20px;
`;

const HeaderContainer = styled.View`
  width: 100%;
  padding: 16px;
  background-color: #F78C38;
  margin-bottom: 24px;
`;

const HeaderText = styled.Text`
  color: #FFFFFF;
  font-size: 18px;
  font-weight: bold;
`;

const Title = styled.Text`
  font-size: 24px;
  color: #333;
  margin-bottom: 32px;
`;

const ModulesContainer = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

const ButtonsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  padding: 0 16px;
`;

const ModuleButton = styled.TouchableOpacity`
  background-color: #F78C38;
  width: 140px;
  height: 140px;
  border-radius: 70px;
  justify-content: center;
  align-items: center;
  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-offset: 0px 2px;
      shadow-opacity: 0.25;
      shadow-radius: 3.84px;
    `,
    android: `
      elevation: 5;
    `
  })}
`;

const ModuleIcon = styled.Image`
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
`;

const ModuleText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 0 10px;
`;

export default function ModulesScreen() {
  const router = useRouter();

  const modules = [
    {
      id: 'aws-academy',
      title: 'AWS Academy',
      icon: 'school'
    },
    {
      id: 'iara-tech',
      title: 'IARA TECH',
      icon: 'psychology'
    },
    {
      id: 'iara-dev',
      title: 'IARA Dev',
      icon: 'code'
    },
    {
      id: 'iara-personal',
      title: '',
      icon: 'person'
    }
  ];

  const handleModuleSelect = (moduleId) => {
    router.push(`/screens/home`);
  };

  return (
    <Container>
      <ModulesContainer>
        <Title>IARA Módulos</Title>
        <ButtonsGrid>
          {modules.map((module) => (
            <ModuleButton
              key={module.id}
              onPress={() => handleModuleSelect(module.id)}
            >
              <Icon name={module.icon} size={40} color="white" />
              <ModuleText>{module.title}</ModuleText>
            </ModuleButton>
          ))}
        </ButtonsGrid>
      </ModulesContainer>
    </Container>
  );
}