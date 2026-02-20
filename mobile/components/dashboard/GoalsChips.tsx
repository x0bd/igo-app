import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const goals = [
  {
    id: '1',
    label: 'Protein Left',
    value: '120g',
    icon: 'barbell',
    bg: '#003399',
    shadowColor: '#003399',
    isYellow: false,
  },
  {
    id: '2',
    label: 'Water Intake',
    value: '4/8',
    icon: 'water',
    bg: '#1A56DB',
    shadowColor: '#1A56DB',
    isYellow: false,
  },
  {
    id: '3',
    label: 'Daily Steps',
    value: '4.2k',
    icon: 'walk',
    bg: '#FFD600',
    shadowColor: '#C8A800',
    isYellow: true,
  },
];

const GoalsChips = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 24, gap: 14, paddingVertical: 4 }}>
      {goals.map((goal, index) => {
        const textColor = goal.isYellow ? '#000000' : '#FFFFFF';
        const subTextColor = goal.isYellow ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.65)';
        const iconBg = goal.isYellow ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.15)';

        return (
          <Animated.View
            key={goal.id}
            entering={FadeInRight.delay(250 + index * 100).duration(500)}>
            <TouchableOpacity
              activeOpacity={0.88}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 14,
                width: 172,
                backgroundColor: goal.bg,
                borderRadius: 28,
                paddingHorizontal: 18,
                paddingVertical: 18,
                shadowColor: goal.shadowColor,
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.4,
                shadowRadius: 18,
                elevation: 10,
              }}>
              {/* Icon circle */}
              <View
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 23,
                  backgroundColor: iconBg,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                <Ionicons name={goal.icon as any} size={22} color={textColor} />
              </View>

              {/* Text */}
              <View style={{ flex: 1, gap: 2 }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '800',
                    color: subTextColor,
                    textTransform: 'uppercase',
                    letterSpacing: 0.6,
                  }}
                  numberOfLines={1}>
                  {goal.label}
                </Text>
                <Text
                  style={{
                    fontSize: 26,
                    fontWeight: '900',
                    color: textColor,
                    letterSpacing: -1,
                    lineHeight: 28,
                  }}
                  numberOfLines={1}>
                  {goal.value}
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </ScrollView>
  );
};

export default GoalsChips;
