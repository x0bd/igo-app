import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    PlusJakartaSans: PlusJakartaSans_700Bold,
    PlusJakartaSans_400: PlusJakartaSans_400Regular,
    PlusJakartaSans_500: PlusJakartaSans_500Medium,
    PlusJakartaSans_600: PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700: PlusJakartaSans_700Bold,
    PlusJakartaSans_800: PlusJakartaSans_800ExtraBold,
  });

  SplashScreen.preventAutoHideAsync().catch(() => {});

  if (fontsLoaded) {
    SplashScreen.hideAsync().catch(() => {});
  }

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
