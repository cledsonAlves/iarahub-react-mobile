import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '@/app/styles/theme';

const TabBar = ({ state, descriptors, navigation }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[styles.tab, isFocused ? styles.activeTab : null]}
          >
            <Icon name={getIconName(route.name)} size={24} color={isFocused ? theme.colors.primary : theme.colors.text.secondary} />
            <Text style={[styles.label, isFocused ? styles.activeLabel : null]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const getIconName = (routeName) => {
  switch (routeName) {
    case 'Home':
      return 'home';
    case 'Simulados':
      return 'assignment';
    case 'Estudo':
      return 'school';
    case 'Podcast':
      return 'headset';
    case 'Perfil':
      return 'person';
    default:
      return 'help-outline';
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: theme.colors.primary,
  },
  label: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  activeLabel: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default TabBar;
