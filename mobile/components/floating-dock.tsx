import React from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { IGO } from '@/constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type TabKey = 'stats' | 'scan' | 'profile';

interface FloatingDockProps {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
}

interface DockItemProps {
  tabKey: TabKey;
  icon: React.ReactNode;
  isActive: boolean;
  isScan?: boolean;
  onPress: () => void;
}

function DockItem({ tabKey, icon, isActive, isScan, onPress }: DockItemProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.88, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12, stiffness: 300 });
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.dockItem,
        isScan && styles.dockItemScan,
        isActive && !isScan && styles.dockItemActive,
        animatedStyle,
      ]}
    >
      {icon}
    </AnimatedPressable>
  );
}

export function FloatingDock({ activeTab, onTabPress }: FloatingDockProps) {
  return (
    <View style={styles.container}>
      <View style={styles.pill}>
        <DockItem
          tabKey="stats"
          isActive={activeTab === 'stats'}
          onPress={() => onTabPress('stats')}
          icon={
            <Ionicons
              name="bar-chart-outline"
              size={20}
              color="#FFFFFF"
              style={{ opacity: activeTab === 'stats' ? 1 : 0.5 }}
            />
          }
        />
        <DockItem
          tabKey="scan"
          isActive={activeTab === 'scan'}
          isScan
          onPress={() => onTabPress('scan')}
          icon={<Ionicons name="scan" size={22} color={IGO.black} />}
        />
        <DockItem
          tabKey="profile"
          isActive={activeTab === 'profile'}
          onPress={() => onTabPress('profile')}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#FFFFFF"
              style={{ opacity: activeTab === 'profile' ? 1 : 0.5 }}
            />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 34 : 24,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
    pointerEvents: 'box-none',
  },
  pill: {
    backgroundColor: IGO.black,
    borderRadius: IGO.radiusFull,
    paddingHorizontal: IGO.space6,
    paddingVertical: IGO.space6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: IGO.space4,
    ...IGO.shadowDock,
  },
  dockItem: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dockItemScan: {
    width: 64,
    backgroundColor: IGO.white,
    borderRadius: 32,
  },
  dockItemActive: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
});
