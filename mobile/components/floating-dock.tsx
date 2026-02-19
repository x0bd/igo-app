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

function DockItem({
  isActive,
  isScan,
  onPress,
  children,
}: {
  isActive: boolean;
  isScan?: boolean;
  onPress: () => void;
  children: React.ReactNode;
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
      style={[
        styles.dockItem,
        isScan && styles.dockItemScan,
        isActive && !isScan && styles.dockItemActive,
        animStyle,
      ]}
    >
      {children}
    </AnimatedPressable>
  );
}

export function FloatingDock({ activeTab, onTabPress }: FloatingDockProps) {
  return (
    <View style={styles.container}>
      <View style={styles.pill}>
        <DockItem
          isActive={activeTab === 'stats'}
          onPress={() => onTabPress('stats')}
        >
          <Ionicons
            name={activeTab === 'stats' ? 'bar-chart' : 'bar-chart-outline'}
            size={19}
            color={IGO.white}
            style={{ opacity: activeTab === 'stats' ? 1 : 0.45 }}
          />
        </DockItem>

        <DockItem
          isActive={activeTab === 'scan'}
          isScan
          onPress={() => onTabPress('scan')}
        >
          <Ionicons name="scan" size={21} color={IGO.black} />
        </DockItem>

        <DockItem
          isActive={activeTab === 'profile'}
          onPress={() => onTabPress('profile')}
        >
          <Ionicons
            name={activeTab === 'profile' ? 'person' : 'person-outline'}
            size={19}
            color={IGO.white}
            style={{ opacity: activeTab === 'profile' ? 1 : 0.45 }}
          />
        </DockItem>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 36 : 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
    pointerEvents: 'box-none',
  },
  pill: {
    backgroundColor: 'rgba(0,0,0,0.92)',
    borderRadius: 100,
    paddingHorizontal: 6,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 14,
  },
  dockItem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dockItemScan: {
    width: 62,
    height: 50,
    backgroundColor: IGO.white,
    borderRadius: 25,
  },
  dockItemActive: {
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
});
