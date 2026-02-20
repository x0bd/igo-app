import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, usePathname } from 'expo-router';

// Map nav item id → Expo Router href
const ROUTES: Record<string, string> = {
  home: '/',
  scan: '/scan',
  stats: '/stats',
  profile: '/profile',
};

// Map pathname back to nav item id
function pathnameToId(pathname: string): string {
  if (pathname === '/' || pathname === '/index') return 'home';
  if (pathname.includes('scan')) return 'scan';
  if (pathname.includes('stats')) return 'stats';
  if (pathname.includes('profile')) return 'profile';
  return 'home';
}

interface NavItem {
  id: string;
  icon: string;
  isElevated?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', icon: 'home' },
  { id: 'stats', icon: 'stats-chart' },
  { id: 'scan', icon: 'camera', isElevated: true },
  { id: 'profile', icon: 'person' },
];

// ─── Individual animated nav button ──────────────────────────────────────────
const NavButton = ({
  item,
  isActive,
  onPress,
}: {
  item: NavItem;
  isActive: boolean;
  onPress: () => void;
}) => {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const handlePressIn = () => {
    scale.value = withSpring(0.85, { damping: 15, stiffness: 300 });
  };
  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  // ── Elevated scan button ──────────────────────────────────────────────────
  if (item.isElevated) {
    return (
      <Animated.View
        style={[
          {
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: isActive ? '#003399' : '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -20,
            shadowColor: isActive ? '#003399' : '#000',
            shadowOpacity: isActive ? 0.5 : 0.3,
            shadowRadius: 14,
            shadowOffset: { width: 0, height: 8 },
            borderWidth: 4,
            borderColor: '#000000',
            ...Platform.select({ android: { elevation: 15 } }),
          },
          animStyle,
        ]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="camera" size={28} color={isActive ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // ── Home button ───────────────────────────────────────────────────────────
  if (item.id === 'home') {
    return (
      <Animated.View style={animStyle}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: isActive ? '#003399' : '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            ...Platform.select({ android: { elevation: 8 } }),
          }}>
          <Ionicons name="home" size={26} color={isActive ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // ── Stats / Profile buttons ───────────────────────────────────────────────
  return (
    <Animated.View style={animStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons
          name={isActive ? (item.icon as any) : (`${item.icon}-outline` as any)}
          size={26}
          color={isActive ? '#FFFFFF' : '#6B7280'}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

// ─── FloatingDock ─────────────────────────────────────────────────────────────
const FloatingDock = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();
  const activeId = pathnameToId(pathname);

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 24,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 50,
        paddingBottom: Math.max(insets.bottom, 0),
      }}>
      <View
        style={{
          backgroundColor: '#111111',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 8,
          width: '90%',
          maxWidth: 400,
          height: 80,
          borderRadius: 40,
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 25,
          shadowOffset: { width: 0, height: 25 },
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.1)',
          ...Platform.select({ android: { elevation: 20 } }),
        }}>
        {NAV_ITEMS.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            isActive={activeId === item.id}
            onPress={() => router.push(ROUTES[item.id] as any)}
          />
        ))}
      </View>
    </View>
  );
};

export default FloatingDock;
