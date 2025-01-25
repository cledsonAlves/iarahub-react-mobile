import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [enterprise, setEnterprise] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    // Verificar se as senhas coincidem
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      // Monta o payload para a API
      const payload = {
        name: 'Usuário Teste', // Pode ser adaptado para coletar o nome
        email,
        password,
        role: 'User', // Padrão
        enterprise,
        language: 'PTBR', // Padrão
      };

      // Faz a requisição para a API de registro
      const response = await axios.post('https://bff-iarahub.vercel.app/api/users/register', payload);

      // Exibe uma mensagem de sucesso
      Alert.alert('Sucesso', response.data.message);

      // Redireciona para a tela de login
      router.push('/tutorial');
    } catch (error: any) {
      // Tratar erros da API
      const errorMessage = error.response?.data?.message || 'Erro ao cadastrar usuário. Tente novamente.';
      Alert.alert('Erro', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>
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
      <TextInput
        style={styles.input}
        placeholder="confirmar senha: *********"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Qual sua empresa? (ex.: NTData)"
        value={enterprise}
        onChangeText={setEnterprise}
      />
      <Button title="Cadastrar" onPress={handleRegister} />
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
});
