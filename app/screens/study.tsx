import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';

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

const TopicCard = styled.View`
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

const TopicTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
`;

const TopicContent = styled.Text`
  font-size: 16px;
  color: #666;
  line-height: 24px;
`;

export default function StudyScreen() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const { suggestion } = useLocalSearchParams();

  useEffect(() => {
    fetchStudyMaterial();
  }, []);

  const fetchStudyMaterial = async () => {
    try {
      const response = await axios.post('https://bff-iarahub.vercel.app/api/ia/stackspot', {
        prompt: `Baseado na sugestão "${suggestion}", forneça um guia de estudos detalhado com explicações sobre cada tópico sugerido. Divida em seções claras.`,
        system: "Você é um instrutor especialista em AWS que fornece explicações técnicas detalhadas e precisas"
      });

      const content = response.data.message;
      const parsedTopics = parseContent(content);
      setTopics(parsedTopics);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching study material:', error);
      setLoading(false);
    }
  };

  const parseContent = (content) => {
    const sections = content.split(/\*\*([^*]+)\*\*/);
    const parsedTopics = [];
    
    for (let i = 1; i < sections.length; i += 2) {
      if (sections[i] && sections[i + 1]) {
        parsedTopics.push({
          title: sections[i].trim(),
          content: sections[i + 1].trim()
        });
      }
    }

    return parsedTopics;
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
        <HeaderText>Material de Estudo</HeaderText>
      </Header>
      <ScrollView>
        {topics.map((topic, index) => (
          <TopicCard key={index}>
            <TopicTitle>{topic.title}</TopicTitle>
            <TopicContent>{topic.content}</TopicContent>
          </TopicCard>
        ))}
      </ScrollView>
    </Container>
  );
}