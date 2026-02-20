import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppContext } from '../context/AppContext';

import GoalsChips from '../components/dashboard/GoalsChips';
import InsightCards from '../components/dashboard/InsightCards';
import SuggestedMeals from '../components/dashboard/SuggestedMeals';

const getWeekDays = () => {
  const daysList = [];
  const today = new Date();
  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Create 5 days around today: 2 days before, today, and 2 days after
  for (let i = -2; i <= 2; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    daysList.push({
      label: labels[d.getDay()],
      date: d.getDate(),
      isToday: i === 0,
    });
  }
  return daysList;
};

const days = getWeekDays();

const Dashboard = () => {
  const { user } = useAppContext();
  return (
    <View className="flex-1 bg-[#F8F9FC]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View
          entering={FadeInDown.duration(400)}
          className="z-20 flex-row items-center justify-between px-6 pb-4 pt-16">
          <View className="flex-row items-center gap-4">
            <View
              className="h-14 w-14 rounded-full bg-white p-1 shadow-lg"
              style={{
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
              }}>
              <Image source={{ uri: user.avatar }} className="flex-1 rounded-full" />
            </View>
            <View>
              <Text className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">
                Good Morning
              </Text>
              <Text
                className="text-[26px] font-extrabold text-gray-900"
                style={{ letterSpacing: -1 }}>
                {user.shortName}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg active:scale-90"
            style={{
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
            }}>
            <Ionicons name="notifications-outline" size={24} color="#111827" />
          </TouchableOpacity>
        </Animated.View>

        {/* Day Selector */}
        <Animated.View entering={FadeInDown.duration(400).delay(80)} className="px-6 py-3">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ columnGap: 12, paddingRight: 24, paddingVertical: 12 }}>
            {days.map((day) => {
              const isActive = day.isToday;
              return (
                <TouchableOpacity
                  key={day.label + day.date.toString()}
                  activeOpacity={0.9}
                  className={`h-[96px] w-[72px] flex-col items-center justify-center rounded-[2rem] ${
                    isActive ? 'bg-[#1A1A1A]' : 'border border-gray-100 bg-white'
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
                  }>
                  <Text
                    className={`mb-1 text-[12px] font-bold ${
                      isActive ? 'text-gray-400' : 'text-gray-400'
                    }`}>
                    {day.label}
                  </Text>
                  <Text
                    className={`text-[26px] font-black ${
                      isActive ? 'text-white' : 'text-gray-900'
                    }`}
                    style={{ letterSpacing: -1 }}>
                    {day.date}
                  </Text>
                  {isActive && <View className="mt-2 h-1.5 w-1.5 rounded-full bg-[#C084FC]" />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Animated.View>

        {/* Hero Card */}
        <Animated.View entering={FadeInDown.duration(400).delay(150)} className="mb-8 mt-4 px-6">
          <View
            className="relative h-[320px] w-full flex-col justify-between overflow-hidden rounded-[2.5rem] bg-[#003399] p-8"
            style={{
              shadowColor: '#003399',
              shadowOpacity: 0.4,
              shadowRadius: 20,
              shadowOffset: { width: 0, height: 20 },
              elevation: 15,
            }}>
            {/* Decorative Blobs */}
            <View className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-[#3366CC] opacity-50 blur-3xl" />
            <View className="absolute bottom-0 left-0 -mb-10 -ml-10 h-48 w-48 rounded-full bg-[#FFD600] opacity-20 blur-2xl" />

            {/* Decorative Shapes */}
            <View className="absolute right-[-20px] top-1/2 h-40 w-40 -translate-y-1/2">
              <View
                className="absolute right-10 top-0 z-10 h-24 w-24 rounded-full bg-[#FFD600]"
                style={{
                  shadowColor: '#000',
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                  shadowOffset: { width: 10, height: 10 },
                }}
              />
              <View
                className="absolute right-0 top-10 z-0 h-32 w-32 rotate-12 rounded-[2rem] bg-[#0055FF]"
                style={{
                  shadowColor: '#000',
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                  shadowOffset: { width: 10, height: 10 },
                }}
              />
            </View>

            <View className="relative z-10">
              <View
                className="mb-4 self-start rounded-full border border-white/10 px-4 py-2"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                <Text className="text-[11px] font-bold tracking-[0.18em] text-white">
                  DAILY GOAL
                </Text>
              </View>
              <Text
                className="mb-2 text-[42px] font-black leading-[0.9] text-white"
                style={{
                  letterSpacing: -2,
                  textShadowColor: 'rgba(0,0,0,0.15)',
                  textShadowOffset: { width: 0, height: 4 },
                  textShadowRadius: 8,
                }}>
                Scan your{'\n'}Lunch
              </Text>
              <Text className="w-2/3 text-[14px] font-medium leading-relaxed text-blue-100 opacity-90">
                Capture your meal before 2:00 PM for optimal tracking.
              </Text>
            </View>

            <View className="relative z-10 mt-4 flex-row -space-x-3">
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&fit=crop',
                }}
                className="h-10 w-10 rounded-full border-[2px] border-[#003399]"
              />
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&fit=crop',
                }}
                className="h-10 w-10 rounded-full border-[2px] border-[#003399]"
              />
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&fit=crop',
                }}
                className="h-10 w-10 rounded-full border-[2px] border-[#003399]"
              />
              <View className="h-10 w-10 items-center justify-center rounded-full border-[2px] border-[#003399] bg-white">
                <Text className="text-[10px] font-bold text-blue-600">+8k</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Quick Glance */}
        <Animated.View entering={FadeInDown.duration(400).delay(200)} className="mb-8 px-6">
          <View className="flex-row gap-3">
            <View
              className="flex-1 flex-col items-start gap-2 rounded-[2rem] bg-[#1A1A1A] px-4 py-4"
              style={{
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
              }}>
              <View className="mb-1 h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Ionicons name="flame" size={20} color="#C084FC" />
              </View>
              <View>
                <Text className="text-xl font-black text-white" style={{ letterSpacing: -1 }}>
                  2,340
                </Text>
                <Text className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Calories
                </Text>
              </View>
            </View>

            <View
              className="flex-1 flex-col items-start gap-2 rounded-[2rem] bg-[#1A1A1A] px-4 py-4"
              style={{
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
              }}>
              <View className="mb-1 h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Ionicons name="star" size={20} color="#FFD600" />
              </View>
              <View>
                <Text className="text-xl font-black text-white" style={{ letterSpacing: -1 }}>
                  12
                </Text>
                <Text className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Streak
                </Text>
              </View>
            </View>

            <View
              className="flex-1 flex-col items-start gap-2 rounded-[2rem] border border-gray-100 bg-white px-4 py-4 shadow-sm"
              style={{
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
              }}>
              <View className="mb-1 h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                <Ionicons name="camera" size={20} color="#3B82F6" />
              </View>
              <View>
                <Text className="text-xl font-black text-gray-900" style={{ letterSpacing: -1 }}>
                  45
                </Text>
                <Text className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Scans
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Goals Chips */}
        <View className="mb-8">
          <GoalsChips />
        </View>

        {/* Routine Section */}
        <Animated.View entering={FadeInDown.duration(400).delay(250)} className="mb-8 px-6">
          <Text
            className="mb-6 text-[26px] font-extrabold text-gray-900"
            style={{ letterSpacing: -1 }}>
            Your Routine
          </Text>

          <View className="flex-row gap-4">
            {/* Hydration Card */}
            <View
              className="relative h-[280px] flex-1 overflow-hidden rounded-[2.5rem] bg-[#003399] p-6"
              style={{
                shadowColor: '#003399',
                shadowOpacity: 0.4,
                shadowRadius: 20,
                shadowOffset: { width: 0, height: 12 },
                elevation: 12,
              }}>
              {/* Soft Ambient Glow */}
              <View className="absolute right-0 top-0 -mr-12 -mt-12 h-40 w-40 rounded-full bg-[#3366CC] opacity-50 blur-3xl" />

              <View className="relative z-10 flex-1 justify-between">
                <View>
                  <View
                    className="mb-4 h-12 w-12 items-center justify-center rounded-[1rem]"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                    <Ionicons name="water" size={24} color="#FFFFFF" />
                  </View>
                  <Text
                    className="text-[26px] font-black leading-[1.1] text-white"
                    style={{ letterSpacing: -1 }}>
                    Water{'\n'}Intake
                  </Text>
                  <Text className="mt-2 text-[13px] font-bold text-blue-100 opacity-80">
                    1,250 / 2,500ml
                  </Text>
                </View>

                <View
                  className="relative mt-4 h-24 w-full overflow-hidden rounded-[1.5rem]"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <View
                    className="absolute bottom-0 left-0 w-full"
                    style={{ height: '50%', backgroundColor: 'rgba(147, 197, 253, 0.4)' }}
                  />
                  <View className="absolute bottom-3 left-4">
                    <Text className="text-lg font-black text-white">50%</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Sleep Card */}
            <View
              className="relative h-[280px] flex-1 overflow-hidden rounded-[2.5rem] bg-[#FFD600] p-6"
              style={{
                shadowColor: '#FFD600',
                shadowOpacity: 0.35,
                shadowRadius: 20,
                shadowOffset: { width: 0, height: 12 },
                elevation: 12,
              }}>
              {/* Soft Ambient Glow */}
              <View className="absolute bottom-0 left-0 -mb-12 -ml-12 h-40 w-40 rounded-full bg-[#FFFFFF] opacity-30 blur-3xl" />

              <View className="relative z-10 flex-1 justify-between">
                <View>
                  <View
                    className="mb-3 self-start rounded-lg px-3 py-1.5"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
                    <Text className="text-[10px] font-bold tracking-[0.1em] text-black">
                      MEDIUM
                    </Text>
                  </View>
                  <Text
                    className="text-[26px] font-black leading-[1.1] text-black"
                    style={{ letterSpacing: -1 }}>
                    Sleep{'\n'}Cycle
                  </Text>
                </View>

                <View className="flex-col gap-2">
                  <View className="flex-row items-end gap-1">
                    <Text
                      className="text-[38px] font-black leading-none text-black"
                      style={{ letterSpacing: -1.5 }}>
                      7.5
                    </Text>
                    <Text className="mb-1 font-bold text-yellow-900">hrs</Text>
                  </View>

                  <View className="mt-1 flex-row items-center gap-2">
                    <View
                      className="h-10 w-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
                      <Ionicons name="moon" size={20} color="#000000" />
                    </View>
                    <View>
                      <Text className="text-[11px] font-medium leading-tight text-yellow-900">
                        Quality{'\n'}
                        <Text className="text-[12px] font-black text-black">Excellent</Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Featured Session */}
        <Animated.View entering={FadeInDown.duration(400).delay(300)} className="mb-8 mt-2 px-6">
          <View
            className="flex-row items-center gap-5 rounded-[2.5rem] border border-gray-100 bg-white p-5 shadow-sm"
            style={{
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowRadius: 15,
              shadowOffset: { width: 0, height: 5 },
            }}>
            <View className="h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#F0F5FF]">
              <Ionicons name="moon" size={32} color="#003399" />
            </View>
            <View className="flex-1">
              <Text
                className="mb-1 text-[20px] font-black text-gray-900"
                style={{ letterSpacing: -1 }}>
                Evening Wind Down
              </Text>
              <Text className="mb-3 text-[13px] font-medium text-gray-400">Trainer: Sarah K.</Text>
              <View className="flex-row gap-2">
                <View className="rounded-lg bg-[#F8F9FA] px-3 py-1.5">
                  <Text className="text-[11px] font-bold tracking-wide text-gray-500">15 min</Text>
                </View>
                <View className="rounded-lg bg-[#F0F5FF] px-3 py-1.5">
                  <Text className="text-[11px] font-bold tracking-wide text-[#003399]">Relax</Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Insight Cards */}
        <InsightCards />

        {/* AI Suggested Meals */}
        <SuggestedMeals />
      </ScrollView>
    </View>
  );
};

export default Dashboard;
