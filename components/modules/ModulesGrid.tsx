// components/modules/ModulesGrid.tsx
import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '@/app/styles/theme';


const Grid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 16px;
  justify-content: space-between;
`;

const ModuleItem = styled.TouchableOpacity`
  width: 48%;
  aspect-ratio: 1;
  background-color: ${theme.colors.primary};
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

const modules = [
  { id: "lab", title: "Laboratórios", icon: "science" },
  { id: "podcast", title: "Podcast", icon: "headset" },
  { id: "simulations", title: "Simulados", icon: "assignment" },
  { id: "tutors", title: "Tutores", icon: "school" },
];

interface ModulesGridProps {
  onModulePress: (moduleId: string) => void;
}

export const ModulesGrid: React.FC<ModulesGridProps> = ({ onModulePress }) => {
  return (
    <Grid>
      {modules.map((module) => (
        <ModuleItem
          key={module.id}
          onPress={() => onModulePress(module.id)}
        >
          <Icon name={module.icon} size={32} color="white" />
          <ModuleText>{module.title}</ModuleText>
        </ModuleItem>
      ))}
    </Grid>
  );
};