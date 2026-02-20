import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FloatingDockProps {
  activeRoute?: string;
  onNavigate?: (route: string) => void;
}

const FloatingDock: React.FC<FloatingDockProps> = ({ activeRoute = 'home', onNavigate }) => {
  const insets = useSafeAreaInsets();
  const scale = useSharedValue(1);

  const navItems = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'stats', icon: 'stats-chart', label: 'Stats' },
    { id: 'scan', icon: 'camera', label: 'Scan', isElevated: true },
    { id: 'profile', icon: 'person', label: 'Profile' },
  ];

  const handlePress = (itemId: string) => {
    scale.value = withSpring(0.88, { damping: 15, stiffness: 300 });
    setTimeout(() => {
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    }, 100);
    onNavigate?.(itemId);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View
      className="absolute bottom-6 left-0 right-0 items-center z-50"
      style={{ paddingBottom: Math.max(insets.bottom, 0) }}
    >
      <View
        className="bg-[#111111] flex-row items-center justify-between px-2"
        style={{
          width: '90%',
          maxWidth: 400,
          height: 80,
          borderRadius: 40,
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 25,
          shadowOffset: { width: 0, height: 25 },
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.1)',
          ...Platform.select({
            android: {
              elevation: 20,
            },
          }),
        }}
      >
        {navItems.map((item, index) => {
          const isActive = activeRoute === item.id;
          const isElevated = item.isElevated;

          if (isElevated) {
            // Elevated Scan Button
            return (
              <Animated.View
                key={item.id}
                style={[
                  {
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    backgroundColor: '#FFFFFF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: -20,
                    shadowColor: '#000',
                    shadowOpacity: 0.3,
                    shadowRadius: 12,
                    shadowOffset: { width: 0, height: 8 },
                    borderWidth: 4,
                    borderColor: '#000000',
                    ...Platform.select({
                      android: {
                        elevation: 15,
                      },
                    }),
                  },
                  animatedStyle,
                ]}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handlePress(item.id)}
                  style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Ionicons name={item.icon as any} size={28} color="#000000" />
                </TouchableOpacity>
              </Animated.View>
            );
          }

          if (item.id === 'home') {
            // Home button is always white rounded-full
            return (
              <Animated.View key={item.id} style={animatedStyle}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handlePress(item.id)}
                  className="w-16 h-16 rounded-full items-center justify-center bg-white"
                  style={{
                    shadowColor: '#000',
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    shadowOffset: { width: 0, height: 4 },
                    ...Platform.select({
                      android: {
                        elevation: 8,
                      },
                    }),
                  }}
                >
                  <Ionicons name="home" size={28} color="#000000" />
                </TouchableOpacity>
              </Animated.View>
            );
          }

          // Other nav items (stats, profile)
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              onPress={() => handlePress(item.id)}
              className="w-16 h-16 items-center justify-center"
            >
              <Ionicons
                name={isActive ? (item.icon as any) : (`${item.icon}-outline` as any)}
                size={28}
                color={isActive ? '#FFFFFF' : '#6B7280'}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default FloatingDock;

