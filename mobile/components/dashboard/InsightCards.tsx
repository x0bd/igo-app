import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import Text from '../ui/Text';
import Card from '../ui/Card';

const InsightCards = () => {
  return (
    <View className="flex-col gap-4 px-6 mb-8 mt-4">
      <Animated.View entering={FadeInDown.delay(350).duration(500).springify()}>
        <Card 
          variant="default" 
          padding={24} 
          activeOpacity={0.9}
          style={[styles.cardStyle, { backgroundColor: '#1A1A1A', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 20, elevation: 15 }]}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-4">
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                <Ionicons name="restaurant" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.textContainer}>
                <View style={[styles.badge, { backgroundColor: '#FFFFFF' }]}>
                  <Text style={[styles.badgeText, { color: '#000000' }]}>BREAKFAST RECAP</Text>
                </View>
                <Text style={[styles.cardTitle, { color: '#FFFFFF' }]}>High Protein Start</Text>
              </View>
            </View>
            <View style={{ backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: '900', color: '#FFFFFF', letterSpacing: -1 }}>42g</Text>
              <Text style={{ fontSize: 10, fontWeight: '800', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginTop: 2 }}>Protein</Text>
            </View>
          </View>
        </Card>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(450).duration(500).springify()}>
        <Card 
          variant="default" 
          padding={24} 
          activeOpacity={0.9}
          style={[styles.cardStyle, { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F3F4F6' }]}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-4">
              <View style={[styles.iconContainer, { backgroundColor: '#F8F9FA', borderWidth: 1, borderColor: '#F3F4F6' }]}>
                <Ionicons name="calendar" size={24} color="#003399" />
              </View>
              <View style={styles.textContainer}>
                <View style={[styles.badge, { backgroundColor: '#F0F5FF' }]}>
                  <Text style={[styles.badgeText, { color: '#003399' }]}>TOMORROW'S PREP</Text>
                </View>
                <Text style={[styles.cardTitle, { color: '#111827' }]}>2 Meals Scheduled</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
          </View>
        </Card>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 32,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.05,
    shadowRadius: 24,
    elevation: 5,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    gap: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  }
});

export default InsightCards;
