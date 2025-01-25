import React from "react";
import { ScrollView, View, Platform } from "react-native";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import IaraSuggestion from "../components/IaraSuggestion";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
  margin-bottom: ${Platform.OS === "ios" ? "80px" : "70px"};
`;

const HeaderContainer = styled.View`
  padding: 16px;
  flex-direction: row;
  align-items: center;
`;

const ProfileIconContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #e0e0e0;
  margin-right: 12px;
  justify-content: center;
  align-items: center;
`;

const WelcomeText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const ProgressRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 16px;
  margin-bottom: 16px;
`;

const ProgressItem = styled.View`
  align-items: center;
`;

const ProgressCircle = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #4a90e2;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

const PromotionCard = styled.View`
  background-color: #f78c38;
  margin: 16px;
  padding: 16px;
  border-radius: 12px;
`;

const PromotionTitle = styled.Text`
  color: white;
  font-weight: bold;
  margin-bottom: 8px;
`;

const ActionButton = styled.TouchableOpacity`
  background-color: #333;
  padding: 8px 16px;
  border-radius: 20px;
  align-self: flex-start;
`;

const ActionButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

const SuggestionCard = styled.View`
  background-color: #fff3e0;
  margin: 16px;
  padding: 16px;
  border-radius: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SuggestionTitle = styled.Text`
  font-weight: bold;
`;

const SuggestionSubtitle = styled.Text`
  color: #666;
`;

const ModulesGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 16px;
  justify-content: space-between;
`;

const ModuleItem = styled.TouchableOpacity`
  width: 48%;
  aspect-ratio: 1;
  background-color: #f78c38;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const ModuleText = styled.Text`
  color: white;
  font-weight: bold;
  margin-top: 8px;
`;

const CertificationSection = styled.View`
  margin: 16px;
`;

const CertificationTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const CertificationTitleText = styled.Text`
  font-weight: bold;
`;

const CertificationTitleLink = styled.Text`
  color: #666;
`;

const CertificationCard = styled.View`
  background-color: #4a90e2;
  padding: 12px;
  border-radius: 25px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const CertificationText = styled.Text`
  color: white;
  flex: 1;
  margin-left: 12px;
`;

const CertificationCount = styled.Text`
  color: white;
  font-weight: bold;
`;

const BottomNav = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 16px;
  background-color: white;
  border-top-width: 1px;
  border-top-color: #e0e0e0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  ${Platform.OS === "ios" &&
  `
    padding-bottom: 30px;
  `}
`;

export default function HomeScreen() {
  const router = useRouter();


  const certifications = [
    { name: "Jackson", count: 7 },
    { name: "Maurilio Silva", count: 5 },
    { name: "Wesley Lima", count: 3 },
    { name: "Daniela Ines", count: 1 },
  ];

  const modules = [
    { id: "lab", title: "Laboratórios", icon: "science" },
    { id: "podcast", title: "Podcast", icon: "headset" },
    { id: "simulations", title: "Simulados", icon: "assignment" },
    { id: "tutors", title: "Tutores", icon: "school" },
  ];
  

  return (
    <Container>
      <ScrollContainer>
        <HeaderContainer>
          <ProfileIconContainer>
            <Icon name="person" size={24} color="#666" />
          </ProfileIconContainer>
          <WelcomeText>Bem-vindo Cledson</WelcomeText>
        </HeaderContainer>

        <ProgressRow>
          {[1, 2, 3].map((item) => (
            <ProgressItem key={item}>
              <ProgressCircle>
                <Icon
                  name={item === 1 ? "star" : item === 2 ? "waves" : "computer"}
                  size={24}
                  color="white"
                />
              </ProgressCircle>
            </ProgressItem>
          ))}
        </ProgressRow>

        <HeaderContainer>
          <ProfileIconContainer>
            <Icon name="person" size={24} color="#666" />
          </ProfileIconContainer>
          <WelcomeText>Bem-vindo Cledson</WelcomeText>
        </HeaderContainer>

        <IaraSuggestion />

        <PromotionCard>
          <PromotionTitle>Amplie seu conhecimento</PromotionTitle>
          <ActionButton>
            <ActionButtonText>Acessar simulados</ActionButtonText>
          </ActionButton>
        </PromotionCard>

        <SuggestionCard>
          <View>
            <SuggestionTitle>AWS Certified</SuggestionTitle>
            <SuggestionSubtitle>Developer Associate</SuggestionSubtitle>
          </View>
          <ActionButton>
            <ActionButtonText>Começar</ActionButtonText>
          </ActionButton>
        </SuggestionCard>

        <ModulesGrid>
          {modules.map((module) => (
            <ModuleItem
              key={module.id}
              onPress={() => {
                if (module.id === "podcast") {
                  router.push("/podcast"); // Caminho para a tela do podcast
                }
                if (module.id === "simulations") {
                  router.push("/simulados");
                }
              }}
            >
              <Icon name={module.icon} size={32} color="white" />
              <ModuleText>{module.title}</ModuleText>
            </ModuleItem>
          ))}
        </ModulesGrid>

        <CertificationSection>
          <CertificationTitle>
            <CertificationTitleText>Mais certificados</CertificationTitleText>
            <CertificationTitleLink>Ver todos</CertificationTitleLink>
          </CertificationTitle>

          {certifications.map((cert, index) => (
            <CertificationCard key={index}>
              <Icon name="verified" size={24} color="white" />
              <CertificationText>{cert.name}</CertificationText>
              <CertificationCount>
                {cert.count} certificações
              </CertificationCount>
            </CertificationCard>
          ))}
        </CertificationSection>
      </ScrollContainer>

      <BottomNav>
        <Icon name="home" size={24} color="#F78C38" />
        <Icon name="mic" size={24} color="#666" />
        <Icon name="chat" size={24} color="#666" />
        <Icon name="settings" size={24} color="#666" />
      </BottomNav>
    </Container>
  );
}
