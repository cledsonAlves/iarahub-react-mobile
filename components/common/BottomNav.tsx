// components/common/BottomNav.tsx
import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import styled from 'styled-components/native';
import { useRouter, usePathname } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '@/app/styles/theme';

const NavContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${theme.colors.background};
  flex-direction: row;
  justify-content: space-around;
  padding-bottom: ${Platform.OS === 'ios' ? '20px' : '10px'};
  padding-top: 10px;
  border-top-width: 1px;
  border-top-color: ${theme.colors.border};
`;

const NavButton = styled.TouchableOpacity<{ active: boolean }>`
  align-items: center;
  padding: 5px;
  min-width: 70px;
`;

const NavText = styled.Text<{ active: boolean }>`
  color: ${props => props.active ? theme.colors.primary : theme.colors.text.secondary};
  font-size: 12px;
  margin-top: 2px;
`;

export const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { icon: 'home', label: 'Home', route: '/screens/home' },
    { icon: 'mic', label: 'Podcast', route: '/screens/podcast' },
    { icon: 'message', label: 'Chat', route: '/screens/chat' },
    { icon: 'settings', label: 'Config', route: '/screens/settings' }
  ];

  return (
    <NavContainer>
      {navItems.map((item) => (
        <NavButton
          key={item.route}
          active={pathname === item.route}
          onPress={() => router.push(item.route)}
        >
          <Icon
            name={item.icon}
            size={24}
            color={pathname === item.route ? theme.colors.primary : theme.colors.text.secondary}
          />
          <NavText active={pathname === item.route}>{item.label}</NavText>
        </NavButton>
      ))}
    </NavContainer>
  );
};