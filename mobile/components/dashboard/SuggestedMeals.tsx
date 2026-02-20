import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Image } from 'expo-image';
import Text from '../ui/Text';
import { COLORS } from '../../constants/design';

const meals = [
  { id: '1', title: 'Teriyaki Salmon Bowl', kcal: 540, tags: ['High Protein', 'Omega 3'], image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=400&fit=crop' },
  { id: '2', title: 'Quinoa Power Salad', kcal: 420, tags: ['Vegan', 'Fiber'], image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&fit=crop' },
  { id: '3', title: 'Chicken Miso Stew', kcal: 480, tags: ['Low Carb', 'Warm'], image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=400&fit=crop' },
];

const SuggestedMeals = () => {
  return (
    <View className="mb-0">
      <View className="px-6 mb-4 flex-row justify-between items-end">
        <Text variant="h2" tight>AI Suggestions</Text>
        <TouchableOpacity>
          <Text variant="caption" color="blue">See all</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, columnGap: 16 }}
      >
        {meals.map((meal, index) => (
          <Animated.View key={meal.id} entering={FadeInDown.delay(300 + index * 100).duration(400)}>
            <TouchableOpacity activeOpacity={0.9}>
              <View 
                className="w-64 rounded-[2rem] overflow-hidden bg-[#1A1A1A] p-4 flex-col justify-end"
                style={{
                  height: 280,
                  shadowColor: '#000',
                  shadowOpacity: 0.3,
                  shadowRadius: 15,
                  shadowOffset: { width: 0, height: 10 },
                  elevation: 10
                }}
              >
                <Image 
                  source={{ uri: meal.image }}
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.5 }}
                  contentFit="cover"
                />
                
                <View className="absolute top-4 left-4 w-2 h-2 rounded-full bg-[#FFD600]" />
                
                <View className="relative z-10">
                  <Text style={{ color: COLORS.text.inverse, fontSize: 20, fontWeight: '800', letterSpacing: -0.5, marginBottom: 4 }}>
                    {meal.title}
                  </Text>
                  
                  <View className="flex-row items-center gap-3">
                    <View className="bg-white/20 rounded-lg px-2 py-1">
                      <Text style={{ color: COLORS.text.inverse, fontSize: 11, fontWeight: '800' }}>{meal.kcal} KCAL</Text>
                    </View>
                    <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: '600' }}>
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
