import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Defs, LinearGradient as SvgGradient, Stop, Rect } from 'react-native-svg';
import Animated, { FadeInDown, FadeInUp, FadeIn } from 'react-native-reanimated';
import { IGO } from '@/constants/theme';
import { AreaChart } from '@/components/area-chart';

const { width: SCREEN_W } = Dimensions.get('window');
const CR = 40; // super pill radius for hero / nav vibe
const BORDER = 'rgba(0,0,0,0.04)';
const SUPER_CARD_SHADOW = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 20 },
  shadowOpacity: 0.18,
  shadowRadius: 40,
  elevation: 12,
};
const LIGHT_CARD_SHADOW = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.08,
  shadowRadius: 20,
  elevation: 6,
};

type DayKey = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';

const DAYS: { day: DayKey; date: number }[] = [
  { day: 'Mon', date: 24 },
  { day: 'Tue', date: 25 },
  { day: 'Wed', date: 26 },
  { day: 'Thu', date: 27 },
  { day: 'Fri', date: 28 },
];

// ═══ DAY CHIP (horizontal scroller) ══════════════════════════════════
function DayChip({
  day,
  date,
  isActive,
  onPress,
}: {
  day: DayKey;
  date: number;
  isActive: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[s.dayChip, isActive ? s.dayChipActive : s.dayChipInactive]}>
      <Text style={[s.dayChipDay, isActive && s.dayChipDayActive]}>{day}</Text>
      <Text style={[s.dayChipDate, isActive && s.dayChipDateActive]}>{date}</Text>
      {isActive && <View style={s.dayChipDot} />}
    </Pressable>
  );
}

// ═══ HERO CARD (smooth inspo style, adapted for iGo) ═════════════════
function HeroCard() {
  return (
    <Animated.View entering={FadeInDown.duration(600).delay(100)}>
      <View style={s.heroCard}>
        {/* Blurred gradient blobs */}
        <View style={s.heroBlobTopRight} />
        <View style={s.heroBlobBottomLeft} />

        {/* Orb + plate */}
        <View style={s.heroOrbStack}>
          <View style={s.heroOrb} />
          <View style={s.heroPlate} />
        </View>

        <View style={s.heroInner}>
          <View style={s.heroLabelPill}>
            <Text style={s.heroLabelText}>TODAY&apos;S FOCUS</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={s.heroTitle}>
              Scan your{'\n'}
              lunch with iGo
            </Text>
            <Text style={s.heroSubtitle}>
              Capture your plate and get instant AI‑driven macros, health score, and a Cimas iGo tip.
            </Text>
          </View>

          <View style={s.heroAvatarsRow}>
            <View style={s.heroAvatarRing}>
              <Text style={s.heroAvatarText}>MR</Text>
            </View>
            <View style={s.heroAvatarRingSmall}>
              <Text style={s.heroAvatarTextSmall}>NK</Text>
            </View>
            <View style={s.heroAvatarRingSmall}>
              <Text style={s.heroAvatarTextSmall}>TS</Text>
            </View>
            <View style={s.heroAvatarMore}>
              <Text style={s.heroAvatarMoreText}>+8k</Text>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

// ═══ WATER / HYDRATION CARD ══════════════════════════════════════════
function HydrationCard() {
  const percentage = 62;

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(200)} style={s.hydrationCard}>
      <View style={s.hydrationBgBlob} />

      <View style={s.hydrationHeader}>
        <View style={s.hydrationIconPill}>
          <Ionicons name="water" size={18} color="#FFFFFF" />
        </View>
        <View>
          <Text style={s.hydrationTitle}>Water intake</Text>
          <Text style={s.hydrationSub}>1 250 / 2 000 ml</Text>
        </View>
      </View>

      <View style={s.hydrationTank}>
        <View style={[s.hydrationFill, { height: `${percentage}%` }]} />
        <View style={s.hydrationLabelWrap}>
          <Text style={s.hydrationLabelPct}>{percentage}%</Text>
        </View>
      </View>
    </Animated.View>
  );
}

