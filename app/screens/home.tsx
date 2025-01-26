// app/screens/home.tsx
import React from 'react';
import { View, ScrollView, Text, StyleSheet, Platform, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/common/Header';
import { BottomNav } from '@/components/common/BottomNav';
import { ModulesGrid } from '@/components/modules/ModulesGrid';
import { ProgressTracker } from '@/components/modules/Progress';

import IaraSuggestion from '@/components/modules/IaraSuggestion';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../styles/theme';

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = React.useState('');
  const [userProgress, setUserProgress] = React.useState('0');

  useFocusEffect(
    React.useCallback(() => {
      loadUserData();
    }, [])
  );

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        setUserName(user.name);
        setUserProgress(user.progress || '0');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

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

  const handleModulePress = (moduleId: string) => {
    switch(moduleId) {
      case 'podcast':
        router.push('/screens/podcast');
        break;
      case 'simulations':
        router.push('/screens/simulados');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <View style={styles.profileIconContainer}>
              <MaterialIcons name="person" size={24} color="#666" />
            </View>
            <Text style={styles.welcomeText}>Bem-vindo {userName}</Text>
          </View>

          <ProgressTracker progress={userProgress} />
          <IaraSuggestion />

          <View style={styles.promotionCard}>
            <Text style={styles.promotionTitle}>Amplie seu conhecimento</Text>
            <Text style={styles.promotionText}>
              Pratique com simulados e aumente suas chances de aprovação
            </Text>
          </View>

          <ModulesGrid modules={modules} onModulePress={handleModulePress} />

          <View style={styles.certificationSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Mais certificados</Text>
              <Text style={styles.sectionLink}>Ver todos</Text>
            </View>
            {certifications.map((cert, index) => (
              <View key={index} style={styles.certificationCard}>
                <MaterialIcons name="verified" size={24} color="white" />
                <Text style={styles.certificationText}>{cert.name}</Text>
                <Text style={styles.certificationCount}>{cert.count} certificações</Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: Platform.OS === "ios" ? 80 : 70,
  },
  headerContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  promotionCard: {
    backgroundColor: theme.colors.primary,
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  promotionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  promotionText: {
    color: 'white',
    fontSize: 14,
  },
  certificationSection: {
    margin: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  sectionLink: {
    color: theme.colors.text.secondary,
    fontSize: 14,
  },
  certificationCard: {
    backgroundColor: theme.colors.secondary,
    padding: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    ...theme.shadows.small,
  },
  certificationText: {
    color: theme.colors.text.inverse,
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  certificationCount: {
    color: theme.colors.text.inverse,
    fontSize: 14,
    fontWeight: 'bold',
  },
});