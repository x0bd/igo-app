import React from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Text from '../ui/Text';
import Card from '../ui/Card';

const InsightCards = () => {
  return (
    <View className="flex-row gap-4 px-6 mb-8 mt-2">
      <Animated.View entering={FadeInDown.delay(350).duration(400)} className="flex-1">
        <Card variant="default" padding={16} style={{ height: 110, justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 24 }}>🥑</Text>
          <View>
            <Text variant="caption" tight>Breakfast Recap</Text>
            <Text variant="label" color="secondary" style={{ marginTop: 2 }}>High Protein</Text>
          </View>
        </Card>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(400).duration(400)} className="flex-1">
        <Card variant="default" padding={16} style={{ height: 110, justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 24 }}>🍱</Text>
          <View>
            <Text variant="caption" tight>Prep for Tomorrow</Text>
            <Text variant="label" color="secondary" style={{ marginTop: 2 }}>2 Meals Scheduled</Text>
          </View>
        </Card>
      </Animated.View>
    </View>
  );
};

export default InsightCards;
