import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FloatingDock } from '@/components/floating-dock';
import DashboardScreen from '@/screens/dashboard';
import StatsScreen from '@/screens/stats';
import ProfileScreen from '@/screens/profile';

type TabKey = 'stats' | 'scan' | 'profile';

export default function AppIndex() {
  const [activeTab, setActiveTab] = useState<TabKey>('scan');

  const renderScreen = () => {
    switch (activeTab) {
      case 'stats':
        return <StatsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'scan':
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {renderScreen()}
      <FloatingDock activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
});
