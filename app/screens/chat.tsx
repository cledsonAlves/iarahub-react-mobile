// app/screens/chat.tsx
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, Platform, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '@/app/styles/theme';
import { BottomNav } from '@/components/common/BottomNav';
import { iaService } from '@/app/services/ia';

// Melhorias implementadas:
// - Uso do SafeAreaView para suportar dispositivos com notch e áreas seguras.
// - Adição do keyboardVerticalOffset no KeyboardAvoidingView para ajustar o posicionamento do teclado.
// - Configuração do contentContainerStyle e keyboardShouldPersistTaps no ScrollView para melhor responsividade.

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

const ChatContainer = styled(ScrollView).attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled'
}))`
  flex: 1;
  padding: ${theme.spacing.small}px;
`;

const MessageContainer = styled.View<{ isUser: boolean }>`
  flex-direction: row;
  justify-content: ${props => (props.isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: ${theme.spacing.small}px;
`;

const MessageBubble = styled.View<{ isUser: boolean }>`
  max-width: 80%;
  padding: ${theme.spacing.medium}px;
  border-radius: 20px;
  background-color: ${props => (props.isUser ? theme.colors.primary : theme.colors.surface)};
  ${theme.shadows.small}
`;

const MessageText = styled.Text<{ isUser: boolean }>`
  color: ${props => (props.isUser ? 'white' : theme.colors.text.primary)};
  font-size: 16px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  padding: ${theme.spacing.small}px;
  background-color: ${theme.colors.surface};
  align-items: center;
  margin-bottom: ${Platform.OS === 'ios' ? 70 : 60}px;
`;

const Input = styled.TextInput`
  flex: 1;
  padding: ${theme.spacing.small}px;
  background-color: white;
  border-radius: 20px;
  margin-right: ${theme.spacing.small}px;
  font-size: 16px;
  max-height: 100px;
`;

const SendButton = styled.TouchableOpacity<{ disabled: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${props => (props.disabled ? theme.colors.text.disabled : theme.colors.primary)};
  justify-content: center;
  align-items: center;
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

const SuggestionContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: ${theme.spacing.small}px;
  justify-content: center;
`;

const SuggestionButton = styled.TouchableOpacity`
  background-color: ${theme.colors.surface};
  padding: ${theme.spacing.small}px ${theme.spacing.medium}px;
  border-radius: 20px;
  margin: 5px;
  ${theme.shadows.small}
`;

const SuggestionText = styled.Text`
  color: ${theme.colors.text.primary};
`;

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const suggestions = [
    "O que é AWS Lambda?",
    "Como funciona o S3?",
    "Explique o Amazon RDS",
    "Dicas para a certificação"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const handleSend = async () => {
    if (inputText.trim() === '' || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await iaService.getRecommendation(
        'stackspot',
        'aws',
        {
          prompt: userMessage.text,
          system: "Você é um especialista em AWS que fornece respostas técnicas precisas e úteis. Mantenha as respostas concisas e diretas."
        }
      );

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Desculpe, não consegui processar sua pergunta. Tente novamente mais tarde.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    setInputText(suggestion);
  };

  return (
    <Container>
      <Header>
        <Icon name="chat" size={24} color="white" />
        <HeaderTitle>IARA Tutor</HeaderTitle>
      </Header>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 70}
        style={{ flex: 1 }}
      >
        <ChatContainer ref={scrollViewRef}>
          {messages.length === 0 ? (
            <>
              <WelcomeMessage>
                <WelcomeTitle>Bem-vindo ao IARA Tutor!</WelcomeTitle>
                <WelcomeText>
                  Estou aqui para ajudar com suas dúvidas sobre AWS e preparação para certificações.
                  O que você gostaria de saber?
                </WelcomeText>
              </WelcomeMessage>
              <SuggestionContainer>
                {suggestions.map((suggestion, index) => (
                  <SuggestionButton
                    key={index}
                    onPress={() => handleSuggestionPress(suggestion)}
                  >
                    <SuggestionText>{suggestion}</SuggestionText>
                  </SuggestionButton>
                ))}
              </SuggestionContainer>
            </>
          ) : (
            messages.map(message => (
              <MessageContainer key={message.id} isUser={message.isUser}>
                <MessageBubble isUser={message.isUser}>
                  <MessageText isUser={message.isUser}>{message.text}</MessageText>
                </MessageBubble>
              </MessageContainer>
            ))
          )}
          {isLoading && (
            <MessageContainer isUser={false}>
              <MessageBubble isUser={false}>
                <ActivityIndicator color={theme.colors.primary} />
              </MessageBubble>
            </MessageContainer>
          )}
        </ChatContainer>

        <InputContainer>
          <Input
            multiline
            placeholder="Digite sua pergunta..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
          />
          <SendButton
            onPress={handleSend}
            disabled={inputText.trim() === '' || isLoading}
          >
            <Icon
              name="send"
              size={20}
              color={inputText.trim() === '' || isLoading ? '#999' : 'white'}
            />
          </SendButton>
        </InputContainer>
      </KeyboardAvoidingView>
      <BottomNav />
    </Container>
  );
}