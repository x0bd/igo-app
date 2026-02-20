import React from 'react';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import FloatingDock from '../../components/FloatingDock';

export default function TabLayout() {
  return (
    <View className="flex-1 bg-cimas-off-white">
      <Tabs
        screenOptions={{
          headerShown: false,
          // Hide the default tab bar entirely
          tabBarStyle: { display: 'none' },
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="scan" />
        <Tabs.Screen name="stats" />
        <Tabs.Screen name="profile" />
      </Tabs>
      
      {/* 
        This is our persistent global dock that floats OVER the tabs. 
        It naturally overlays the active screen shown in the <Tabs /> above.
      */}
      <FloatingDock />
    </View>
  );
}
