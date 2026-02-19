import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { IGO } from '@/constants/theme';

const { width: SCREEN_W } = Dimensions.get('window');
const CARD_RADIUS = 26;
const SUBTLE_BORDER = 'rgba(0,0,0,0.04)';
const LIGHT_CARD_SHADOW = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.08,
  shadowRadius: 22,
  elevation: 7,
};
const SUPER_CARD_SHADOW = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 20 },
  shadowOpacity: 0.18,
  shadowRadius: 40,
  elevation: 12,
};

// ─── Stat Row ────────────────────────────────────────────────────────
interface StatRowProps {
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  label: string;
  value: string;
  unit: string;
  trend: string;
  trendUp: boolean;
  delay: number;
}

function StatRow({ iconName, iconColor, iconBg, label, value, unit, trend, trendUp, delay }: StatRowProps) {
  return (
    <Animated.View entering={FadeInDown.duration(400).delay(delay)} style={styles.statRow}>
      <View style={[styles.statIconWrap, { backgroundColor: iconBg }]}>
        <Ionicons name={iconName} size={18} color={iconColor} />
      </View>
      <View style={styles.statInfo}>
        <Text style={styles.statLabel}>{label}</Text>
        <View style={styles.statValueRow}>
          <Text style={styles.statValue}>{value}</Text>
          <Text style={styles.statUnit}>{unit}</Text>
        </View>
      </View>
      <View style={[styles.trendBadge, { backgroundColor: trendUp ? 'rgba(52,199,89,0.08)' : 'rgba(255,59,48,0.08)' }]}>
        <Ionicons
          name={trendUp ? 'arrow-up' : 'arrow-down'}
          size={10}
          color={trendUp ? IGO.fat : '#FF3B30'}
          style={{ marginRight: 2 }}
        />
        <Text style={[styles.trendText, { color: trendUp ? IGO.fat : '#FF3B30' }]}>{trend}</Text>
      </View>
    </Animated.View>
  );
}

