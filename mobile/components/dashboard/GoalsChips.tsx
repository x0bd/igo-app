import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Animated, {
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { DAILY_GOALS as goals } from '../../data/mockGoals';
import { DailyGoal } from '../../data/mockGoals';

// ─── Individual chip with spring press ───────────────────────────────────────
const GoalChip = ({ goal, index }: { goal: DailyGoal; index: number }) => {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const textColor = goal.isYellow ? '#000000' : '#FFFFFF';
  const subTextColor = goal.isYellow ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.65)';
  const iconBg = goal.isYellow ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.15)';

  return (
    <Animated.View entering={FadeInRight.delay(250 + index * 100).duration(500)} style={animStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={() => {
          scale.value = withSpring(0.92, { damping: 15, stiffness: 300 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 15, stiffness: 300 });
        }}
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
};

const GoalsChips = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 24, gap: 14, paddingVertical: 4 }}>
      {goals.map((goal, index) => (
        <GoalChip key={goal.id} goal={goal} index={index} />
      ))}
    </ScrollView>
  );
};

export default GoalsChips;
