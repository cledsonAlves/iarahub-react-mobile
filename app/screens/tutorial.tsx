import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useRouter } from 'expo-router';
import Swiper from 'react-native-swiper';

// Estilos para a tela de tutorial
const Container = styled.View`
  flex: 1;
  background-color: #f7f7f7;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const Description = styled.Text`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-bottom: 30px;
`;

const TutorialButton = styled.TouchableOpacity`
  background-color: rgba(0, 123, 255, 0.1); /* Fundo fraco com cor azul */
  padding: 15px;
  border-radius: 25px; /* Bordas arredondadas */
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: #007bff;
  font-weight: bold;
`;

const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const FooterButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 15px;
  border-radius: 25px; /* Tornando o botão completamente arredondado */
  justify-content: center;
  align-items: center;
  width: 48%;
  align-self: center;
`;

const FooterButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export default function Tutorial() {
  const router = useRouter();

  const handleFinishTutorial = () => {
    router.push('/screens/modulos'); // Redireciona para a tela principal após o tutorial
  };

  const handleSkipIntroduction = () => {
    router.push('/'); // Redireciona para a tela principal caso o usuário pule a introdução
  };

  return (
    <Container>
      <Title>Bem-vindo!</Title>
      <Description>
        Aqui estão algumas informações importantes para começar. Deslize para ver os tutoriais.
      </Description>

      {/* Lista de Tutoriais */}
      <ScrollView>
        <TutorialButton>
          <ButtonText>Tutorial de Laboratórios</ButtonText>
        </TutorialButton>
        <TutorialButton>
          <ButtonText>Tutorial de Simulados</ButtonText>
        </TutorialButton>
        <TutorialButton>
          <ButtonText>Falar com IA IARA HUB</ButtonText>
        </TutorialButton>
        <TutorialButton>
          <ButtonText>Base de Conhecimento</ButtonText>
        </TutorialButton>
      </ScrollView>

      {/* Botões de Ação */}
      <FooterContainer>
        <FooterButton onPress={handleSkipIntroduction}>
          <FooterButtonText>Pular Introdução</FooterButtonText>
        </FooterButton>
        <FooterButton onPress={handleFinishTutorial}>
          <FooterButtonText>Comece a Aprender</FooterButtonText>
        </FooterButton>
      </FooterContainer>
    </Container>
  );
}
