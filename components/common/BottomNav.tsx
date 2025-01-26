// components/common/BottomNav.tsx 
import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Platform } from 'react-native';
import { theme } from '@/app/styles/theme';


const NavContainer = styled.View`
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

export const BottomNav = () => {
  return (
    <NavContainer>
      <Icon name="home" size={24} color={theme.colors.primary} />
      <Icon name="mic" size={24} color="#666" />
      <Icon name="chat" size={24} color="#666" />
      <Icon name="settings" size={24} color="#666" />
    </NavContainer>
  );
};