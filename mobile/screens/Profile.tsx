import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, Image } from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_USER = {
  name: 'Mei Lin',
  shortName: 'Mei L.',
  email: 'mei.lin@cimashealth.co.zw',
  avatar:
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
  plan: 'Premium',
  joinedYear: '2025',
};

const QUICK_STATS = [
  { id: 'meals', label: 'Meals Scanned', value: '247' },
  { id: 'streak', label: 'Day Streak', value: '12' },
  { id: 'score', label: 'Avg Score', value: '78' },
];

const PREFERENCES = [
  {
    id: 'goals',
    icon: 'flag',
    iconBg: '#EEF3FF',
    iconColor: '#003399',
    label: 'Daily Goals',
    subtitle: 'Calories, protein & habits',
  },
  {
    id: 'notifications',
    icon: 'notifications',
    iconBg: '#FEF3C7',
    iconColor: '#D97706',
    label: 'Notifications',
    subtitle: 'Reminders & meal alerts',
  },
  {
    id: 'appearance',
    icon: 'color-palette',
    iconBg: '#F3E8FF',
    iconColor: '#9333EA',
    label: 'Appearance',
    subtitle: 'Theme & display options',
  },
];

const OTHER_SETTINGS = [
  {
    id: 'connect',
    icon: 'heart-circle',
    iconBg: '#FEE2E2',
    iconColor: '#DC2626',
    label: 'Cimas Health Connect',
    subtitle: 'Sync with your health provider',
  },
  {
    id: 'privacy',
    icon: 'shield-checkmark',
    iconBg: '#DCFCE7',
    iconColor: '#16A34A',
    label: 'Privacy & Data',
    subtitle: 'Manage your data & consent',
  },
  {
    id: 'help',
    icon: 'help-circle',
    iconBg: '#F1F5F9',
    iconColor: '#64748B',
    label: 'Help & Support',
    subtitle: 'FAQs, contact & feedback',
  },
];

// ─── Animated Settings Row ────────────────────────────────────────────────────

interface SettingsRowProps {
  icon: string;
  iconBg: string;
  iconColor: string;
  label: string;
  subtitle?: string;
  showChevron?: boolean;
  destructive?: boolean;
  isLast?: boolean;
}