// ═══ SLEEP / RECOVERY CARD ═══════════════════════════════════════════
function SleepCard() {
  return (
    <Animated.View entering={FadeInDown.duration(500).delay(260)} style={s.sleepCard}>
      <View style={s.sleepBgBlob} />

      <View>
        <Text style={s.sleepChip}>STABLE</Text>
        <Text style={s.sleepTitle}>
          Recovery{'\n'}
          & sleep
        </Text>
      </View>

      <View style={s.sleepMetaRow}>
        <View style={s.sleepValueRow}>
          <Text style={s.sleepHours}>7.4</Text>
          <Text style={s.sleepHoursUnit}>hrs</Text>
        </View>
        <View style={s.sleepQualityRow}>
          <View style={s.sleepMoonIcon}>
            <Ionicons name="moon" size={16} color="#FFFFFF" />
          </View>
          <View>
            <Text style={s.sleepQualityLabel}>Quality</Text>
            <Text style={s.sleepQualityValue}>Excellent</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

// ═══ FEATURED SESSION CARD ═══════════════════════════════════════════
function FeaturedSessionCard() {
  return (
    <Animated.View entering={FadeInDown.duration(550).delay(320)} style={s.featuredCard}>
      <View style={s.featuredThumb} />
      <View style={{ flex: 1 }}>
        <Text style={s.featuredTitle}>Evening check‑in</Text>
        <Text style={s.featuredTrainer}>Coach: iGo Nutritionist</Text>
        <View style={s.featuredTagsRow}>
          <View style={s.featuredTag}>
            <Text style={s.featuredTagText}>15 min</Text>
          </View>
          <View style={[s.featuredTag, s.featuredTagAccent]}>
            <Text style={[s.featuredTagText, s.featuredTagTextAccent]}>Reflect</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════════════
export default function DashboardScreen() {
  const [activeDay, setActiveDay] = useState<DayKey>('Mon');

  return (
    <ScrollView
      style={s.screen}
      contentContainerStyle={s.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Animated.View entering={FadeInDown.duration(400)} style={s.header}>
        <View style={s.headerLeft}>
          <View style={s.headerAvatarRing}>
            <View style={s.headerAvatarInner}>
              <Text style={s.headerAvatarInitials}>MR</Text>
            </View>
          </View>
          <View>
            <Text style={s.headerGreeting}>Good morning</Text>
            <Text style={s.headerName}>Munyaradzi</Text>
          </View>
        </View>
        <Pressable style={s.headerBell}>
          <Ionicons name="notifications-outline" size={20} color="#1F2933" />
        </Pressable>
      </Animated.View>

      {/* Day selector */}
      <Animated.View entering={FadeInDown.duration(450).delay(80)}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.daysScroll}
        >
          {DAYS.map((d) => (
            <DayChip
              key={d.day}
              day={d.day}
              date={d.date}
              isActive={activeDay === d.day}
              onPress={() => setActiveDay(d.day)}
            />
          ))}
        </ScrollView>
      </Animated.View>

      <HeroCard />

      {/* Routine section */}
      <Animated.View entering={FadeInDown.duration(500).delay(180)} style={s.sectionHeaderRow}>
        <Text style={s.sectionTitle}>Today&apos;s routine</Text>
      </Animated.View>

      <View style={s.routineGrid}>
        <HydrationCard />
        <SleepCard />
      </View>

      <FeaturedSessionCard />

      <View style={{ height: 48 }} />
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════
const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FAFAFA' },
  content: { paddingHorizontal: 20, paddingBottom: 140 },

  // ── Header / hero shell
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 64 : 52,
    paddingBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerAvatarRing: {
    width: 52,
    height: 52,
    borderRadius: 26,
    padding: 2,
    backgroundColor: '#E5E7FF',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#93C5FD',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 6,
  },
  headerAvatarInner: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatarInitials: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
  headerGreeting: {
    fontSize: 12,
    fontWeight: '700',
    color: IGO.gray600,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    marginBottom: 2,
  },
  headerName: {
    fontSize: 24,
    fontWeight: '800',
    color: IGO.black,
    letterSpacing: -0.8,
  },
  headerBell: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 6,
  },

  // ── Days scroller
  daysScroll: {
    paddingVertical: 14,
    paddingRight: 4,
    gap: 10,
  },
  dayChip: {
    width: 72,
    height: 96,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  dayChipInactive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    opacity: 0.6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  dayChipActive: {
    backgroundColor: '#111111',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.32,
    shadowRadius: 28,
    elevation: 10,
    transform: [{ scale: 1.02 }],
  },
  dayChipDay: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
    marginBottom: 4,
  },
  dayChipDayActive: {
    color: '#D1D5DB',
  },
  dayChipDate: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -1,
  },
  dayChipDateActive: {
    color: '#FFFFFF',
  },
  dayChipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#A855F7',
    marginTop: 8,
  },

  // ── Hero
  heroCard: {
    borderRadius: CR,
    overflow: 'hidden',
    marginBottom: 20,
    height: 320,
    backgroundColor: '#8B5CF6',
    ...SUPER_CARD_SHADOW,
  },
  heroInner: {
    flex: 1,
    padding: 26,
    justifyContent: 'space-between',
    zIndex: 2,
  },
  heroBlobTopRight: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#A78BFA',
    opacity: 0.55,
    shadowColor: '#4C1D95',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.45,
    shadowRadius: 36,
  },
  heroBlobBottomLeft: {
    position: 'absolute',
    bottom: -30,
    left: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#7C3AED',
    opacity: 0.5,
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 30,
  },
  heroOrbStack: {
    position: 'absolute',
    right: -10,
    top: '40%',
    width: 160,
    height: 160,
  },
  heroOrb: {
    position: 'absolute',
    top: 0,
    right: 40,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FACC15',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
  },
  heroPlate: {
    position: 'absolute',
    top: 50,
    right: 0,
    width: 120,
    height: 120,
    borderRadius: 36,
    backgroundColor: '#C4B5FD',
    transform: [{ rotate: '15deg' }],
    shadowColor: '#4C1D95',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.45,
    shadowRadius: 26,
  },
  heroLabelPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.22)',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    marginBottom: 8,
  },
  heroLabelText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#F5F3FF',
    letterSpacing: 1.4,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1.4,
    lineHeight: 32,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#EDE9FE',
    maxWidth: SCREEN_W * 0.7,
  },
  heroAvatarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    gap: -8,
  },
  heroAvatarRing: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#F5F3FF',
    backgroundColor: 'rgba(17,24,39,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroAvatarRingSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#F5F3FF',
    backgroundColor: 'rgba(17,24,39,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -10,
  },
  heroAvatarText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  heroAvatarTextSmall: {
    fontSize: 11,
    fontWeight: '700',
    color: '#E5E7EB',
  },
  heroAvatarMore: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#F5F3FF',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -10,
  },
  heroAvatarMoreText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#4C1D95',
    letterSpacing: 0.6,
  },

  // ── Routine cards grid
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.5,
  },
  routineGrid: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 18,
  },

  // ── Hydration card
  hydrationCard: {
    flex: 1,
    backgroundColor: '#3B82F6',
    borderRadius: 32,
    padding: 18,
    overflow: 'hidden',
    ...LIGHT_CARD_SHADOW,
  },
  hydrationBgBlob: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#60A5FA',
    opacity: 0.5,
  },
  hydrationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  hydrationIconPill: {
    width: 40,
    height: 40,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hydrationTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.6,
  },
  hydrationSub: {
    fontSize: 11,
    fontWeight: '600',
    color: '#DBEAFE',
    marginTop: 2,
  },
  hydrationTank: {
    marginTop: 12,
    height: 120,
    borderRadius: 28,
    backgroundColor: 'rgba(15,23,42,0.25)',
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  hydrationFill: {
    width: '100%',
    backgroundColor: 'rgba(191,219,254,0.75)',
  },
  hydrationLabelWrap: {
    position: 'absolute',
    bottom: 10,
    left: 16,
  },
  hydrationLabelPct: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // ── Sleep card
  sleepCard: {
    flex: 1,
    backgroundColor: '#F97316',
    borderRadius: 32,
    padding: 18,
    overflow: 'hidden',
    ...LIGHT_CARD_SHADOW,
  },
  sleepBgBlob: {
    position: 'absolute',
    bottom: -40,
    left: -20,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FDBA74',
    opacity: 0.6,
  },
  sleepChip: {
    alignSelf: 'flex-start',
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFBEB',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.15)',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  sleepTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.6,
    lineHeight: 22,
  },
  sleepMetaRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  sleepValueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  sleepHours: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  sleepHoursUnit: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFBEB',
    marginBottom: 4,
  },
  sleepQualityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sleepMoonIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sleepQualityLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#FFEDD5',
  },
  sleepQualityValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // ── Featured card
  featuredCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: 20,
    ...LIGHT_CARD_SHADOW,
  },
  featuredThumb: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: '#FFE4E6',
    marginRight: 14,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.5,
  },
  featuredTrainer: {
    fontSize: 12,
    fontWeight: '500',
    color: IGO.gray600,
    marginTop: 4,
  },
  featuredTagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  featuredTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
  },
  featuredTagAccent: {
    backgroundColor: '#FEF2F2',
  },
  featuredTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4B5563',
  },
  featuredTagTextAccent: {
    color: '#DC2626',
  },
});
