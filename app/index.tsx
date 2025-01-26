import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from './services/auth';




export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await authService.login({ email, password });
      await AsyncStorage.setItem('authToken', response.data.token);
      await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
      router.push('/screens/welcome');
    } catch (error) {
      Alert.alert('Erro', 'Credenciais inválidas');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo à Iara</Text>
      <TextInput
        style={styles.input}
        placeholder="email: seu.email@exemplo.com"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="senha: *********"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Acessar" onPress={handleLogin} />

      {/* Opção para ir para o cadastro */}
      <TouchableOpacity onPress={() => router.push('/register')} style={styles.registerButton}>
        <Text style={styles.registerText}>Não tem uma conta? Cadastre-se aqui</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  registerButton: {
    marginTop: 20,
  },
  registerText: {
    color: '#007BFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
