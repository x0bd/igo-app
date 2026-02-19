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
  { key: 'home', icon: 'grid-outline', iconActive: 'grid', label: 'Home' },
  { key: 'stats', icon: 'analytics-outline', iconActive: 'analytics', label: 'Stats' },
  { key: 'scan', icon: 'camera-outline', iconActive: 'camera', label: 'Scan' },
  { key: 'profile', icon: 'person-outline', iconActive: 'person', label: 'You' },
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
        color={isActive ? '#FFFFFF' : 'rgba(255,255,255,0.35)'}
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
        <Ionicons name="scan" size={24} color="#000" />
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

        {/* Center scan — elevated */}
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
    bottom: Platform.OS === 'ios' ? 28 : 16,
    left: 16,
    right: 16,
    alignItems: 'center',
    zIndex: 100,
    pointerEvents: 'box-none',
  },
  dock: {
    backgroundColor: 'rgba(10,10,10,0.95)',
    borderRadius: 28,
    paddingHorizontal: 8,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 28,
    elevation: 16,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 14,
    gap: 3,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  scanButton: {
    marginTop: -28,
    marginHorizontal: 8,
  },
  scanButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 3,
    borderColor: 'rgba(10,10,10,0.95)',
  },
});
