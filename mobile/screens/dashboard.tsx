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
        {/* Colorful blobs + orb stack like smooth inspo */}
        <View style={s.heroBlobTopRight} />
        <View style={s.heroBlobBottomLeft} />
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
      <View style={s.hydrationHeader}>
        <View style={s.hydrationIconPill}>
          <Ionicons name="water" size={18} color="#FFFFFF" />
        </View>
        <View>
          <Text style={s.hydrationTitle}>Water intake</Text>
          <Text style={s.hydrationSub}>1 250 / 2 000 ml</Text>
        </View>
      </View>

      <View style={s.hydrationGaugeOuter}>
        <View style={s.hydrationGaugeTrack}>
          <View style={[s.hydrationGaugeFill, { width: `${percentage}%` }]} />
        </View>
        <View style={s.hydrationGaugeMeta}>
          <Text style={s.hydrationGaugePct}>{percentage}%</Text>
          <Text style={s.hydrationGaugeHint}>2 more glasses to hit your goal</Text>
        </View>
      </View>
    </Animated.View>
  );
}

// ═══ SLEEP / RECOVERY CARD ═══════════════════════════════════════════
function SleepCard() {
  return (
    <Animated.View entering={FadeInDown.duration(500).delay(260)} style={s.sleepCard}>
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

// ═══ QUICK GLANCE STRIP ══════════════════════════════════════════════
function QuickGlanceStrip() {
  return (
    <Animated.View entering={FadeInDown.duration(500).delay(220)} style={s.glanceRow}>
      <View style={[s.glancePill, s.glancePillToday]}>
        <Text style={s.glanceLabel}>Today</Text>
        <Text style={s.glanceValue}>1 680</Text>
        <Text style={s.glanceUnit}>kcal so far</Text>
      </View>
      <View style={[s.glancePill, s.glancePillStreak]}>
        <View style={s.glanceStreakHeader}>
          <View style={s.glanceStreakIcon}>
            <Ionicons name="flame" size={14} color="#FB923C" />
          </View>
          <Text style={[s.glanceLabel, s.glanceLabelOnDark]}>Streak</Text>
        </View>
        <Text style={[s.glanceValue, s.glanceValueOnDark]}>7</Text>
        <Text style={[s.glanceUnit, s.glanceUnitOnDark]}>days on track</Text>
      </View>
      <View style={[s.glancePill, s.glancePillScans]}>
        <Text style={s.glanceLabelScans}>Scans</Text>
        <Text style={s.glanceValueScans}>3</Text>
        <Text style={s.glanceUnitScans}>meals logged</Text>
      </View>
    </Animated.View>
  );
}

// ═══ EXTRA INSIGHT CARDS BELOW FEATURED ══════════════════════════════
function ExtraInsightCards() {
  return (
    <Animated.View entering={FadeInDown.duration(560).delay(360)} style={s.insightColumn}>
      <View style={[s.insightCard, s.insightCardBreakfast]}>
        <View style={s.insightIconBubble}>
          <Text style={s.insightIconEmoji}>🍳</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.insightTitle}>Breakfast recap</Text>
          <Text style={s.insightSubtitle}>High protein, balanced carbs. Great way to start the day.</Text>
        </View>
      </View>

      <View style={[s.insightCard, s.insightCardTomorrow]}>
        <View style={[s.insightIconBubble, s.insightIconBubbleAlt]}>
          <Text style={s.insightIconEmoji}>📝</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.insightTitle}>Prep for tomorrow</Text>
          <Text style={s.insightSubtitle}>Plan one green‑heavy meal to push your health score past 80.</Text>
        </View>
      </View>
    </Animated.View>
  );
}

