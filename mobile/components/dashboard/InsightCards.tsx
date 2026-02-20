import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const InsightCards = () => {
  return (
    <View style={{ paddingHorizontal: 24, marginBottom: 32, marginTop: 16, gap: 12 }}>
      {/* Dark card — Breakfast Recap */}
      <Animated.View entering={FadeInDown.delay(350).duration(500).springify()}>
        <TouchableOpacity
          activeOpacity={0.88}
          style={{
            backgroundColor: '#111111',
            borderRadius: 28,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.25,
            shadowRadius: 20,
            elevation: 14,
          }}>
          {/* Left */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 }}>
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 18,
                backgroundColor: 'rgba(255,255,255,0.08)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Ionicons name="restaurant" size={22} color="#FFFFFF" />
            </View>
            <View style={{ gap: 5 }}>
              <View
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  paddingHorizontal: 10,
                  paddingVertical: 3,
                  borderRadius: 8,
                }}>
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: '800',
                    color: 'rgba(255,255,255,0.55)',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                  }}>
                  BREAKFAST RECAP
                </Text>
              </View>
              <Text
                style={{ fontSize: 18, fontWeight: '900', color: '#FFFFFF', letterSpacing: -0.5 }}>
                High Protein Start
              </Text>
            </View>
          </View>

          {/* Right — metric pill */}
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)',
              borderRadius: 16,
              paddingHorizontal: 14,
              paddingVertical: 10,
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 20, fontWeight: '900', color: '#FFFFFF', letterSpacing: -1 }}>
              42g
            </Text>
            <Text
              style={{
                fontSize: 9,
                fontWeight: '800',
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                marginTop: 2,
              }}>
              Protein
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* White card — Tomorrow's Prep */}
      <Animated.View entering={FadeInDown.delay(450).duration(500).springify()}>
        <TouchableOpacity
          activeOpacity={0.88}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 28,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: '#EFEFEF',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 12,
            elevation: 3,
          }}>
          {/* Left */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 }}>
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 18,
                backgroundColor: '#EEF3FF',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Ionicons name="calendar" size={22} color="#003399" />
            </View>
            <View style={{ gap: 5 }}>
              <View
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: '#EEF3FF',
                  paddingHorizontal: 10,
                  paddingVertical: 3,
                  borderRadius: 8,
                }}>
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: '800',
                    color: '#003399',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                  }}>
                  TOMORROW'S PREP
                </Text>
              </View>
              <Text
                style={{ fontSize: 18, fontWeight: '900', color: '#111827', letterSpacing: -0.5 }}>
                2 Meals Scheduled
              </Text>
            </View>
          </View>

          {/* Right — chevron badge */}
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              backgroundColor: '#F4F4F5',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default InsightCards;