// ─── Hero Summary (smooth-inspired) ──────────────────────────────────
function StatsHero() {
  return (
    <Animated.View entering={FadeInDown.duration(520).delay(80)} style={styles.heroCard}>
      <View style={styles.heroBlobTopRight} />
      <View style={styles.heroBlobBottomLeft} />
      <View style={styles.heroOrbStack}>
        <View style={styles.heroOrb} />
        <View style={styles.heroPlate} />
      </View>

      <View style={styles.heroInner}>
        <View style={styles.heroPill}>
          <Text style={styles.heroPillText}>THIS WEEK</Text>
        </View>

        <View>
          <Text style={styles.heroTitle}>Your iGo stats</Text>
          <Text style={styles.heroSubtitle}>
            Trends, macros, and score—refined into one clean snapshot.
          </Text>
        </View>

        <View style={styles.heroMetricsRow}>
          <View style={styles.heroMetric}>
            <Text style={styles.heroMetricLabel}>Avg kcal</Text>
            <Text style={styles.heroMetricValue}>1 980</Text>
          </View>
          <View style={styles.heroMetricDivider} />
          <View style={styles.heroMetric}>
            <Text style={styles.heroMetricLabel}>Best score</Text>
            <Text style={styles.heroMetricValue}>84</Text>
          </View>
          <View style={styles.heroMetricDivider} />
          <View style={styles.heroMetric}>
            <Text style={styles.heroMetricLabel}>Consistency</Text>
            <Text style={styles.heroMetricValue}>A‑</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

// ─── AI Insight Rail ─────────────────────────────────────────────────
function AIInsightsRail() {
  const insights = [
    { id: 'fiber', title: 'Fiber up', body: 'Add 1 fruit + 1 leafy green today.', dot: '#22C55E' },
    { id: 'protein', title: 'Protein steady', body: 'You’re trending 80% of target.', dot: '#A855F7' },
    { id: 'late', title: 'Late calories', body: 'Shift 150 kcal to earlier meals.', dot: '#3B82F6' },
  ];

  return (
    <Animated.View entering={FadeInDown.duration(560).delay(220)}>
      <View style={styles.aiHeaderRow}>
        <Text style={styles.aiTitle}>AI insights</Text>
        <Text style={styles.aiHint}>Small shifts, big score</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.aiScroll}>
        {insights.map((i) => (
          <View key={i.id} style={styles.aiCard}>
            <View style={[styles.aiDot, { backgroundColor: i.dot }]} />
            <Text style={styles.aiCardTitle}>{i.title}</Text>
            <Text style={styles.aiCardBody}>{i.body}</Text>
          </View>
        ))}
      </ScrollView>
    </Animated.View>
  );
}

// ─── Daily Graph ─────────────────────────────────────────────────────
const HOURS = ['6a', '9a', '12p', '3p', '6p', '9p'];
const CALORIE_DATA = [180, 420, 680, 820, 1200, 1680];
const MAX_CAL = 2200;

function DailyGraph() {
  return (
    <Animated.View entering={FadeInDown.duration(500).delay(350)} style={styles.graphCard}>
      <View style={styles.graphHeader}>
        <View>
          <Text style={styles.graphTitle}>Today&apos;s intake</Text>
          <Text style={styles.graphSub}>Tracking your daily progress</Text>
        </View>
        <View style={styles.graphBadge}>
          <Text style={styles.graphBadgeText}>1,680 / 2,200</Text>
        </View>
      </View>

      <View style={styles.graphBars}>
        {CALORIE_DATA.map((cal, i) => {
          const pct = (cal / MAX_CAL) * 100;
          return (
            <View key={i} style={styles.graphCol}>
              <View style={styles.graphBarTrack}>
                <Animated.View
                  entering={FadeInUp.duration(600).delay(400 + i * 70)}
                  style={[
                    styles.graphBarFill,
                    {
                      height: `${pct}%`,
                      backgroundColor:
                        pct > 75 ? IGO.carbs :
                        pct > 40 ? IGO.protein :
                        IGO.gray400,
                    },
                  ]}
                />
              </View>
              <Text style={styles.graphHour}>{HOURS[i]}</Text>
            </View>
          );
        })}
      </View>
    </Animated.View>
  );
}

// ─── Macro Summary ───────────────────────────────────────────────────
function MacroSummary() {
  const macros = [
    { label: 'Protein', value: '96g', target: '120g', pct: 80, color: IGO.protein },
    { label: 'Carbs', value: '184g', target: '250g', pct: 74, color: IGO.carbs },
    { label: 'Fat', value: '52g', target: '70g', pct: 74, color: IGO.fat },
  ];

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(450)} style={styles.macroSummaryCard}>
      <View style={styles.sectionKickerRow}>
        <Text style={styles.sectionKicker}>MACROS</Text>
        <Text style={styles.sectionKickerHint}>Balanced is the goal</Text>
      </View>
      <Text style={styles.macroSummaryTitle}>Macro breakdown</Text>
      <View style={styles.macroSummaryGrid}>
        {macros.map((m, i) => (
          <View key={i} style={styles.macroSummaryItem}>
            <View style={styles.macroSummaryHeader}>
              <Text style={styles.macroSummaryLabel}>{m.label}</Text>
              <Text style={styles.macroSummaryTarget}>{m.value} / {m.target}</Text>
            </View>
            <View style={styles.macroSummaryTrack}>
              <Animated.View
                entering={FadeInDown.duration(500).delay(500 + i * 80)}
                style={[styles.macroSummaryFill, { width: `${m.pct}%`, backgroundColor: m.color }]}
              />
            </View>
          </View>
        ))}
      </View>
    </Animated.View>
  );
}

