import React from 'react';
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
const CHART_W = SCREEN_W - 80; // padding + card padding
const CR = 22; // card radius
const BORDER = 'rgba(0,0,0,0.04)';
const SHADOW = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.035,
  shadowRadius: 14,
  elevation: 2,
};

// ═══ GRADIENT BG FOR HERO ═══════════════════════════════════════════
function HeroGradientBg() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <SvgGradient id="heroBg" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#E8DFF5" stopOpacity="0.7" />
            <Stop offset="0.35" stopColor="#FFE8DD" stopOpacity="0.5" />
            <Stop offset="0.65" stopColor="#FFF9C4" stopOpacity="0.4" />
            <Stop offset="1" stopColor="#D4EDFC" stopOpacity="0.5" />
          </SvgGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#heroBg)" />
      </Svg>
    </View>
  );
}

// ═══ HERO CARD ══════════════════════════════════════════════════════
function HeroCard() {
  return (
    <Animated.View entering={FadeInDown.duration(600).delay(100)}>
      <View style={s.heroCard}>
        <HeroGradientBg />
        <View style={s.heroContent}>
          <View style={s.heroTop}>
            <View style={s.heroPill}>
              <View style={s.heroDot} />
              <Text style={s.heroPillText}>Latest Scan</Text>
            </View>
          </View>
          <View>
            <Text style={s.heroTime}>Lunch • 12:45 PM</Text>
            <Text style={s.heroCal}>682</Text>
            <Text style={s.heroUnit}>kilocalories</Text>
            <Text style={s.heroMeal}>Roasted Chicken Salad</Text>
          </View>
        </View>
        {/* Sparkline */}
        <View style={s.heroChartWrap}>
          <AreaChart
            data={[280, 420, 380, 520, 460, 682]}
            width={120}
            height={60}
            gradientFrom="#000000"
            gradientTo="#000000"
            lineColor="rgba(0,0,0,0.25)"
          />
        </View>
      </View>
    </Animated.View>
  );
}

