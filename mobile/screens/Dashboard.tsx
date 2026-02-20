import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

const days = [
  { label: 'Mon', date: 24 },
  { label: 'Tue', date: 25 },
  { label: 'Wed', date: 26 },
  { label: 'Thu', date: 27 },
  { label: 'Fri', date: 28 },
];

const Dashboard = () => {
  return (
    <ScrollView
      className="flex-1 bg-cimas-off-white"
      contentContainerStyle={{ paddingBottom: 140 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Animated.View
        entering={FadeInDown.duration(400)}
        className="px-5 pt-12 pb-4 flex-row justify-between items-center"
      >
        <View className="flex-row items-center gap-4">
          <View
            className="w-14 h-14 rounded-full p-1 shadow-lg"
            style={{ backgroundColor: 'rgba(0, 51, 153, 0.12)' }}
          >
            <LinearGradient
              colors={['#FFFFFF', '#E0EBFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1, borderRadius: 9999, alignItems: 'center', justifyContent: 'center' }}
            >
              <Text className="text-cimas-blue text-lg font-black">MT</Text>
            </LinearGradient>
          </View>
          <View>
            <Text className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.18em]">
              Good Morning
            </Text>
            <Text
              className="text-2xl font-extrabold text-gray-900"
              style={{ letterSpacing: -0.04 }}
            >
              Marcus T.
            </Text>
          </View>
        </View>
        <TouchableOpacity className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg active:scale-95">
          <Ionicons name="notifications-outline" size={24} color="#111827" />
        </TouchableOpacity>
      </Animated.View>

      {/* Day Selector */}
      <Animated.View entering={FadeInDown.duration(400).delay(80)} className="px-5 py-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ columnGap: 12 }}
        >
          {days.map((day, index) => {
            const isActive = index === 2;
            return (
            <TouchableOpacity
                key={day.label}
                activeOpacity={0.9}
                className={`w-[72px] h-[96px] rounded-[2rem] flex-col items-center justify-center transition-all ${
                  isActive
                    ? 'bg-gray-900 shadow-xl scale-105'
                    : 'bg-white border border-gray-100 shadow-sm opacity-70'
                }`}
            >
                <Text className="text-xs font-bold mb-1 text-gray-400">{day.label}</Text>
                <Text
                  className={`text-2xl font-black ${isActive ? 'text-white' : 'text-gray-900'}`}
                  style={{ letterSpacing: -0.04 }}
                >
                  {day.date}
                </Text>
                {isActive && <View className="w-1.5 h-1.5 bg-cimas-blue rounded-full mt-2" />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animated.View>

      {/* Hero Card */}
      <Animated.View entering={FadeInDown.duration(400).delay(150)} className="px-5 mb-8">
        <View
          className="relative h-[320px] rounded-[2.5rem] overflow-hidden"
          style={{
            shadowColor: '#000',
            shadowOpacity: 0.18,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 12 },
            elevation: 10,
          }}
        >
          <LinearGradient
            colors={['#FFFFFF', '#E5EEFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
          >
            {/* Decorative Blobs */}
            <View className="absolute top-0 right-0 w-64 h-64 bg-cimas-blue/20 rounded-full blur-3xl -mr-16 -mt-16" />
            <View className="absolute bottom-0 left-0 w-48 h-48 bg-cimas-yellow/25 rounded-full blur-2xl -ml-10 -mb-10" />

            {/* Decorative Shapes */}
            <View className="absolute top-1/2 right-[-20px] -translate-y-1/2 w-40 h-40">
              <View
                className="w-24 h-24 rounded-full absolute top-0 right-10 z-10"
                style={{
                  backgroundColor: '#FFD600',
                  shadowColor: '#000',
                  shadowOpacity: 0.25,
                  shadowRadius: 16,
                  shadowOffset: { width: 0, height: 10 },
                }}
              />
              <View
                className="w-32 h-32 rounded-3xl absolute top-10 right-0 rotate-12 z-0"
                style={{
                  backgroundColor: '#003399',
                  shadowColor: '#000',
                  shadowOpacity: 0.25,
                  shadowRadius: 16,
                  shadowOffset: { width: 0, height: 10 },
                }}
              />
            </View>

            <View className="relative z-10 p-8 h-full flex-col justify-between">
              <View>
                <View
                  className="px-4 py-2 rounded-full mb-4 border"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: 'rgba(0, 51, 153, 0.18)',
                  }}
                >
                  <Text className="text-cimas-blue text-[11px] font-bold tracking-[0.18em]">
                    TODAY'S FOCUS
                  </Text>
                </View>
                <Text
                  className="text-4xl font-black text-gray-900 leading-[0.95] mb-2"
                  style={{ letterSpacing: -0.04 }}
                >
                  Scan your{'\n'}lunch with iGo
                </Text>
                <Text className="text-gray-600 text-sm font-medium w-3/4 leading-relaxed">
                  Capture any meal and get instant, medical‑grade nutrition feedback from iGo.
                </Text>
              </View>

              <View className="flex-row -space-x-3 mt-4">
                <View className="w-10 h-10 rounded-full border-2 border-white bg-cimas-blue/20 items-center justify-center">
                  <Text className="text-cimas-blue text-xs font-bold">MT</Text>
                </View>
                <View className="w-10 h-10 rounded-full border-2 border-white bg-cimas-yellow/20 items-center justify-center">
                  <Text className="text-cimas-yellow text-xs font-bold">AB</Text>
                </View>
                <View className="w-10 h-10 rounded-full border-2 border-white bg-cimas-blue/20 items-center justify-center">
                  <Text className="text-cimas-blue text-xs font-bold">CD</Text>
                </View>
                <View className="w-10 h-10 rounded-full border-2 border-white bg-white items-center justify-center">
                  <Text className="text-gray-600 text-[10px] font-bold">+8k</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </Animated.View>

      {/* Quick Glance */}
      <Animated.View entering={FadeInDown.duration(400).delay(200)} className="px-5 mb-6">
        <View className="flex-row gap-3">
          <View className="flex-1 bg-gray-900 rounded-full px-4 py-3 flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-full bg-cimas-blue/20 items-center justify-center">
              <Ionicons name="flame" size={20} color="#FFD600" />
            </View>
            <View>
              <Text className="text-white text-lg font-black">2,340</Text>
              <Text className="text-gray-400 text-xs font-medium">Calories</Text>
            </View>
          </View>
          
          <View className="flex-1 bg-gray-900 rounded-full px-4 py-3 flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-full bg-cimas-yellow/20 items-center justify-center">
              <Ionicons name="flame" size={20} color="#FFD600" />
            </View>
            <View>
              <Text className="text-white text-lg font-black">12</Text>
              <Text className="text-gray-400 text-xs font-medium">Streak</Text>
            </View>
          </View>
          
          <View className="flex-1 bg-white border-2 border-cimas-yellow/30 rounded-full px-4 py-3 flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-full bg-cimas-yellow/20 items-center justify-center">
              <Ionicons name="camera" size={20} color="#FFD600" />
            </View>
            <View>
              <Text className="text-gray-900 text-lg font-black">45</Text>
              <Text className="text-gray-600 text-xs font-medium">Scans</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Routine Section */}
      <Animated.View entering={FadeInDown.duration(400).delay(250)} className="px-5 mb-6">
        <Text className="text-2xl font-extrabold text-gray-900 mb-4" style={{ letterSpacing: -0.04 }}>
          Your Routine
        </Text>
        
        <View className="flex-row gap-4">
          {/* Hydration Card */}
          <View className="flex-1 bg-cimas-blue rounded-3xl p-6 h-[280px] relative overflow-hidden">
            <View className="absolute top-0 right-0 w-32 h-32 bg-cimas-blue/40 rounded-full blur-2xl -mr-8 -mt-8" />
            
            <View className="relative z-10 flex-1 justify-between">
              <View>
                <View className="w-12 h-12 rounded-2xl items-center justify-center mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                  <Ionicons name="water" size={24} color="#FFFFFF" />
                </View>
                <Text className="text-2xl font-black text-white leading-none" style={{ letterSpacing: -0.04 }}>
                  Water{'\n'}Intake
                </Text>
                <Text className="text-blue-100 text-xs font-bold mt-2 opacity-80">1,250 / 2,500ml</Text>
              </View>

              <View>
                <View className="w-full h-24 rounded-3xl mt-4 relative overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <View className="absolute bottom-0 left-0 w-full" style={{ height: '50%', backgroundColor: 'rgba(147, 197, 253, 0.4)' }} />
                  <View className="absolute bottom-2 left-4">
                    <Text className="text-white font-bold text-lg">50%</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Sleep Card */}
          <View className="flex-1 bg-cimas-yellow rounded-3xl p-6 h-[280px] relative overflow-hidden">
            <View className="absolute bottom-0 left-0 w-32 h-32 bg-cimas-yellow/40 rounded-full blur-2xl -ml-8 -mb-8" />
            
            <View className="relative z-10 flex-1 justify-between">
              <View>
                <View className="px-3 py-1 rounded-lg mb-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                  <Text className="text-white text-[10px] font-bold tracking-wider">MEDIUM</Text>
                </View>
                <Text className="text-2xl font-black text-white leading-none" style={{ letterSpacing: -0.04 }}>
                  Sleep{'\n'}Cycle
                </Text>
              </View>

              <View className="flex-col gap-2">
                <View className="flex-row items-end gap-1">
                  <Text className="text-4xl font-black text-white" style={{ letterSpacing: -0.04 }}>7.5</Text>
                  <Text className="text-yellow-100 font-bold mb-1.5">hrs</Text>
                </View>

                <View className="flex-row items-center gap-2 mt-1">
                  <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                    <Ionicons name="moon" size={20} color="#FFFFFF" />
                  </View>
                  <View>
                    <Text className="text-xs text-yellow-50 font-medium leading-tight">
                      Quality{'\n'}
                      <Text className="text-white font-bold">Excellent</Text>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Featured Session */}
      <Animated.View entering={FadeInDown.duration(400).delay(300)} className="px-5 mb-6">
        <View className="bg-white p-5 flex-row items-center gap-5 rounded-3xl border border-gray-100 shadow-sm">
          <View className="w-20 h-20 rounded-3xl bg-pink-100 flex-shrink-0 items-center justify-center">
            <Ionicons name="moon" size={32} color="#EC4899" />
          </View>
          <View className="flex-1">
            <Text className="text-xl font-black text-gray-900 mb-1" style={{ letterSpacing: -0.04 }}>
              Evening Wind Down
            </Text>
            <Text className="text-gray-400 text-sm font-medium mb-3">Trainer: Sarah K.</Text>
            <View className="flex-row gap-2">
              <View className="px-3 py-1 bg-gray-100 rounded-lg">
                <Text className="text-xs font-bold text-gray-600">15 min</Text>
              </View>
              <View className="px-3 py-1 bg-pink-50 rounded-lg">
                <Text className="text-xs font-bold text-pink-600">Relax</Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default Dashboard;

