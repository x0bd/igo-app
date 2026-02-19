import React from 'react';
import { View, Pressable, StyleSheet, Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type TabKey = 'home' | 'stats' | 'scan' | 'profile';

interface FloatingDockProps {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
}

const TABS: { key: TabKey; icon: string; iconActive: string; label: string }[] = [
  { key: 'home', label: 'Home', icon: 'grid-outline', iconActive: 'grid' },
  { key: 'stats', label: 'Stats', icon: 'analytics-outline', iconActive: 'analytics' },
  { key: 'scan', label: 'Scan', icon: 'scan-outline', iconActive: 'scan' },
  { key: 'profile', label: 'You', icon: 'person-outline', iconActive: 'person' },
];

function TabItem({
  tab,
  isActive,
  onPress,
}: {
  tab: (typeof TABS)[0];
  isActive: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.85, { damping: 15, stiffness: 400 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 12, stiffness: 300 });
      }}
      style={[styles.tabItem, isActive && styles.tabItemActive, animStyle]}
    >
      <Ionicons
        name={(isActive ? tab.iconActive : tab.icon) as any}
        size={22}
        color={isActive ? '#FFFFFF' : 'rgba(255,255,255,0.4)'}
      />
    </AnimatedPressable>
  );
}

function ScanButton({ isActive, onPress }: { isActive: boolean; onPress: () => void }) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.88, { damping: 15, stiffness: 400 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 10, stiffness: 250 });
      }}
      style={[styles.scanButton, animStyle]}
    >
      <View style={styles.scanButtonInner}>
        <Ionicons
          name={isActive ? 'camera' : 'camera-outline'}
          size={24}
          color="#000000"
        />
      </View>
    </AnimatedPressable>
  );
}

export function FloatingDock({ activeTab, onTabPress }: FloatingDockProps) {
  return (
    <View style={styles.container}>
      <View style={styles.dock}>
        {/* Left tabs */}
        <TabItem
          tab={TABS[0]}
          isActive={activeTab === 'home'}
          onPress={() => onTabPress('home')}
        />
        <TabItem
          tab={TABS[1]}
          isActive={activeTab === 'stats'}
          onPress={() => onTabPress('stats')}
        />

        {/* Center scan — elevated primary pill */}
        <ScanButton
          isActive={activeTab === 'scan'}
          onPress={() => onTabPress('scan')}
        />

        {/* Right tabs */}
        <TabItem
          tab={TABS[3]}
          isActive={activeTab === 'profile'}
          onPress={() => onTabPress('profile')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 30 : 18,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 100,
    pointerEvents: 'box-none',
  },
  dock: {
    backgroundColor: '#050607',
    borderRadius: 40,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.45,
    shadowRadius: 40,
    elevation: 20,
    borderWidth: 0.8,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tabItemActive: {
    borderRadius: 999,
    backgroundColor: 'rgba(249,250,251,0.06)',
  },
  scanButton: {
    marginTop: -34,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  scanButtonInner: {
    width: 70,
    height: 70,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 10,
    borderWidth: 4,
    borderColor: '#050607',
  },
  scanLabel: {
    marginTop: 4,
    fontSize: 9,
    fontWeight: '800',
    color: '#F9FAFB',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
