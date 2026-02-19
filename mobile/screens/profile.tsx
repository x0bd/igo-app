import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { IGO } from '@/constants/theme';

// ─── Profile Header ─────────────────────────────────────────────────
function ProfileHeader() {
  return (
    <Animated.View entering={FadeInDown.duration(500).delay(100)} style={styles.profileHeader}>
      <View style={styles.avatarLarge}>
        <Text style={styles.avatarLargeText}>MR</Text>
      </View>
      <Text style={styles.profileName}>Munyaradzi R.</Text>
      <Text style={styles.profileEmail}>munyaradzi@cimas.co.zw</Text>

      <View style={styles.profileBadge}>
        <Ionicons name="ribbon-outline" size={14} color={IGO.carbs} />
        <Text style={styles.profileBadgeText}>iGo Premium Member</Text>
      </View>
    </Animated.View>
  );
}

// ─── Quick Stats ─────────────────────────────────────────────────────
function QuickStats() {
  return (
    <Animated.View entering={FadeInDown.duration(500).delay(200)} style={styles.quickStatsRow}>
      <View style={styles.quickStat}>
        <Text style={styles.quickStatValue}>142</Text>
        <Text style={styles.quickStatLabel}>Meals Scanned</Text>
      </View>
      <View style={[styles.quickStat, styles.quickStatBorder]}>
        <Text style={styles.quickStatValue}>28</Text>
        <Text style={styles.quickStatLabel}>Day Streak</Text>
      </View>
      <View style={styles.quickStat}>
        <Text style={styles.quickStatValue}>78</Text>
        <Text style={styles.quickStatLabel}>Avg Score</Text>
      </View>
    </Animated.View>
  );
}

// ─── Settings Row ────────────────────────────────────────────────────
interface SettingRowProps {
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  label: string;
  subtitle?: string;
  delay: number;
  destructive?: boolean;
}

function SettingRow({ iconName, iconColor, label, subtitle, delay, destructive }: SettingRowProps) {
  return (
    <Animated.View entering={FadeInDown.duration(400).delay(delay)}>
      <Pressable style={styles.settingRow}>
        <View
          style={[
            styles.settingIconWrap,
            destructive && { backgroundColor: 'rgba(255,59,48,0.1)' },
          ]}
        >
          <Ionicons name={iconName} size={18} color={iconColor} />
        </View>
        <View style={styles.settingInfo}>
          <Text
            style={[
              styles.settingLabel,
              destructive && { color: '#FF3B30' },
            ]}
          >
            {label}
          </Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
        <Ionicons name="chevron-forward" size={18} color={IGO.gray400} />
      </Pressable>
    </Animated.View>
  );
}

// ─── Profile Screen ──────────────────────────────────────────────────
export default function ProfileScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <Text style={styles.headerLabel}>ACCOUNT</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(450).delay(50)}>
        <Text style={styles.pageTitle}>Profile</Text>
      </Animated.View>

      <ProfileHeader />
      <QuickStats />

      {/* Settings Groups */}
      <View style={styles.settingsGroup}>
        <Text style={styles.settingsGroupTitle}>PREFERENCES</Text>
        <SettingRow
          iconName="fitness-outline"
          iconColor={IGO.protein}
          label="Daily Goals"
          subtitle="2,200 kcal target"
          delay={300}
        />
        <SettingRow
          iconName="notifications-outline"
          iconColor={IGO.carbs}
          label="Notifications"
          subtitle="Meal reminders ON"
          delay={350}
        />
        <SettingRow
          iconName="moon-outline"
          iconColor={IGO.healthScore}
          label="Appearance"
          subtitle="System default"
          delay={400}
        />
      </View>

      <View style={styles.settingsGroup}>
        <Text style={styles.settingsGroupTitle}>OTHER</Text>
        <SettingRow
          iconName="heart-outline"
          iconColor="#FF2D55"
          label="Cimas Health Connect"
          subtitle="Sync with Cimas iGo"
          delay={450}
        />
        <SettingRow
          iconName="shield-checkmark-outline"
          iconColor={IGO.fat}
          label="Privacy & Data"
          delay={500}
        />
        <SettingRow
          iconName="help-circle-outline"
          iconColor={IGO.gray600}
          label="Help & Support"
          delay={550}
        />
      </View>

      <View style={styles.settingsGroup}>
        <SettingRow
          iconName="log-out-outline"
          iconColor="#FF3B30"
          label="Sign Out"
          delay={600}
          destructive
        />
      </View>

      {/* Footer */}
      <Animated.View entering={FadeInDown.duration(400).delay(650)} style={styles.footer}>
        <Text style={styles.footerText}>iGo Vision AI v1.0.0</Text>
        <Text style={styles.footerText}>Powered by Cimas Health Group</Text>
      </Animated.View>
    </ScrollView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: IGO.white,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 8,
  },
  headerLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: IGO.gray600,
    letterSpacing: 1,
  },
  pageTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: IGO.black,
    letterSpacing: -0.5,
    marginBottom: 24,
  },

  // Profile Header
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: IGO.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  avatarLargeText: {
    fontSize: 28,
    fontWeight: '700',
    color: IGO.white,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '600',
    color: IGO.black,
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontWeight: '400',
    color: IGO.gray600,
    marginBottom: 14,
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,149,0,0.08)',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: IGO.radiusFull,
  },
  profileBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: IGO.carbs,
  },

  // Quick Stats
  quickStatsRow: {
    flexDirection: 'row',
    backgroundColor: IGO.white,
    borderRadius: IGO.radiusLg,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    ...IGO.shadowSm,
  },
  quickStat: {
    flex: 1,
    alignItems: 'center',
  },
  quickStatBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: IGO.gray200,
  },
  quickStatValue: {
    fontSize: 22,
    fontWeight: '700',
    color: IGO.black,
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: IGO.gray600,
  },

  // Settings
  settingsGroup: {
    marginBottom: 28,
  },
  settingsGroupTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: IGO.gray600,
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 4,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: IGO.white,
    borderRadius: IGO.radiusSm,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  settingIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: IGO.gray200,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: IGO.black,
  },
  settingSubtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: IGO.gray600,
    marginTop: 2,
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 16,
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '400',
    color: IGO.gray500,
  },
});