// ═══ DAILY PROGRESS ═════════════════════════════════════════════════
function DailyProgress() {
  const consumed = 1680;
  const goal = 2200;
  const pct = Math.round((consumed / goal) * 100);

  // SVG ring math
  const RING_SIZE = 80;
  const STROKE_W = 6;
  const R = (RING_SIZE - STROKE_W) / 2;
  const CIRC = 2 * Math.PI * R;
  const FILL_LEN = (pct / 100) * CIRC;

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(200)} style={s.progressCard}>
      <View style={s.progressLeft}>
        <View style={{ width: RING_SIZE, height: RING_SIZE, alignItems: 'center', justifyContent: 'center' }}>
          <Svg width={RING_SIZE} height={RING_SIZE} style={{ position: 'absolute' }}>
            {/* Track */}
            <SvgCircle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={R}
              stroke={IGO.gray200}
              strokeWidth={STROKE_W}
              fill="none"
            />
            {/* Fill */}
            <SvgCircle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={R}
              stroke={IGO.black}
              strokeWidth={STROKE_W}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${CIRC}`}
              strokeDashoffset={CIRC - FILL_LEN}
              transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
            />
          </Svg>
          <Text style={s.progressPct}>{pct}%</Text>
        </View>
      </View>
      <View style={s.progressRight}>
        <Text style={s.progressTitle}>Daily Goal</Text>
        <Text style={s.progressSub}>
          <Text style={s.progressBold}>{consumed.toLocaleString()}</Text> of {goal.toLocaleString()} kcal
        </Text>
        <View style={s.progressBar}>
          <View style={[s.progressBarFill, { width: `${pct}%` }]} />
        </View>
        <View style={s.progressMeta}>
          <View style={s.progressMetaItem}>
            <View style={[s.progressDot, { backgroundColor: IGO.protein }]} />
            <Text style={s.progressMetaText}>P: 96g</Text>
          </View>
          <View style={s.progressMetaItem}>
            <View style={[s.progressDot, { backgroundColor: IGO.carbs }]} />
            <Text style={s.progressMetaText}>C: 184g</Text>
          </View>
          <View style={s.progressMetaItem}>
            <View style={[s.progressDot, { backgroundColor: IGO.fat }]} />
            <Text style={s.progressMetaText}>F: 52g</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

// ═══ MACROS — 3 CARDS ═══════════════════════════════════════════════
function MacroCards() {
  const macros = [
    { label: 'Protein', value: '96g', target: '120g', pct: 80, color: IGO.protein, icon: 'water' as const },
    { label: 'Carbs', value: '184g', target: '250g', pct: 74, color: IGO.carbs, icon: 'nutrition' as const },
    { label: 'Fat', value: '52g', target: '70g', pct: 74, color: IGO.fat, icon: 'leaf' as const },
  ];

  return (
    <View style={s.macroRow}>
      {macros.map((m, i) => (
        <Animated.View
          key={m.label}
          entering={FadeInDown.duration(450).delay(300 + i * 80)}
          style={s.macroCard}
        >
          <View style={[s.macroIconWrap, { backgroundColor: `${m.color}10` }]}>
            <Ionicons name={m.icon} size={16} color={m.color} />
          </View>
          <Text style={s.macroValue}>{m.value}</Text>
          <Text style={s.macroLabel}>{m.label}</Text>
          <View style={s.macroTrack}>
            <View style={[s.macroFill, { width: `${m.pct}%`, backgroundColor: m.color }]} />
          </View>
        </Animated.View>
      ))}
    </View>
  );
}

// ═══ WEEKLY CHART ═══════════════════════════════════════════════════
const WEEKLY_DATA = [1840, 2100, 1950, 2250, 1780, 2050, 1680];
const WEEK_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function WeeklyChart() {
  return (
    <Animated.View entering={FadeInDown.duration(500).delay(550)} style={s.chartCard}>
      <View style={s.chartHeader}>
        <View>
          <Text style={s.chartTitle}>This Week</Text>
          <Text style={s.chartSub}>Calorie intake trend</Text>
        </View>
        <View style={s.chartBadge}>
          <Ionicons name="trending-up" size={12} color={IGO.fat} />
          <Text style={s.chartBadgeText}>On track</Text>
        </View>
      </View>
      <View style={{ marginHorizontal: -4 }}>
        <AreaChart
          data={WEEKLY_DATA}
          width={CHART_W}
          height={120}
          gradientFrom={IGO.protein}
          gradientTo={IGO.protein}
          lineColor={IGO.protein}
        />
      </View>
      <View style={s.chartLabels}>
        {WEEK_LABELS.map((l, i) => (
          <Text
            key={l}
            style={[s.chartLabel, i === 6 && s.chartLabelActive]}
          >
            {l}
          </Text>
        ))}
      </View>
    </Animated.View>
  );
}

// ═══ RECENT MEALS ═══════════════════════════════════════════════════
const MEALS = [
  { name: 'Avocado Toast', time: '8:20 AM', cal: 320, emoji: '🥑', kind: 'Breakfast' },
  { name: 'Grilled Salmon Bowl', time: '12:45 PM', cal: 682, emoji: '🐟', kind: 'Lunch' },
  { name: 'Greek Yogurt Parfait', time: '3:30 PM', cal: 180, emoji: '🫐', kind: 'Snack' },
];

function RecentMeals() {
  return (
    <Animated.View entering={FadeInDown.duration(500).delay(650)}>
      <View style={s.sectionRow}>
        <Text style={s.sectionTitle}>Recent Meals</Text>
        <Text style={s.sectionLink}>See All</Text>
      </View>
      <View style={s.mealsCard}>
        {MEALS.map((m, i) => (
          <View key={i}>
            <View style={s.mealRow}>
              <View style={s.mealEmoji}>
                <Text style={s.mealEmojiText}>{m.emoji}</Text>
              </View>
              <View style={s.mealInfo}>
                <Text style={s.mealName}>{m.name}</Text>
                <Text style={s.mealSub}>{m.kind} • {m.time}</Text>
              </View>
              <View style={s.mealCalCol}>
                <Text style={s.mealCal}>{m.cal}</Text>
                <Text style={s.mealCalUnit}>kcal</Text>
              </View>
            </View>
            {i < MEALS.length - 1 && <View style={s.divider} />}
          </View>
        ))}
      </View>
    </Animated.View>
  );
}

// ═══ ACHIEVEMENTS ═══════════════════════════════════════════════════
function Achievements() {
  const badges = [
    { icon: '🔥', label: '7 Day Streak', color: 'rgba(255,149,0,0.08)' },
    { icon: '🎯', label: 'On Target', color: 'rgba(52,199,89,0.08)' },
    { icon: '💧', label: 'Hydrated', color: 'rgba(0,122,255,0.08)' },
    { icon: '🏆', label: 'Top 10%', color: 'rgba(175,82,222,0.08)' },
  ];

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(750)}>
      <View style={s.sectionRow}>
        <Text style={s.sectionTitle}>Achievements</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.achieveScroll}
      >
        {badges.map((b, i) => (
          <Animated.View
            key={b.label}
            entering={FadeInDown.duration(400).delay(780 + i * 60)}
            style={[s.achieveCard, { backgroundColor: b.color }]}
          >
            <Text style={s.achieveEmoji}>{b.icon}</Text>
            <Text style={s.achieveLabel}>{b.label}</Text>
          </Animated.View>
        ))}
      </ScrollView>
    </Animated.View>
  );
}

// ═══ WELLNESS TIP ═══════════════════════════════════════════════════
function WellnessTip() {
  return (
    <Animated.View entering={FadeInDown.duration(500).delay(850)} style={s.tipCard}>
      <View style={s.tipIcon}>
        <Ionicons name="leaf" size={14} color={IGO.fat} />
      </View>
      <View style={s.tipContent}>
        <Text style={s.tipSource}>CIMAS HEALTH GROUP</Text>
        <Text style={s.tipText}>
          Adding leafy greens to your lunch can improve iron absorption by
          <Text style={s.tipBold}> 15%</Text>.
        </Text>
      </View>
    </Animated.View>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════════════
export default function DashboardScreen() {
  return (
    <ScrollView
      style={s.screen}
      contentContainerStyle={s.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Animated.View entering={FadeInDown.duration(400)} style={s.header}>
        <View>
          <Text style={s.headerGreeting}>Good afternoon</Text>
          <Text style={s.headerName}>Munyaradzi</Text>
        </View>
        <Pressable style={s.avatar}>
          <Text style={s.avatarText}>MR</Text>
        </Pressable>
      </Animated.View>

      <HeroCard />
      <DailyProgress />
      <MacroCards />
      <WeeklyChart />
      <RecentMeals />
      <Achievements />
      <WellnessTip />

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

  // ── Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: Platform.OS === 'ios' ? 64 : 52,
    paddingBottom: 20,
  },
  headerGreeting: {
    fontSize: 14,
    fontWeight: '400',
    color: IGO.gray600,
    marginBottom: 1,
  },
  headerName: {
    fontSize: 26,
    fontWeight: '700',
    color: IGO.black,
    letterSpacing: -0.8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: IGO.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '700',
    color: IGO.white,
    letterSpacing: 0.5,
  },

  // ── Hero
  heroCard: {
    borderRadius: CR,
    overflow: 'hidden',
    marginBottom: 12,
    height: 200,
    ...SHADOW,
  },
  heroContent: {
    flex: 1,
    padding: 22,
    justifyContent: 'space-between',
    zIndex: 2,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  heroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.65)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
  },
  heroDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#34C759',
  },
  heroPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.6)',
  },
  heroTime: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.4)',
    marginBottom: 2,
  },
  heroCal: {
    fontSize: 48,
    fontWeight: '800',
    color: IGO.black,
    letterSpacing: -2,
    lineHeight: 52,
  },
  heroUnit: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.35)',
    letterSpacing: 1,
    textTransform: 'lowercase',
    marginBottom: 4,
  },
  heroMeal: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.5)',
  },
  heroChartWrap: {
    position: 'absolute',
    bottom: 20,
    right: 16,
    opacity: 0.6,
    zIndex: 2,
  },

  // ── Progress
  progressCard: {
    flexDirection: 'row',
    backgroundColor: IGO.white,
    borderRadius: CR,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: BORDER,
    ...SHADOW,
  },
  progressLeft: {
    marginRight: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressRingOuter: {
    width: 76,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressRingTrack: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 38,
    borderWidth: 6,
    borderColor: IGO.gray200,
  },
  progressRingFill: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 38,
    borderWidth: 6,
    borderColor: IGO.black,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  progressRingInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPct: {
    fontSize: 18,
    fontWeight: '700',
    color: IGO.black,
    letterSpacing: -0.5,
  },
  progressRight: {
    flex: 1,
    justifyContent: 'center',
  },
  progressTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: IGO.black,
    marginBottom: 3,
    letterSpacing: -0.2,
  },
  progressSub: {
    fontSize: 13,
    fontWeight: '400',
    color: IGO.gray600,
    marginBottom: 10,
  },
  progressBold: {
    fontWeight: '600',
    color: IGO.black,
  },
  progressBar: {
    height: 4,
    backgroundColor: IGO.gray200,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: IGO.black,
    borderRadius: 2,
  },
  progressMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  progressMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  progressMetaText: {
    fontSize: 11,
    fontWeight: '500',
    color: IGO.gray600,
  },

  // ── Macros
  macroRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  macroCard: {
    flex: 1,
    backgroundColor: IGO.white,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: BORDER,
    ...SHADOW,
  },
  macroIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  macroValue: {
    fontSize: 20,
    fontWeight: '700',
    color: IGO.black,
    letterSpacing: -0.5,
    marginBottom: 1,
  },
  macroLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: IGO.gray600,
    marginBottom: 10,
  },
  macroTrack: {
    height: 4,
    backgroundColor: IGO.gray200,
    borderRadius: 2,
    overflow: 'hidden',
  },
  macroFill: {
    height: '100%',
    borderRadius: 2,
  },

  // ── Chart
  chartCard: {
    backgroundColor: IGO.white,
    borderRadius: CR,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: BORDER,
    ...SHADOW,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: IGO.black,
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  chartSub: {
    fontSize: 12,
    fontWeight: '400',
    color: IGO.gray600,
  },
  chartBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(52,199,89,0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
  },
  chartBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: IGO.fat,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  chartLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: IGO.gray600,
  },
  chartLabelActive: {
    color: IGO.black,
    fontWeight: '700',
  },

  // ── Meals
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: IGO.black,
    letterSpacing: -0.3,
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: '500',
    color: IGO.gray600,
  },
  mealsCard: {
    backgroundColor: IGO.white,
    borderRadius: CR,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: BORDER,
    ...SHADOW,
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
  },
  mealEmoji: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  mealEmojiText: {
    fontSize: 18,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 14,
    fontWeight: '500',
    color: IGO.black,
    marginBottom: 2,
  },
  mealSub: {
    fontSize: 12,
    fontWeight: '400',
    color: IGO.gray600,
  },
  mealCalCol: {
    alignItems: 'flex-end',
  },
  mealCal: {
    fontSize: 15,
    fontWeight: '600',
    color: IGO.black,
    letterSpacing: -0.3,
  },
  mealCalUnit: {
    fontSize: 10,
    fontWeight: '500',
    color: IGO.gray600,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: IGO.gray200,
    marginLeft: 52,
  },

  // ── Achievements
  achieveScroll: {
    gap: 10,
    paddingBottom: 4,
    marginBottom: 20,
  },
  achieveCard: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    gap: 6,
    minWidth: 90,
  },
  achieveEmoji: {
    fontSize: 22,
  },
  achieveLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: IGO.black,
  },

  // ── Tip
  tipCard: {
    backgroundColor: IGO.white,
    borderRadius: CR,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    borderWidth: 1,
    borderColor: BORDER,
    ...SHADOW,
  },
  tipIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(52,199,89,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipContent: {
    flex: 1,
  },
  tipSource: {
    fontSize: 9,
    fontWeight: '700',
    color: IGO.gray500,
    letterSpacing: 2,
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(0,0,0,0.55)',
    lineHeight: 19,
  },
  tipBold: {
    fontWeight: '600',
    color: IGO.black,
  },
});
