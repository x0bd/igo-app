import { Stack } from 'expo-router'
import { TamaguiProvider } from '@tamagui/core'
import config from '../tamagui.config'
import { StatusBar } from 'expo-status-bar'

export default function RootLayout() {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FFFFFF' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="camera" />
        <Stack.Screen name="results" />
      </Stack>
    </TamaguiProvider>
  )
}