// ─── Health Score ─────────────────────────────────────────────────────
function HealthScoreCard() {
  return (
    <Animated.View entering={FadeInDown.duration(500).delay(550)} style={styles.healthCard}>
      <View style={styles.healthLeft}>
        <View style={styles.healthRing}>
          <View style={styles.healthRingTrack} />
          <View style={styles.healthRingFill} />
          <View style={styles.healthRingCenter}>
            <Text style={styles.healthRingValue}>78</Text>
          </View>
        </View>
      </View>
      <View style={styles.healthRight}>
        <Text style={styles.healthTitle}>Health Score</Text>
        <Text style={styles.healthDesc}>
          Your nutrition balance is good.{'\n'}Try adding more fiber to reach
          <Text style={{ fontWeight: '700' }}> 85+</Text>.
        </Text>
        <View style={styles.healthTags}>
          <View style={[styles.healthTag, { backgroundColor: 'rgba(52,199,89,0.08)' }]}>
            <Text style={[styles.healthTagText, { color: IGO.fat }]}>Good</Text>
          </View>
          <View style={[styles.healthTag, { backgroundColor: 'rgba(175,82,222,0.08)' }]}>
            <Text style={[styles.healthTagText, { color: IGO.protein }]}>+5 pts</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

// ═══════════════════════════════════════════════════════════════════════
export default function StatsScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <Text style={styles.headerLabel}>THIS WEEK</Text>
        <Text style={styles.headerTitle}>Statistics</Text>
      </Animated.View>

      <StatsHero />

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>At a glance</Text>
        <View style={styles.sectionBadge}>
          <Ionicons name="sparkles" size={12} color="#111827" />
          <Text style={styles.sectionBadgeText}>Updated</Text>
        </View>
      </View>

      <View style={styles.statsSection}>
        <StatRow
          iconName="flame" iconColor={IGO.carbs} iconBg="rgba(255,149,0,0.08)"
          label="Calories" value="1,680" unit="kcal" trend="12%" trendUp delay={150}
        />
        <StatRow
          iconName="water" iconColor={IGO.protein} iconBg="rgba(175,82,222,0.08)"
          label="Protein" value="96" unit="g" trend="8%" trendUp delay={200}
        />
        <StatRow
          iconName="nutrition" iconColor={IGO.carbs} iconBg="rgba(255,149,0,0.08)"
          label="Carbs" value="184" unit="g" trend="3%" trendUp={false} delay={250}
        />
        <StatRow
          iconName="pulse" iconColor={IGO.fat} iconBg="rgba(52,199,89,0.08)"
          label="Health Score" value="78" unit="/100" trend="5 pts" trendUp delay={300}
        />
      </View>

      <AIInsightsRail />
      <DailyGraph />
      <MacroSummary />
      <HealthScoreCard />

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8F9FC' },
  content: { paddingHorizontal: 20, paddingBottom: 130 },
  header: {
    paddingTop: Platform.OS === 'ios' ? 64 : 52,
    paddingBottom: 12,
  },
  headerLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: IGO.gray600,
    letterSpacing: 1.4,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: IGO.black,
    letterSpacing: -1.0,
    fontFamily: 'PlusJakartaSans',
  },

  // ── Hero
  heroCard: {
    borderRadius: 40,
    overflow: 'hidden',
    height: 220,
    backgroundColor: '#8B5CF6',
    marginBottom: 16,
    ...SUPER_CARD_SHADOW,
  },
  heroBlobTopRight: {
    position: 'absolute',
    top: -50,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#A78BFA',
    opacity: 0.55,
  },
  heroBlobBottomLeft: {
    position: 'absolute',
    bottom: -50,
    left: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#7C3AED',
    opacity: 0.5,
  },
  heroOrbStack: {
    position: 'absolute',
    right: -14,
    top: '30%',
    width: 140,
    height: 140,
  },
  heroOrb: {
    position: 'absolute',
    top: 0,
    right: 34,
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#FACC15',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.35,
    shadowRadius: 26,
    elevation: 10,
  },
  heroPlate: {
    position: 'absolute',
    top: 44,
    right: 0,
    width: 104,
    height: 104,
    borderRadius: 34,
    backgroundColor: '#C4B5FD',
    transform: [{ rotate: '12deg' }],
    shadowColor: '#4C1D95',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 8,
  },
  heroInner: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  heroPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  heroPillText: {
    color: '#F5F3FF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.9,
    fontFamily: 'PlusJakartaSans',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EDE9FE',
    maxWidth: SCREEN_W * 0.72,
    lineHeight: 16,
  },
  heroMetricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  heroMetric: {
    flex: 1,
  },
  heroMetricDivider: {
    width: 1,
    height: 26,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  heroMetricLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 1.0,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  heroMetricValue: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.4,
    fontFamily: 'PlusJakartaSans',
  },

  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111827',
    letterSpacing: -0.5,
    fontFamily: 'PlusJakartaSans',
  },
  sectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(17,24,39,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(17,24,39,0.06)',
  },
  sectionBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: 0.2,
  },

  sectionKickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  sectionKicker: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6B7280',
    letterSpacing: 1.2,
  },
  sectionKickerHint: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
  },

  // Stats
  statsSection: { gap: 10, marginBottom: 20 },
  statRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: IGO.white,
    borderRadius: CARD_RADIUS,
    padding: 16,
    borderWidth: 1,
    borderColor: SUBTLE_BORDER,
    ...LIGHT_CARD_SHADOW,
  },
  statIconWrap: {
    width: 38, height: 38, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  statInfo: { flex: 1 },
  statLabel: { fontSize: 12, fontWeight: '700', color: IGO.gray600, marginBottom: 2, letterSpacing: 0.2 },
  statValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 3 },
  statValue: { fontSize: 20, fontWeight: '800', color: IGO.black, letterSpacing: -0.6, fontFamily: 'PlusJakartaSans' },
  statUnit: { fontSize: 13, fontWeight: '500', color: IGO.gray600 },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  trendText: { fontSize: 12, fontWeight: '600' },

  // ── AI rail
  aiHeaderRow: {
    marginBottom: 8,
    marginTop: 2,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111827',
    letterSpacing: -0.5,
    fontFamily: 'PlusJakartaSans',
  },
  aiHint: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 2,
  },
  aiScroll: {
    paddingVertical: 6,
    paddingRight: 4,
    gap: 10,
    marginBottom: 8,
  },
  aiCard: {
    width: 220,
    borderRadius: 26,
    backgroundColor: 'rgba(15,23,42,0.96)',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.35)',
    padding: 14,
    marginRight: 10,
    ...LIGHT_CARD_SHADOW,
  },
  aiDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  aiCardTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#F9FAFB',
    letterSpacing: -0.3,
    marginBottom: 4,
    fontFamily: 'PlusJakartaSans',
  },
  aiCardBody: {
    fontSize: 12,
    fontWeight: '600',
    color: '#E5E7EB',
    lineHeight: 16,
  },

  // Graph
  graphCard: {
    backgroundColor: IGO.white, borderRadius: CARD_RADIUS,
    padding: 20, marginBottom: 14,
    borderWidth: 1, borderColor: SUBTLE_BORDER, ...LIGHT_CARD_SHADOW,
  },
  graphHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20,
  },
  graphTitle: { fontSize: 16, fontWeight: '900', color: IGO.black, letterSpacing: -0.3, marginBottom: 2, fontFamily: 'PlusJakartaSans' },
  graphSub: { fontSize: 12, fontWeight: '600', color: IGO.gray600 },
  graphBadge: {
    backgroundColor: IGO.gray200, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 100,
  },
  graphBadgeText: { fontSize: 11, fontWeight: '600', color: IGO.gray700 },
  graphBars: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 110,
  },
  graphCol: { alignItems: 'center', flex: 1, gap: 8 },
  graphBarTrack: {
    width: 18, height: 90, backgroundColor: IGO.gray200,
    borderRadius: 9, overflow: 'hidden', justifyContent: 'flex-end',
  },
  graphBarFill: { width: '100%', borderRadius: 9 },
  graphHour: { fontSize: 11, fontWeight: '500', color: IGO.gray600 },

  // Macro Summary
  macroSummaryCard: {
    backgroundColor: IGO.white, borderRadius: CARD_RADIUS,
    padding: 20, marginBottom: 14,
    borderWidth: 1, borderColor: SUBTLE_BORDER, ...LIGHT_CARD_SHADOW,
  },
  macroSummaryTitle: { fontSize: 15, fontWeight: '600', color: IGO.black, marginBottom: 16, letterSpacing: -0.2 },
  macroSummaryGrid: { gap: 14 },
  macroSummaryItem: {},
  macroSummaryHeader: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6,
  },
  macroSummaryLabel: { fontSize: 13, fontWeight: '500', color: IGO.black },
  macroSummaryTarget: { fontSize: 12, fontWeight: '500', color: IGO.gray600 },
  macroSummaryTrack: {
    height: 6, backgroundColor: IGO.gray200, borderRadius: 3, overflow: 'hidden',
  },
  macroSummaryFill: { height: '100%', borderRadius: 3 },

  // Health Score
  healthCard: {
    backgroundColor: IGO.black, borderRadius: CARD_RADIUS,
    padding: 22, flexDirection: 'row', alignItems: 'center', gap: 18,
    marginBottom: 14, ...LIGHT_CARD_SHADOW,
  },
  healthLeft: {},
  healthRing: {
    width: 72, height: 72, alignItems: 'center', justifyContent: 'center',
  },
  healthRingTrack: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 36, borderWidth: 5, borderColor: 'rgba(255,255,255,0.1)',
  },
  healthRingFill: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 36, borderWidth: 5, borderColor: IGO.fat,
    borderTopColor: 'transparent', borderRightColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  healthRingCenter: { alignItems: 'center' },
  healthRingValue: { fontSize: 22, fontWeight: '700', color: IGO.white },
  healthRight: { flex: 1 },
  healthTitle: { fontSize: 14, fontWeight: '600', color: IGO.white, marginBottom: 4 },
  healthDesc: { fontSize: 12, fontWeight: '400', color: 'rgba(255,255,255,0.55)', lineHeight: 17, marginBottom: 10 },
  healthTags: { flexDirection: 'row', gap: 6 },
  healthTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 100 },
  healthTagText: { fontSize: 11, fontWeight: '600' },
});
