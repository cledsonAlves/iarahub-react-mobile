// app/_layout.tsx
import { Stack } from 'expo-router';


export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="register" options={{ headerShown: true, title: 'Cadastro' }} />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="tutorial" />
      <Stack.Screen name="modulos" />
      <Stack.Screen name="screens/home" />
      <Stack.Screen name="screens/podcast" options={{ headerShown: true, title: 'Podcast' }} />
      <Stack.Screen name="screens/simulados" options={{ headerShown: true, title: 'Simulados' }} />
      <Stack.Screen name="screens/study" options={{ headerShown: true, title: 'Material de Estudo' }} />
      <Stack.Screen name="screens/settings" options={{ headerShown: true, title: 'Configurações' }} />
      <Stack.Screen name="screens/chat" options={{ headerShown: false }} />
      <Stack.Screen name="screens/imageAnalyse" options={{ headerShown: false }} />
    </Stack>
  );
}

