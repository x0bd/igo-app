import React, { useState } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';

/**
 * Dashboard Screen (Home)
 * Elite aesthetic inspired by inspo/smooth.js, adapted to Cimas white / blue / yellow.
 * This is a first pass: structure + layout + basic styling. We'll refine and animate later.
 */

const days = [
  { day: 'Mon', date: 24 },
  { day: 'Tue', date: 25 },
  { day: 'Wed', date: 26 },
  { day: 'Thu', date: 27 },
  { day: 'Fri', date: 28 },
];

const DashboardScreen: React.FC = () => {
  const [activeDay, setActiveDay] = useState('Mon');

  return (
    <View className="flex-1 bg-cimas-white">
      {/* Header */}
      <View className="px-6 pt-12 pb-4 flex-row items-center justify-between">
        <View className="flex-row items-center gap-4">
          <View className="w-14 h-14 rounded-full bg-gradient-to-tr from-cimas-blue/10 to-cimas-yellow/40 p-1 shadow-lg border-4 border-white">
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=44' }}
              className="w-full h-full rounded-full"
            />
          </View>
          <View>
            <Text className="text-xs font-bold text-gray-400 tight-text uppercase tracking-wide">
              Good Morning
            </Text>
            <Text className="text-2xl font-extrabold text-gray-900 tight-text">
              Marcus T.
            </Text>
          </View>
        </View>

        <View className="w-12 h-12 rounded-full bg-white items-center justify-center shadow-lg active:scale-90 transition-spring">
          <Text className="text-gray-800 text-xl">🔔</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Day Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="no-scrollbar py-4 mb-4"
        >
          <View className="flex-row gap-3">
            {days.map((item) => {
              const isActive = activeDay === item.day;
              return (
                <View
                  key={item.day}
                  className={`flex-shrink-0 w-[72px] h-[96px] rounded-[2rem] items-center justify-center transition-spring ${
                    isActive
                      ? 'bg-gray-900 shadow-xl scale-105'
                      : 'bg-white border border-gray-100 shadow-sm opacity-60'
                  }`}
                >
                  <Text className="text-xs font-bold mb-1 text-gray-400">{item.day}</Text>
                  <Text
                    className={`text-2xl font-black tight-text ${
                      isActive ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {item.date}
                  </Text>
                  {isActive && (
                    <View className="w-1.5 h-1.5 bg-cimas-blue rounded-full mt-2" />
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>

        {/* Hero Card */}
        <View className="relative w-full h-[320px] bg-cimas-blue overflow-hidden mb-8 p-8 rounded-[2.5rem] shadow-xl">
          {/* Decorative orbs */}
          <View className="absolute top-0 right-0 w-64 h-64 bg-cimas-blue/40 rounded-full opacity-50 -mr-16 -mt-16" />
          <View className="absolute bottom-0 left-0 w-48 h-48 bg-cimas-yellow/40 rounded-full opacity-60 -ml-10 -mb-10" />

          <View className="absolute top-1/2 right-[-20px] -translate-y-1/2 w-40 h-40">
            <View className="w-24 h-24 bg-cimas-yellow rounded-full absolute top-0 right-10 z-10" />
            <View className="w-32 h-32 bg-cimas-blue/70 rounded-[2rem] absolute top-10 right-0 rotate-12 z-0" />
          </View>

          <View className="relative z-10">
            <Text className="inline-flex px-4 py-2 bg-white/15 backdrop-blur-md rounded-full text-white text-xs font-bold tracking-wider mb-4 border border-white/10">
              TODAY&apos;S FOCUS
            </Text>
            <Text className="text-4xl font-black text-white tight-text leading-[0.9] mb-2 drop-shadow-sm">
              Scan your
              {'\n'}
              lunch with iGo
            </Text>
            <Text className="text-cimas-white/80 text-sm font-medium w-3/4 leading-relaxed">
              Photograph your meal and get instant, medical-grade nutritional feedback.
            </Text>
          </View>

          <View className="flex-row -space-x-3 relative z-10 mt-6 items-center">
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=32' }}
              className="w-10 h-10 rounded-full border-2 border-cimas-blue"
            />
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
              className="w-10 h-10 rounded-full border-2 border-cimas-blue"
            />
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=5' }}
              className="w-10 h-10 rounded-full border-2 border-cimas-blue"
            />
            <View className="w-10 h-10 rounded-full border-2 border-cimas-blue bg-white items-center justify-center">
              <Text className="text-[10px] font-bold text-cimas-blue">+8k</Text>
            </View>
          </View>
        </View>

        {/* Quick Glance Strip */}
        <View className="flex-row gap-3 mb-6">
          <View className="flex-1 bg-gray-900 rounded-2xl p-4 shadow-md">
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wide">
              Today&apos;s calories
            </Text>
            <Text className="text-2xl font-black text-white mt-1 tight-text">1,240 kcal</Text>
          </View>
          <View className="flex-1 bg-cimas-yellow rounded-2xl p-4 shadow-md">
            <Text className="text-xs font-bold text-gray-800 uppercase tracking-wide">
              Streak
            </Text>
            <Text className="text-2xl font-black text-gray-900 mt-1 tight-text">7 days 🔥</Text>
          </View>
          <View className="flex-1 bg-cimas-blue/5 rounded-2xl p-4 border border-cimas-blue/10">
            <Text className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              Scans
            </Text>
            <Text className="text-2xl font-black text-gray-900 mt-1 tight-text">3 today</Text>
          </View>
        </View>

        {/* Routine Section */}
        <Text className="text-2xl font-extrabold text-gray-900 tight-text mb-4">
          Your Routine
        </Text>
        <View className="grid grid-cols-2 gap-4 mb-6">
          {/* Hydration Card */}
          <View className="bg-cimas-blue rounded-[2rem] p-6 overflow-hidden h-[220px] shadow-lg">
            <View className="absolute top-0 right-0 w-32 h-32 bg-cimas-blue/60 rounded-full opacity-40 -mr-8 -mt-8" />
            <View className="relative z-10">
              <View className="w-12 h-12 bg-white/15 rounded-2xl items-center justify-center mb-4">
                <Text className="text-white text-lg">💧</Text>
              </View>
              <Text className="text-2xl font-black text-white tight-text leading-none">
                Water
                {'\n'}
                Intake
              </Text>
              <Text className="text-cimas-white/80 text-xs font-bold mt-2">
                1,250 / 2,500 ml
              </Text>
            </View>
            <View className="relative z-10 mt-4">
              <View className="w-full h-20 bg-white/10 rounded-[1.5rem] overflow-hidden justify-end">
                <View className="absolute bottom-0 left-0 w-full bg-cimas-yellow/40" style={{ height: '50%' }} />
                <Text className="absolute bottom-2 left-4 text-white font-bold text-lg">
                  50%
                </Text>
              </View>
            </View>
          </View>

          {/* Sleep Card */}
          <View className="bg-cimas-yellow rounded-[2rem] p-6 overflow-hidden h-[220px] shadow-lg">
            <View className="absolute bottom-0 left-0 w-32 h-32 bg-cimas-yellow/70 rounded-full opacity-40 -ml-8 -mb-8" />
            <View className="relative z-10">
              <Text className="inline-flex px-3 py-1 bg-white/25 rounded-lg text-white text-[10px] font-bold tracking-wider mb-3">
                MEDIUM
              </Text>
              <Text className="text-2xl font-black text-gray-900 tight-text leading-none">
                Sleep
                {'\n'}
                Cycle
              </Text>
            </View>
            <View className="relative z-10 mt-4 flex-row items-end gap-1">
              <Text className="text-4xl font-black text-gray-900 tight-text">7.5</Text>
              <Text className="text-gray-800 font-bold mb-1.5">hrs</Text>
            </View>
            <View className="relative z-10 mt-2 flex-row items-center gap-2">
              <View className="w-10 h-10 rounded-full bg-white/40 items-center justify-center">
                <Text className="text-gray-900 text-lg">🌙</Text>
              </View>
              <View>
                <Text className="text-xs text-gray-800 font-medium leading-tight">
                  Quality
                </Text>
                <Text className="text-xs text-gray-900 font-bold leading-tight">
                  Excellent
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Featured Session */}
        <View className="bg-white rounded-3xl p-5 flex-row items-center gap-5 border border-gray-100 shadow-sm mb-6">
          <View className="w-20 h-20 rounded-[1.5rem] bg-cimas-yellow/20 overflow-hidden">
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&q=80',
              }}
              className="w-full h-full"
            />
          </View>
          <View className="flex-1">
            <Text className="text-xl font-black text-gray-900 tight-text">
              Evening check-in
            </Text>
            <Text className="text-gray-400 text-sm font-medium mt-1">
              Coach: Cimas iGo
            </Text>
            <View className="flex-row gap-2 mt-3">
              <Text className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-600">
                15 min
              </Text>
              <Text className="px-3 py-1 bg-cimas-blue/10 rounded-lg text-xs font-bold text-cimas-blue">
                Recovery
              </Text>
            </View>
          </View>
        </View>

        {/* Placeholder for AI Suggested Meals (to be implemented later) */}
        <Text className="text-sm font-medium text-gray-400 mb-2">
          AI suggested meals coming soon…
        </Text>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;


