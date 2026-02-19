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
      style={[styles.tabItem, animStyle]}
    >
      <Ionicons
        name={(isActive ? tab.iconActive : tab.icon) as any}
        size={20}
        color={isActive ? '#FFFFFF' : 'rgba(255,255,255,0.4)'}
      />
      <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
        {tab.label}
      </Text>
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
      <Text style={styles.scanLabel}>Scan</Text>
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
    borderRadius: 36,
    paddingHorizontal: 10,
    paddingVertical: 10,
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
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 2,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.32)',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  tabLabelActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  scanButton: {
    marginTop: -30,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  scanButtonInner: {
    width: 62,
    height: 62,
    borderRadius: 24,
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
