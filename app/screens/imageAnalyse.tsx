// app/screens/ImageAnalysisScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, Platform, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'react-native-image-picker';
import { theme } from '@/app/styles/theme';
import { BottomNav } from '@/components/common/BottomNav';
import { iaService } from '@/app/services/ia';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const Header = styled.View`
  padding: ${theme.spacing.medium}px;
  background-color: ${theme.colors.primary};
  flex-direction: row;
  align-items: center;
`;

const HeaderTitle = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin-left: ${theme.spacing.small}px;
`;

const AnalysisContainer = styled(ScrollView).attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled'
}))`
  flex: 1;
  padding: ${theme.spacing.small}px;
`;

const WelcomeMessage = styled.View`
  padding: ${theme.spacing.medium}px;
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.large}px;
  margin: ${theme.spacing.medium}px;
`;

const WelcomeTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.small}px;
`;

const WelcomeText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text.secondary};
`;

const ImageSection = styled.View`
  margin: ${theme.spacing.medium}px;
  align-items: center;
`;

const ImagePlaceholder = styled.View`
  width: 300px;
  height: 200px;
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.medium}px;
  justify-content: center;
  align-items: center;
  border: 2px dashed ${theme.colors.primary};
`;

const SelectedImage = styled.Image`
  width: 300px;
  height: 200px;
  border-radius: ${theme.borderRadius.medium}px;
`;

const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.medium}px;
  background-color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.medium}px;
  margin: ${theme.spacing.small}px;
`;

const ActionButtonText = styled.Text`
  color: white;
  margin-left: ${theme.spacing.small}px;
  font-size: 16px;
`;

const AnalysisTypeButton = styled.TouchableOpacity<{ selected: boolean }>`
  padding: ${theme.spacing.small}px ${theme.spacing.medium}px;
  background-color: ${props => props.selected ? theme.colors.primary : theme.colors.surface};
  border-radius: ${theme.borderRadius.medium}px;
  margin: ${theme.spacing.small}px;
`;

const AnalysisTypeText = styled.Text<{ selected: boolean }>`
  color: ${props => props.selected ? 'white' : theme.colors.text.primary};
  font-size: 14px;
`;

const ResultContainer = styled.View`
  padding: ${theme.spacing.medium}px;
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.medium}px;
  margin-top: ${theme.spacing.medium}px;
`;

const ResultText = styled.Text`
  color: ${theme.colors.text.primary};
  font-size: 16px;
  line-height: 24px;
`;

const LoadingContainer = styled.View`
  padding: ${theme.spacing.medium}px;
  align-items: center;
`;

interface AnalysisType {
  id: string;
  label: string;
  prompt: string;
}

const analysisTypes: AnalysisType[] = [
  {
    id: 'general',
    label: 'Análise Geral',
    prompt: 'Faça uma análise geral desta arquitetura AWS'
  },
  {
    id: 'security',
    label: 'Segurança',
    prompt: 'Analise os aspectos de segurança desta arquitetura AWS'
  },
  {
    id: 'cost',
    label: 'Custos',
    prompt: 'Analise os aspectos de custos desta arquitetura AWS'
  },
  {
    id: 'performance',
    label: 'Performance',
    prompt: 'Analise os aspectos de performance desta arquitetura AWS'
  }
];

export default function ImageAnalysisScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState<string>('general');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const selectImage = () => {
    ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    }, (response) => {
      if (response.didCancel || response.errorCode || !response.assets) {
        return;
      }

      const image = response.assets[0];
      if (image.uri) {
        setSelectedImage(image.uri);
        setAnalysisResult(null);
      }
    });
  };

  const takePhoto = () => {
    ImagePicker.launchCamera({
      mediaType: 'photo',
      quality: 0.8,
    }, (response) => {
      if (response.didCancel || response.errorCode || !response.assets) {
        return;
      }

      const image = response.assets[0];
      if (image.uri) {
        setSelectedImage(image.uri);
        setAnalysisResult(null);
      }
    });
  };

  const analyzeImage = async () => {
    if (!selectedImage || isAnalyzing) return;

    setIsAnalyzing(true);
    try {
      const selectedType = analysisTypes.find(type => type.id === selectedAnalysis);
      const response = await iaService.analyzeImage(
        selectedImage,
        selectedType?.prompt || "Analise esta arquitetura AWS"
      );
      setAnalysisResult(response.message);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    } catch (error) {
      console.error('Error analyzing image:', error);
      setAnalysisResult('Erro ao analisar a imagem. Por favor, tente novamente.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Container>
      <Header>
        <Icon name="image" size={24} color="white" />
        <HeaderTitle>Análise de Arquitetura</HeaderTitle>
      </Header>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <AnalysisContainer ref={scrollViewRef}>
          {!selectedImage && !analysisResult && (
            <WelcomeMessage>
              <WelcomeTitle>Análise de Arquitetura AWS</WelcomeTitle>
              <WelcomeText>
                Selecione ou tire uma foto de um diagrama de arquitetura AWS para análise.
                Nossa IA irá identificar os serviços e fornecer insights técnicos.
              </WelcomeText>
            </WelcomeMessage>
          )}

          <ImageSection>
            {selectedImage ? (
              <SelectedImage source={{ uri: selectedImage }} resizeMode="contain" />
            ) : (
              <ImagePlaceholder>
                <Icon name="add-photo-alternate" size={48} color={theme.colors.primary} />
              </ImagePlaceholder>
            )}
          </ImageSection>

          <ImageSection>
            <ActionButton onPress={selectImage}>
              <Icon name="photo-library" size={24} color="white" />
              <ActionButtonText>Escolher Imagem</ActionButtonText>
            </ActionButton>

            <ActionButton onPress={takePhoto}>
              <Icon name="camera-alt" size={24} color="white" />
              <ActionButtonText>Tirar Foto</ActionButtonText>
            </ActionButton>
          </ImageSection>

          {selectedImage && (
            <>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {analysisTypes.map(type => (
                  <AnalysisTypeButton
                    key={type.id}
                    selected={selectedAnalysis === type.id}
                    onPress={() => setSelectedAnalysis(type.id)}
                  >
                    <AnalysisTypeText selected={selectedAnalysis === type.id}>
                      {type.label}
                    </AnalysisTypeText>
                  </AnalysisTypeButton>
                ))}
              </ScrollView>

              <ActionButton onPress={analyzeImage} disabled={isAnalyzing}>
                <Icon name="analytics" size={24} color="white" />
                <ActionButtonText>
                  {isAnalyzing ? 'Analisando...' : 'Analisar Arquitetura'}
                </ActionButtonText>
              </ActionButton>

              {isAnalyzing && (
                <LoadingContainer>
                  <ActivityIndicator size="large" color={theme.colors.primary} />
                </LoadingContainer>
              )}

              {analysisResult && (
                <ResultContainer>
                  <ResultText>{analysisResult}</ResultText>
                </ResultContainer>
              )}
            </>
          )}
        </AnalysisContainer>
      </KeyboardAvoidingView>
      <BottomNav />
    </Container>
  );
}