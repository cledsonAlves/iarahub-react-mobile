// app/register.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { authService } from '@/app/services/auth';
import { storageService } from '@/app/services/storage';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    enterprise: ''
  });
  const router = useRouter();

  const handleRegister = async () => {
    try {
      if (formData.password !== formData.confirmPassword) {
        Alert.alert('Erro', 'As senhas não coincidem');
        return;
      }

      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'User',
        enterprise: formData.enterprise || 'NTTData',
        language: 'PTBR'
      };

      const response = await authService.register(userData);

      if (response?.status) {
        await storageService.setUserData(response.data.user);
        await storageService.setAuthToken(response.data.token);
   
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        router.push('/');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao realizar cadastro';
      Alert.alert('Erro', message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput 
        style={styles.input}
        placeholder="Nome completo"
        value={formData.name}
        onChangeText={(text) => setFormData({...formData, name: text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({...formData, email: text})}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={formData.password}
        onChangeText={(text) => setFormData({...formData, password: text})}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        value={formData.confirmPassword}
        onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Empresa"
        value={formData.enterprise}
        onChangeText={(text) => setFormData({...formData, enterprise: text})}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#F78C38',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});