import React from 'react';
import { View, ScrollView } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import Text from '../ui/Text';
import Card from '../ui/Card';

const goals = [
  { id: '1', label: 'Protein', value: '120g Left', icon: 'barbell', color: 'blue' },
  { id: '2', label: 'Water', value: '4 Glasses', icon: 'water', color: 'yellow' },
  { id: '3', label: 'Steps', value: '4k / 10k', icon: 'walk', color: 'blue' },
];

const GoalsChips = () => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 24, columnGap: 12 }}
    >
      {goals.map((goal, index) => (
        <Animated.View key={goal.id} entering={FadeInRight.delay(250 + index * 100).duration(400)}>
          <Card 
            variant="default" 
            padding={12} 
            style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              gap: 10,
              borderWidth: 1,
              borderColor: goal.color === 'blue' ? '#BFDBFE' : '#FEF08A'
            }}
          >
            <View className={`w-8 h-8 rounded-full items-center justify-center ${goal.color === 'blue' ? 'bg-blue-100' : 'bg-yellow-100'}`}>
              <Ionicons 
                name={goal.icon as any} 
                size={16} 
                color={goal.color === 'blue' ? '#2563EB' : '#CA8A04'} 
              />
            </View>
            <View>
              <Text variant="label" color="secondary">{goal.label}</Text>
              <Text variant="caption" tight>{goal.value}</Text>
            </View>
          </Card>
        </Animated.View>
      ))}
    </ScrollView>
  );
};

export default GoalsChips;
