

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from './auth'; // Importa a função de login



export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Hook para navegação

  const handleLogin = async () => {
    try {
      // Chama a função de login passando as credenciais
      const response = await login(email, password);

      // Exibe uma mensagem de sucesso
      Alert.alert('Login bem-sucedido!', `Bem-vindo, ${response.user.name}`);

      // Salva o token no AsyncStorage
      await AsyncStorage.setItem('authToken', response.token);

      // Redireciona para o Dashboard
      router.push('/register'); // Certifique-se de que a rota /dashboard existe
    } catch (error) {
      // Exibe mensagem de erro em caso de falha
      Alert.alert('Erro', 'Não foi possível fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo a IAra</Text>
      <TextInput
        style={styles.input}
        placeholder="email: seu.emaasasil@exemplo.com"
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
      <Link href="/auth/register" style={styles.link}>
        Primeiro acesso? Cadastre-se aqui
      </Link>
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
  link: {
    marginTop: 10,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});