const SettingsRow = ({
  icon,
  iconBg,
  iconColor,
  label,
  subtitle,
  showChevron = true,
  destructive = false,
  isLast = false,
}: SettingsRowProps) => {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View style={animStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={() => {
          scale.value = withSpring(0.97, { damping: 18, stiffness: 300 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 18, stiffness: 300 });
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 14,
          borderBottomWidth: isLast ? 0 : 1,
          borderBottomColor: '#F1F5F9',
        }}>
        {/* Icon square */}
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: destructive ? '#FEE2E2' : iconBg,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 14,
          }}>
          <Ionicons name={icon as any} size={20} color={destructive ? '#DC2626' : iconColor} />
        </View>

        {/* Label + subtitle */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '700',
              letterSpacing: -0.3,
              color: destructive ? '#DC2626' : '#111111',
              fontFamily: 'PlusJakartaSans_700Bold',
            }}>
            {label}
          </Text>
          {subtitle ? (
            <Text
              style={{
                fontSize: 12,
                color: '#9CA3AF',
                marginTop: 1,
                fontFamily: 'PlusJakartaSans_400Regular',
              }}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        {/* Chevron */}
        {showChevron && (
          <Ionicons name="chevron-forward" size={16} color={destructive ? '#DC2626' : '#CBD5E1'} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

// ─── Section Header ───────────────────────────────────────────────────────────

const SectionLabel = ({ label }: { label: string }) => (
  <Text
    style={{
      fontSize: 11,
      fontWeight: '800',
      letterSpacing: 1.5,
      color: '#9CA3AF',
      textTransform: 'uppercase',
      marginBottom: 8,
      marginTop: 28,
      paddingHorizontal: 4,
      fontFamily: 'PlusJakartaSans_800ExtraBold',
    }}>
    {label}
  </Text>
);

// ─── Profile Screen ───────────────────────────────────────────────────────────

export default function Profile() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#F8F9FA' }}
      contentContainerStyle={{ paddingBottom: 140 }}
      showsVerticalScrollIndicator={false}>
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <Animated.View
        entering={FadeInDown.delay(0).springify()}
        style={{ paddingTop: 64, paddingHorizontal: 24, paddingBottom: 8 }}>
        <Text
          style={{
            fontSize: 10,
            fontWeight: '800',
            letterSpacing: 2,
            color: '#003399',
            textTransform: 'uppercase',
            fontFamily: 'PlusJakartaSans_800ExtraBold',
          }}>
          ACCOUNT
        </Text>
        <Text
          style={{
            fontSize: 34,
            fontWeight: '900',
            letterSpacing: -1.5,
            color: '#111111',
            marginTop: 2,
            fontFamily: 'PlusJakartaSans_800ExtraBold',
          }}>
          Profile
        </Text>
      </Animated.View>

      <View style={{ paddingHorizontal: 20 }}>
        {/* ── Hero Card: Avatar + Name ──────────────────────────────────── */}
        <Animated.View entering={FadeInDown.delay(60).springify()}>
          <View
            style={{
              backgroundColor: '#003399',
              borderRadius: 28,
              padding: 24,
              marginTop: 16,
              overflow: 'hidden',
              shadowColor: '#003399',
              shadowOpacity: 0.45,
              shadowRadius: 24,
              shadowOffset: { width: 0, height: 12 },
              ...Platform.select({ android: { elevation: 14 } }),
            }}>
            {/* Decorative yellow blob */}
            <View
              style={{
                position: 'absolute',
                width: 180,
                height: 180,
                borderRadius: 90,
                backgroundColor: '#FFD600',
                opacity: 0.12,
                top: -60,
                right: -40,
              }}
            />
            {/* Decorative blue blob */}
            <View
              style={{
                position: 'absolute',
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: '#6699FF',
                opacity: 0.15,
                bottom: -30,
                left: -20,
              }}
            />
            {/* Decorative yellow circle outline */}
            <View
              style={{
                position: 'absolute',
                width: 70,
                height: 70,
                borderRadius: 35,
                borderWidth: 2,
                borderColor: '#FFD600',
                opacity: 0.3,
                bottom: 20,
                right: 24,
              }}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* Avatar photo */}
              <View
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: 42,
                  borderWidth: 3,
                  borderColor: '#FFD600',
                  overflow: 'hidden',
                  shadowColor: '#000',
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  shadowOffset: { width: 0, height: 6 },
                  ...Platform.select({ android: { elevation: 10 } }),
                }}>
                <Image
                  source={{ uri: MOCK_USER.avatar }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              </View>

              {/* Name + email */}
              <View style={{ marginLeft: 18, flex: 1 }}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: '900',
                    color: '#FFFFFF',
                    letterSpacing: -0.8,
                    fontFamily: 'PlusJakartaSans_800ExtraBold',
                  }}>
                  {MOCK_USER.name}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.65)',
                    marginTop: 2,
                    fontFamily: 'PlusJakartaSans_400Regular',
                  }}>
                  {MOCK_USER.email}
                </Text>

                {/* Premium badge */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FFD600',
                    borderRadius: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    alignSelf: 'flex-start',
                    marginTop: 10,
                    gap: 4,
                  }}>
                  <Ionicons name="ribbon" size={12} color="#003399" />
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: '800',
                      color: '#003399',
                      letterSpacing: 0.5,
                      fontFamily: 'PlusJakartaSans_800ExtraBold',
                    }}>
                    {MOCK_USER.plan.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* ── Quick Stats Row ───────────────────────────────────────────── */}
        <Animated.View entering={FadeInDown.delay(120).springify()}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              marginTop: 16,
              flexDirection: 'row',
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowRadius: 14,
              shadowOffset: { width: 0, height: 4 },
              ...Platform.select({ android: { elevation: 4 } }),
            }}>
            {QUICK_STATS.map((stat, i) => (
              <View
                key={stat.id}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  paddingVertical: 20,
                  borderRightWidth: i < QUICK_STATS.length - 1 ? 1 : 0,
                  borderRightColor: '#F1F5F9',
                }}>
                <Text
                  style={{
                    fontSize: 26,
                    fontWeight: '900',
                    color: '#111111',
                    letterSpacing: -1,
                    fontFamily: 'PlusJakartaSans_800ExtraBold',
                  }}>
                  {stat.value}
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    color: '#9CA3AF',
                    marginTop: 3,
                    textAlign: 'center',
                    fontFamily: 'PlusJakartaSans_400Regular',
                  }}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* ── PREFERENCES Group ─────────────────────────────────────────── */}
        <Animated.View entering={FadeInDown.delay(180).springify()}>
          <SectionLabel label="Preferences" />
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowRadius: 14,
              shadowOffset: { width: 0, height: 4 },
              ...Platform.select({ android: { elevation: 4 } }),
            }}>
            {PREFERENCES.map((item, i) => (
              <SettingsRow
                key={item.id}
                icon={item.icon}
                iconBg={item.iconBg}
                iconColor={item.iconColor}
                label={item.label}
                subtitle={item.subtitle}
                isLast={i === PREFERENCES.length - 1}
              />
            ))}
          </View>
        </Animated.View>

        {/* ── OTHER Group ───────────────────────────────────────────────── */}
        <Animated.View entering={FadeInDown.delay(240).springify()}>
          <SectionLabel label="Other" />
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowRadius: 14,
              shadowOffset: { width: 0, height: 4 },
              ...Platform.select({ android: { elevation: 4 } }),
            }}>
            {OTHER_SETTINGS.map((item, i) => (
              <SettingsRow
                key={item.id}
                icon={item.icon}
                iconBg={item.iconBg}
                iconColor={item.iconColor}
                label={item.label}
                subtitle={item.subtitle}
                isLast={i === OTHER_SETTINGS.length - 1}
              />
            ))}
          </View>
        </Animated.View>

        {/* ── Sign Out ──────────────────────────────────────────────────── */}
        <Animated.View entering={FadeInDown.delay(300).springify()} style={{ marginTop: 16 }}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowRadius: 14,
              shadowOffset: { width: 0, height: 4 },
              ...Platform.select({ android: { elevation: 4 } }),
            }}>
            <SettingsRow
              icon="log-out"
              iconBg="#FEE2E2"
              iconColor="#DC2626"
              label="Sign Out"
              destructive
              showChevron={false}
              isLast
            />
          </View>
        </Animated.View>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <Animated.View
          entering={FadeInDown.delay(340).springify()}
          style={{ alignItems: 'center', marginTop: 36, gap: 4 }}>
          <Text
            style={{
              fontSize: 12,
              color: '#CBD5E1',
              fontFamily: 'PlusJakartaSans_700Bold',
            }}>
            Powered by Cimas Health Group
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: '#E2E8F0',
              fontFamily: 'PlusJakartaSans_400Regular',
            }}>
            iGo Vision · v1.0.0-prototype
          </Text>
        </Animated.View>
      </View>
    </ScrollView>
  );
}
