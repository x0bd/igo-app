import React from 'react';
import { View, ScrollView } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import Text from '../ui/Text';
import Card from '../ui/Card';

const goals = [
  { id: '1', label: 'Protein Left', value: '120g', icon: 'barbell', color: '#003399', bg: '#003399' },
  { id: '2', label: 'Water Intake', value: '4/8', icon: 'water', color: '#2563EB', bg: '#2563EB' },
  { id: '3', label: 'Daily Steps', value: '4.2k', icon: 'walk', color: '#FFD600', bg: '#FFD600' },
];

const GoalsChips = () => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 24, columnGap: 16 }}
    >
      {goals.map((goal, index) => {
        const isYellow = goal.color === '#FFD600';
        const textColor = isYellow ? '#000000' : '#FFFFFF';
        const subTextColor = isYellow ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)';
        
        return (
          <Animated.View key={goal.id} entering={FadeInRight.delay(250 + index * 100).duration(500)}>
            <Card 
              variant="default" 
              padding={20}
              activeOpacity={0.9}
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                gap: 16,
                width: 180, 
                backgroundColor: goal.bg,
                shadowColor: goal.bg,
                shadowOffset: { width: 0, height: 12 },
                shadowOpacity: 0.35,
                shadowRadius: 20,
                elevation: 12,
                borderRadius: 32, 
                borderWidth: 0,
              }}
            >
              <View 
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: isYellow ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.15)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons 
                  name={goal.icon as any} 
                  size={24} 
                  color={textColor} 
                />
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <Text 
                  style={{ 
                    fontSize: 11, 
                    fontWeight: '800', 
                    color: subTextColor,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  {goal.label}
                </Text>
                <Text 
                  style={{ 
                    fontSize: 24, 
                    fontWeight: '900', 
                    color: textColor,
                    letterSpacing: -1,
                    lineHeight: 24
                  }}
                  numberOfLines={1}
                >
                  {goal.value}
                </Text>
              </View>
            </Card>
          </Animated.View>
        );
      })}
    </ScrollView>
  );
};

export default GoalsChips;
