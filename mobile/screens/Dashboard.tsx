import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import FloatingDock from '../components/FloatingDock';

const days = [
  { label: 'Mon', date: 24 },
  { label: 'Tue', date: 25 },
  { label: 'Wed', date: 26 },
  { label: 'Thu', date: 27 },
  { label: 'Fri', date: 28 },
];

const Dashboard = () => {
  return (
    <View className="flex-1 bg-[#F8F9FC]">
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 140 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Animated.View
        entering={FadeInDown.duration(400)}
        className="px-6 pt-16 pb-4 flex-row justify-between items-center z-20"
      >
        <View className="flex-row items-center gap-4">
          <View className="w-14 h-14 rounded-full p-1 shadow-lg bg-white" style={{ shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } }}>
            <LinearGradient
              colors={['#E9D5FF', '#FBCFE8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1, borderRadius: 9999, alignItems: 'center', justifyContent: 'center' }}
            >
              <Text className="text-purple-700 text-lg font-black" style={{ letterSpacing: -1 }}>MT</Text>
            </LinearGradient>
          </View>
          <View>
            <Text className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.18em]">
              Good Morning
            </Text>
            <Text
              className="text-[26px] font-extrabold text-gray-900"
              style={{ letterSpacing: -1 }}
            >
              Marcus T.
            </Text>
          </View>
        </View>
        <TouchableOpacity className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg active:scale-90" style={{ shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } }}>
          <Ionicons name="notifications-outline" size={24} color="#111827" />
        </TouchableOpacity>
      </Animated.View>

      {/* Day Selector */}
      <Animated.View entering={FadeInDown.duration(400).delay(80)} className="px-6 py-3">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ columnGap: 12, paddingRight: 24 }}
        >
          {days.map((day, index) => {
            const isActive = index === 2;
            return (
              <TouchableOpacity
                key={day.label}
                activeOpacity={0.9}
                className={`w-[72px] h-[96px] flex-col items-center justify-center rounded-[2rem] ${
                  isActive ? 'bg-[#1A1A1A]' : 'bg-white border border-gray-100'
                }`}
                style={
                  isActive
                    ? {
                        shadowColor: '#000',
                        shadowOpacity: 0.3,
                        shadowRadius: 16,
                        shadowOffset: { width: 0, height: 10 },
                        transform: [{ scale: 1.05 }],
                      }
                    : { opacity: 0.6 }
                }
              >
                <Text
                  className={`text-[12px] font-bold mb-1 ${
                    isActive ? 'text-gray-400' : 'text-gray-400'
                  }`}
                >
                  {day.label}
                </Text>
                <Text
                  className={`text-[26px] font-black ${
                    isActive ? 'text-white' : 'text-gray-900'
                  }`}
                  style={{ letterSpacing: -1 }}
                >
                  {day.date}
                </Text>
                {isActive && <View className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C084FC]" />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animated.View>

      {/* Hero Card */}
      <Animated.View entering={FadeInDown.duration(400).delay(150)} className="px-6 mb-8 mt-4">
        <View
          className="relative w-full h-[320px] rounded-[2.5rem] overflow-hidden bg-[#8B5CF6] p-8 flex-col justify-between"
          style={{
            shadowColor: '#8B5CF6',
            shadowOpacity: 0.4,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 20 },
            elevation: 15,
          }}
        >
          {/* Decorative Blobs */}
          <View className="absolute top-0 right-0 w-64 h-64 bg-[#A78BFA] rounded-full blur-3xl opacity-50 -mr-16 -mt-16" />
          <View className="absolute bottom-0 left-0 w-48 h-48 bg-[#7C3AED] rounded-full blur-2xl opacity-50 -ml-10 -mb-10" />

          {/* Decorative Shapes */}
          <View className="absolute top-1/2 right-[-20px] -translate-y-1/2 w-40 h-40">
            <View
              className="w-24 h-24 rounded-full absolute top-0 right-10 z-10 bg-[#FFD600]"
              style={{
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowRadius: 10,
                shadowOffset: { width: 10, height: 10 },
              }}
            />
            <View
              className="w-32 h-32 rounded-[2rem] absolute top-10 right-0 rotate-12 z-0 bg-[#C084FC]"
              style={{
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowRadius: 10,
                shadowOffset: { width: 10, height: 10 },
              }}
            />
          </View>

          <View className="relative z-10">
            <View className="self-start px-4 py-2 rounded-full mb-4 border border-white/10" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
              <Text className="text-white text-[11px] font-bold tracking-[0.18em]">
                DAILY GOAL
              </Text>
            </View>
            <Text
              className="text-[40px] font-black text-white leading-[0.9] mb-2"
              style={{ letterSpacing: -2, textShadowColor: 'rgba(0,0,0,0.1)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 4 }}
            >
              Scan your{'\n'}Lunch
            </Text>
            <Text className="text-purple-100 text-[14px] font-medium w-2/3 leading-relaxed opacity-90">
              Capture your meal before 2:00 PM for optimal tracking.
            </Text>
          </View>

          <View className="flex-row -space-x-3 relative z-10 mt-4">
            <View className="w-10 h-10 rounded-full border-[2px] border-[#8B5CF6] bg-purple-200 items-center justify-center">
              <Text className="text-purple-700 text-xs font-bold">AB</Text>
            </View>
            <View className="w-10 h-10 rounded-full border-[2px] border-[#8B5CF6] bg-pink-200 items-center justify-center">
              <Text className="text-pink-700 text-xs font-bold">CD</Text>
            </View>
            <View className="w-10 h-10 rounded-full border-[2px] border-[#8B5CF6] bg-blue-200 items-center justify-center">
              <Text className="text-blue-700 text-xs font-bold">EF</Text>
            </View>
            <View className="w-10 h-10 rounded-full border-[2px] border-[#8B5CF6] bg-white items-center justify-center">
              <Text className="text-purple-600 text-[10px] font-bold">+8k</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Quick Glance */}
      <Animated.View entering={FadeInDown.duration(400).delay(200)} className="px-6 mb-8">
        <View className="flex-row gap-3">
          <View className="flex-1 bg-[#1A1A1A] rounded-[2rem] px-4 py-4 flex-col gap-2 items-start" style={{ shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } }}>
            <View className="w-10 h-10 rounded-full bg-white/10 items-center justify-center mb-1">
              <Ionicons name="flame" size={20} color="#C084FC" />
            </View>
            <View>
              <Text className="text-white text-xl font-black" style={{ letterSpacing: -1 }}>2,340</Text>
              <Text className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mt-0.5">Calories</Text>
            </View>
          </View>
          
          <View className="flex-1 bg-[#1A1A1A] rounded-[2rem] px-4 py-4 flex-col gap-2 items-start" style={{ shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } }}>
            <View className="w-10 h-10 rounded-full bg-white/10 items-center justify-center mb-1">
              <Ionicons name="star" size={20} color="#FFD600" />
            </View>
            <View>
              <Text className="text-white text-xl font-black" style={{ letterSpacing: -1 }}>12</Text>
              <Text className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mt-0.5">Streak</Text>
            </View>
          </View>
          
          <View className="flex-1 bg-white border border-gray-100 rounded-[2rem] px-4 py-4 flex-col gap-2 items-start shadow-sm" style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } }}>
            <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mb-1">
              <Ionicons name="camera" size={20} color="#3B82F6" />
            </View>
            <View>
              <Text className="text-gray-900 text-xl font-black" style={{ letterSpacing: -1 }}>45</Text>
              <Text className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mt-0.5">Scans</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Routine Section */}
      <Animated.View entering={FadeInDown.duration(400).delay(250)} className="px-6 mb-8">
        <Text className="text-[26px] font-extrabold text-gray-900 mb-6" style={{ letterSpacing: -1 }}>
          Your Routine
        </Text>
        
        <View className="flex-row gap-4">
          {/* Hydration Card */}
          <View className="flex-1 bg-[#3B82F6] rounded-[2.5rem] p-6 h-[280px] relative overflow-hidden"
            style={{ shadowColor: '#3B82F6', shadowOpacity: 0.4, shadowRadius: 20, shadowOffset: { width: 0, height: 10 }, elevation: 10 }}
          >
            <View className="absolute top-0 right-0 w-32 h-32 bg-[#60A5FA] rounded-full blur-2xl opacity-40 -mr-8 -mt-8" />
            
            <View className="relative z-10 flex-1 justify-between">
              <View>
                <View className="w-12 h-12 rounded-[1rem] items-center justify-center mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                  <Ionicons name="water" size={24} color="#FFFFFF" />
                </View>
                <Text className="text-[26px] font-black text-white leading-[1.1]" style={{ letterSpacing: -1 }}>
                  Water{'\n'}Intake
                </Text>
                <Text className="text-blue-100 text-[13px] font-bold mt-2 opacity-80">1,250 / 2,500ml</Text>
              </View>

              <View className="w-full h-24 rounded-[1.5rem] mt-4 relative overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <View className="absolute bottom-0 left-0 w-full" style={{ height: '50%', backgroundColor: 'rgba(147, 197, 253, 0.4)' }} />
                <View className="absolute bottom-3 left-4">
                  <Text className="text-white font-black text-lg">50%</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Sleep Card */}
          <View className="flex-1 bg-[#FF9F1C] rounded-[2.5rem] p-6 h-[280px] relative overflow-hidden"
            style={{ shadowColor: '#FF9F1C', shadowOpacity: 0.4, shadowRadius: 20, shadowOffset: { width: 0, height: 10 }, elevation: 10 }}
          >
            <View className="absolute bottom-0 left-0 w-32 h-32 bg-[#FFB703] rounded-full blur-2xl opacity-40 -ml-8 -mb-8" />
            
            <View className="relative z-10 flex-1 justify-between">
              <View>
                <View className="self-start px-3 py-1.5 rounded-lg mb-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                  <Text className="text-white text-[10px] font-bold tracking-[0.1em]">MEDIUM</Text>
                </View>
                <Text className="text-[26px] font-black text-white leading-[1.1]" style={{ letterSpacing: -1 }}>
                  Sleep{'\n'}Cycle
                </Text>
              </View>

              <View className="flex-col gap-2">
                <View className="flex-row items-end gap-1">
                  <Text className="text-[38px] font-black text-white leading-none" style={{ letterSpacing: -1.5 }}>7.5</Text>
                  <Text className="text-orange-100 font-bold mb-1">hrs</Text>
                </View>

                <View className="flex-row items-center gap-2 mt-1">
                  <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                    <Ionicons name="moon" size={20} color="#FFFFFF" />
                  </View>
                  <View>
                    <Text className="text-[11px] text-orange-50 font-medium leading-tight">
                      Quality{'\n'}
                      <Text className="text-white font-bold text-[12px]">Excellent</Text>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Featured Session */}
      <Animated.View entering={FadeInDown.duration(400).delay(300)} className="px-6 mb-8 mt-2">
        <View className="bg-white p-5 flex-row items-center gap-5 rounded-[2.5rem] border border-gray-100 shadow-sm"
          style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 15, shadowOffset: { width: 0, height: 5 } }}
        >
          <View className="w-20 h-20 rounded-[1.5rem] bg-pink-100 flex-shrink-0 items-center justify-center overflow-hidden">
            <Ionicons name="moon" size={32} color="#EC4899" />
          </View>
          <View className="flex-1">
            <Text className="text-[20px] font-black text-gray-900 mb-1" style={{ letterSpacing: -1 }}>
              Evening Wind Down
            </Text>
            <Text className="text-gray-400 text-[13px] font-medium mb-3">Trainer: Sarah K.</Text>
            <View className="flex-row gap-2">
              <View className="px-3 py-1.5 bg-gray-100 rounded-lg">
                <Text className="text-[11px] font-bold text-gray-600 tracking-wide">15 min</Text>
              </View>
              <View className="px-3 py-1.5 bg-pink-50 rounded-lg">
                <Text className="text-[11px] font-bold text-pink-600 tracking-wide">Relax</Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
    <FloatingDock activeRoute="home" />
  </View>
  );
};

export default Dashboard;

