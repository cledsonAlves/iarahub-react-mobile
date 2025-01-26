// components/common/Header.tsx
import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '@/app/styles/theme';


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
  color: ${theme.colors.text};
`;

interface HeaderProps {
  userName?: string;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ userName, showBack = false }) => {
  return (
    <HeaderContainer>
      {showBack && (
        <Icon name="arrow-back" size={24} color={theme.colors.text} />
      )}
      <ProfileIconContainer>
        <Icon name="person" size={24} color="#666" />
      </ProfileIconContainer>
      <WelcomeText>Bem-vindo {userName}</WelcomeText>
    </HeaderContainer>
  );
};