// ═══ AI SUGGESTED MEAL PLANS ═════════════════════════════════════════
function SuggestedMeals() {
  const suggestions = [
    {
      id: 'lunch-bowl',
      title: 'iGo Lunch Bowl',
      subtitle: 'Grilled chicken • quinoa • greens',
      kcal: 640,
      tag: 'Balanced',
      accent: '#22C55E',
    },
    {
      id: 'veg-boost',
      title: 'Veggie Boost Plate',
      subtitle: 'Roasted veg • chickpeas • tahini',
      kcal: 520,
      tag: 'Plant‑forward',
      accent: '#A855F7',
    },
    {
      id: 'light-dinner',
      title: 'Light Evening Dish',
      subtitle: 'Fish • salad • citrus',
      kcal: 480,
      tag: 'Evening friendly',
      accent: '#3B82F6',
    },
  ];

  return (
    <Animated.View entering={FadeInDown.duration(580).delay(400)}>
      <View style={s.suggestHeaderRow}>
        <Text style={s.suggestTitle}>AI suggestions</Text>
        <Text style={s.suggestHint}>Smart meal plans from iGo</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.suggestScroll}
      >
        {suggestions.map((meal) => (
          <View
            key={meal.id}
            style={[
              s.suggestCard,
              {
                backgroundColor: 'rgba(15,23,42,0.96)',
                borderColor: 'rgba(148,163,184,0.35)',
              },
            ]}
          >
            <View style={[s.suggestAccentDot, { backgroundColor: meal.accent }]} />
            <Text style={s.suggestMealTitle}>{meal.title}</Text>
            <Text style={s.suggestMealSubtitle}>{meal.subtitle}</Text>
            <View style={s.suggestMetaRow}>
              <Text style={s.suggestKcal}>{meal.kcal} kcal</Text>
              <View style={s.suggestTag}>
                <Text style={s.suggestTagText}>{meal.tag}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </Animated.View>
  );
}

// ═══ GOALS CHIPS ROW ═════════════════════════════════════════════════
function GoalsChips() {
  const chips = [
    'Hit 2 200 kcal target',
    'At least 96g protein',
    '2 colourful veggies',
    'Hydration 80%+',
  ];

  return (
    <Animated.View entering={FadeInDown.duration(520).delay(260)}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.goalsScroll}
      >
        {chips.map((chip) => (
          <View key={chip} style={s.goalChip}>
            <Text style={s.goalChipText}>{chip}</Text>
          </View>
        ))}
      </ScrollView>
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
      <QuickGlanceStrip />
      <GoalsChips />

      {/* Routine section */}
      <Animated.View entering={FadeInDown.duration(500).delay(180)} style={s.sectionHeaderRow}>
        <Text style={s.sectionTitle}>Today&apos;s routine</Text>
      </Animated.View>

      <View style={s.routineGrid}>
        <HydrationCard />
        <SleepCard />
      </View>

      <FeaturedSessionCard />
      <ExtraInsightCards />
      <SuggestedMeals />

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
    fontFamily: 'PlusJakartaSans',
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
    fontFamily: 'PlusJakartaSans',
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
    fontFamily: 'PlusJakartaSans',
  },
  hydrationSub: {
    fontSize: 11,
    fontWeight: '600',
    color: '#DBEAFE',
    marginTop: 2,
  },
  hydrationGaugeOuter: {
    marginTop: 12,
  },
  hydrationGaugeTrack: {
    height: 18,
    borderRadius: 999,
    backgroundColor: 'rgba(15,23,42,0.35)',
    overflow: 'hidden',
  },
  hydrationGaugeFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#BFDBFE',
  },
  hydrationGaugeMeta: {
    marginTop: 8,
  },
  hydrationGaugePct: {
    fontSize: 16,
    fontWeight: '800',
    color: '#EFF6FF',
    letterSpacing: -0.4,
  },
  hydrationGaugeHint: {
    fontSize: 11,
    fontWeight: '500',
    color: '#DBEAFE',
    marginTop: 2,
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
    fontFamily: 'PlusJakartaSans',
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
    fontFamily: 'PlusJakartaSans',
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

  // ── Quick glance strip
  glanceRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    marginTop: 4,
  },
  glancePill: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  glancePillToday: {
    backgroundColor: '#111827',
  },
  glancePillStreak: {
    backgroundColor: '#111827',
  },
  glancePillScans: {
    backgroundColor: '#ECFDF5',
  },
  glanceLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  glanceValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F9FAFB',
    letterSpacing: -0.4,
    fontFamily: 'PlusJakartaSans',
  },
  glanceValueOnDark: {
    color: '#F9FAFB',
  },
  glanceLabelOnDark: {
    color: '#CBD5F5',
  },
  glanceUnitOnDark: {
    color: '#9CA3AF',
  },
  glanceUnit: {
    fontSize: 11,
    fontWeight: '500',
    color: '#D1D5DB',
    marginTop: 1,
  },
  glanceStreakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  glanceStreakIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(248,113,113,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glanceLabelScans: {
    fontSize: 10,
    fontWeight: '600',
    color: '#16A34A',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  glanceValueScans: {
    fontSize: 16,
    fontWeight: '800',
    color: '#166534',
    letterSpacing: -0.4,
    fontFamily: 'PlusJakartaSans',
  },
  glanceUnitScans: {
    fontSize: 11,
    fontWeight: '500',
    color: '#16A34A',
    marginTop: 1,
  },

  // ── Extra insight cards
  insightColumn: {
    gap: 10,
    marginBottom: 20,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: BORDER,
    ...LIGHT_CARD_SHADOW,
  },
  insightCardBreakfast: {
    // subtle left accent via icon only
  },
  insightCardTomorrow: {
    // subtle left accent via icon only
  },
  insightIconBubble: {
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  insightIconBubbleAlt: {
    backgroundColor: '#FEF3C7',
  },
  insightIconEmoji: {
    fontSize: 20,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  insightSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },

  // ── Suggested meals
  suggestHeaderRow: {
    marginBottom: 8,
    marginTop: 4,
  },
  suggestTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.4,
  },
  suggestHint: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 2,
  },
  suggestScroll: {
    paddingVertical: 6,
    paddingRight: 4,
    gap: 10,
  },
  suggestCard: {
    width: 220,
    borderRadius: 26,
    padding: 14,
    marginRight: 10,
    borderWidth: 1,
    ...LIGHT_CARD_SHADOW,
  },
  suggestAccentDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  suggestMealTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#F9FAFB',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  suggestMealSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#E5E7EB',
    marginBottom: 10,
  },
  suggestMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  suggestKcal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F9FAFB',
  },
  suggestTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(15,23,42,0.75)',
  },
  suggestTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#E5E7EB',
  },

  // ── Goals chips
  goalsScroll: {
    paddingVertical: 6,
    paddingRight: 4,
    gap: 8,
  },
  goalChip: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: '#F3F4FF',
    borderWidth: 1,
    borderColor: '#E5E7FF',
    marginRight: 8,
  },
  goalChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#111827',
    letterSpacing: 0.2,
  },
});
