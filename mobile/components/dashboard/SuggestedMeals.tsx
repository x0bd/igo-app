import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Image } from 'expo-image';
import Text from '../ui/Text';
import { COLORS } from '../../constants/design';
import { DASHBOARD_MEALS as meals } from '../../data/mockMeals';

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
          <Animated.View key={meal.id} entering={FadeInDown.delay(300 + index * 100).duration(400)}>
            <TouchableOpacity activeOpacity={0.9}>
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
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.5,
                  }}
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
                    <Text
                      style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: '600' }}>
                      {meal.tags.join(' • ')}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SuggestedMeals;
