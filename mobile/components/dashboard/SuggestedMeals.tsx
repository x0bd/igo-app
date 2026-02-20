import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Image } from 'expo-image';
import Text from '../ui/Text';
import { COLORS } from '../../constants/design';
import { DASHBOARD_MEALS as meals, DashboardMeal } from '../../data/mockMeals';

// ─── Individual meal card with spring press ───────────────────────────────────
const MealCard = ({ meal, index }: { meal: DashboardMeal; index: number }) => {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInDown.delay(300 + index * 100).springify()} style={animStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={() => {
          scale.value = withSpring(0.94, { damping: 15, stiffness: 280 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 15, stiffness: 280 });
        }}>
        <View
          className="w-64 flex-col justify-end overflow-hidden rounded-[2rem] bg-[#1A1A1A] p-4"
          style={{
            height: 280,
            shadowColor: '#000',
            shadowOpacity: 0.3,
            shadowRadius: 15,
            shadowOffset: { width: 0, height: 10 },
            elevation: 10,
          }}>
          <Image
            source={{ uri: meal.image }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.5 }}
            contentFit="cover"
          />
          <View className="absolute left-4 top-4 h-2 w-2 rounded-full bg-[#FFD600]" />
          <View className="relative z-10">
            <Text
              style={{
                color: COLORS.text.inverse,
                fontSize: 20,
                fontWeight: '800',
                letterSpacing: -0.5,
                marginBottom: 4,
              }}>
              {meal.title}
            </Text>
            <View className="flex-row items-center gap-3">
              <View className="rounded-lg bg-white/20 px-2 py-1">
                <Text style={{ color: COLORS.text.inverse, fontSize: 11, fontWeight: '800' }}>
                  {meal.kcal} KCAL
                </Text>
              </View>
              <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: '600' }}>
                {meal.tags.join(' • ')}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const SuggestedMeals = () => {
  return (
    <View className="mb-0">
      <View className="mb-4 flex-row items-end justify-between px-6">
        <Text variant="h2" tight>
          AI Suggestions
        </Text>
        <TouchableOpacity>
          <Text variant="caption" color="blue">
            See all
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, columnGap: 16 }}>
        {meals.map((meal, index) => (
          <MealCard key={meal.id} meal={meal} index={index} />
        ))}
      </ScrollView>
    </View>
  );
};

export default SuggestedMeals;
