import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { IGO } from '@/constants/theme';

const CARD_RADIUS = 22;
const SUBTLE_BORDER = 'rgba(0,0,0,0.04)';
const CARD_SHADOW = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.03,
  shadowRadius: 12,
  elevation: 2,
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

// ─── Daily Graph ─────────────────────────────────────────────────────
const HOURS = ['6a', '9a', '12p', '3p', '6p', '9p'];
const CALORIE_DATA = [180, 420, 680, 820, 1200, 1680];
const MAX_CAL = 2200;

function DailyGraph() {
  return (
    <Animated.View entering={FadeInDown.duration(500).delay(350)} style={styles.graphCard}>
      <View style={styles.graphHeader}>
        <View>
          <Text style={styles.graphTitle}>Today's Intake</Text>
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
      <Text style={styles.macroSummaryTitle}>Macro Breakdown</Text>
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

      <DailyGraph />
      <MacroSummary />
      <HealthScoreCard />

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FAFAFA' },
  content: { paddingHorizontal: 20, paddingBottom: 130 },
  header: {
    paddingTop: Platform.OS === 'ios' ? 64 : 52,
    paddingBottom: 20,
  },
  headerLabel: {
    fontSize: 13, fontWeight: '600', color: IGO.gray600, letterSpacing: 0.8, marginBottom: 4,
  },
  headerTitle: {
    fontSize: 32, fontWeight: '700', color: IGO.black, letterSpacing: -0.8,
  },

  // Stats
  statsSection: { gap: 8, marginBottom: 24 },
  statRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: IGO.white, borderRadius: CARD_RADIUS,
    padding: 14, borderWidth: 1, borderColor: SUBTLE_BORDER, ...CARD_SHADOW,
  },
  statIconWrap: {
    width: 38, height: 38, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  statInfo: { flex: 1 },
  statLabel: { fontSize: 12, fontWeight: '500', color: IGO.gray600, marginBottom: 1 },
  statValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 3 },
  statValue: { fontSize: 20, fontWeight: '700', color: IGO.black, letterSpacing: -0.5 },
  statUnit: { fontSize: 13, fontWeight: '500', color: IGO.gray600 },
  trendBadge: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 100,
  },
  trendText: { fontSize: 12, fontWeight: '600' },

  // Graph
  graphCard: {
    backgroundColor: IGO.white, borderRadius: CARD_RADIUS,
    padding: 20, marginBottom: 14,
    borderWidth: 1, borderColor: SUBTLE_BORDER, ...CARD_SHADOW,
  },
  graphHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20,
  },
  graphTitle: { fontSize: 15, fontWeight: '600', color: IGO.black, letterSpacing: -0.2, marginBottom: 2 },
  graphSub: { fontSize: 12, fontWeight: '400', color: IGO.gray600 },
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
    borderWidth: 1, borderColor: SUBTLE_BORDER, ...CARD_SHADOW,
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
    marginBottom: 14, ...CARD_SHADOW,
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
