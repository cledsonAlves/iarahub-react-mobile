import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

const Header = styled.View`
  padding: 16px;
  background-color: #F78C38;
`;

const HeaderText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #FFFFFF;
`;

const QuestionCard = styled.View`
  background-color: #FFF;
  margin: 16px;
  padding: 16px;
  border-radius: 12px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

const QuestionText = styled.Text`
  font-size: 16px;
  color: #333;
  margin-bottom: 16px;
`;

const OptionButton = styled.TouchableOpacity`
  padding: 12px;
  background-color: ${props => props.selected ? '#F78C38' : '#f5f5f5'};
  border-radius: 8px;
  margin-bottom: 8px;
`;

const OptionText = styled.Text`
  color: ${props => props.selected ? '#FFFFFF' : '#333'};
`;

const ActionButton = styled.TouchableOpacity`
  background-color: #F78C38;
  padding: 16px;
  border-radius: 8px;
  margin: 16px;
  align-items: center;
`;

const SubmitButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
`;

const ScoreText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 16px;
`;

const ResultCard = styled.View`
  background-color: ${props => props.correct ? '#E8F5E9' : '#FFEBEE'};
  padding: 12px;
  border-radius: 8px;
  margin-top: 8px;
`;

const ResultText = styled.Text`
  color: ${props => props.correct ? '#2E7D32' : '#C62828'};
  font-weight: bold;
`;

const PassingProbabilityText = styled.Text`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin: 8px 16px;
`;

export default function SimuladosScreen() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [passingProbability, setPassingProbability] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.post('https://bff-iarahub.vercel.app/api/ia/stackspot', {
        prompt: "Gere 10 questões de múltipla escolha sobre AWS, cada uma com 4 alternativas",
        system: "Você é um especialista em AWS"
      });

      const parsedQuestions = parseQuestions(response.data.message);
      setQuestions(parsedQuestions);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };

  const parseQuestions = (text) => {
    const questions = [];
    const lines = text.split('\n');
    let currentQuestion = null;

    for (const line of lines) {
      if (line.includes('**Questão')) {
        if (currentQuestion) {
          questions.push(currentQuestion);
        }
        currentQuestion = {
          id: questions.length,
          question: '',
          options: {},
          correctAnswer: 'a'
        };
      } else if (currentQuestion) {
        if (line.startsWith('Qual')) {
          currentQuestion.question = line.trim();
        } else if (line.match(/^[A-D]\)/)) {
          const option = line[0].toLowerCase();
          currentQuestion.options[option] = line.substring(2).trim();
        }
      }
    }

    if (currentQuestion) {
      questions.push(currentQuestion);
    }

    return questions;
  };

  const calculatePassingProbability = (simulationScore, questionCount) => {
    const baseScore = simulationScore * 0.6;
    const consistencyBonus = questionCount >= 10 ? 10 : 0;
    const difficultyAdjustment = 5;

    let probability = baseScore + consistencyBonus + difficultyAdjustment;
    probability = Math.min(Math.max(probability, 0), 100);
    
    return probability.toFixed(2);
  };

  const handleAnswer = (questionId, option) => {
    if (!submitted) {
      setAnswers(prev => ({
        ...prev,
        [questionId]: option
      }));
    }
  };

  const handleSubmit = async () => {
    const correct = questions.reduce((acc, question) => {
      return acc + (answers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);
    const finalScore = (correct / questions.length) * 100;
    
    const probability = calculatePassingProbability(finalScore, questions.length);
    setPassingProbability(probability);
    setScore(finalScore);
    setSubmitted(true);

    try {
      const token = await AsyncStorage.getItem('authToken');
      const userData = await AsyncStorage.getItem('userData');
      if (token && userData) {
        const user = JSON.parse(userData);
        await axios.put('https://bff-iarahub.vercel.app/api/users/update',
          {
            id: user.id,
            progress: `${probability}%`
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
      }
    } catch (error) {
      console.error('Error saving results:', error);
    }
  };

  if (loading) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#F78C38" />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderText>Simulado AWS</HeaderText>
      </Header>
      <ScrollView>
        {questions.map((question, index) => (
          <QuestionCard key={question.id}>
            <QuestionText>{`${index + 1}) ${question.question}`}</QuestionText>
            {Object.entries(question.options).map(([key, value]) => (
              <OptionButton
                key={key}
                selected={answers[question.id] === key}
                onPress={() => handleAnswer(question.id, key)}
              >
                <OptionText selected={answers[question.id] === key}>
                  {`${key.toUpperCase()}) ${value}`}
                </OptionText>
              </OptionButton>
            ))}
            {submitted && (
              <ResultCard correct={answers[question.id] === question.correctAnswer}>
                <ResultText correct={answers[question.id] === question.correctAnswer}>
                  {answers[question.id] === question.correctAnswer ? 'Resposta Correta!' : `Resposta Incorreta. Correta: ${question.correctAnswer.toUpperCase()}`}
                </ResultText>
              </ResultCard>
            )}
          </QuestionCard>
        ))}
        
        {!submitted ? (
          <ActionButton onPress={handleSubmit}>
            <SubmitButtonText>Enviar Respostas</SubmitButtonText>
          </ActionButton>
        ) : (
          <>
            <ScoreText>Sua pontuação: {score.toFixed(1)}%</ScoreText>
            <PassingProbabilityText>
              Probabilidade de aprovação na certificação: {passingProbability}%
            </PassingProbabilityText>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 16 }}>
              <ActionButton onPress={() => {
                setSubmitted(false);
                setAnswers({});
                fetchQuestions();
              }} style={{ flex: 1, marginRight: 8 }}>
                <SubmitButtonText>Tentar Novamente</SubmitButtonText>
              </ActionButton>
              <ActionButton onPress={() => router.back()} style={{ flex: 1, marginLeft: 8 }}>
                <SubmitButtonText>Sair</SubmitButtonText>
              </ActionButton>
            </View>
          </>
        )}
      </ScrollView>
    </Container>
  );
}