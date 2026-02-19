import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { IGO } from '@/constants/theme';

// ─── Stat Row ────────────────────────────────────────────────────────
interface StatRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  trend: string;
  trendUp: boolean;
  delay: number;
}

function StatRow({ icon, label, value, unit, trend, trendUp, delay }: StatRowProps) {
  return (
    <Animated.View
      entering={FadeInDown.duration(400).delay(delay)}
      style={styles.statRow}
    >
      <View style={styles.statIconWrap}>{icon}</View>
      <View style={styles.statInfo}>
        <Text style={styles.statLabel}>{label}</Text>
        <View style={styles.statValueRow}>
          <Text style={styles.statValue}>{value}</Text>
          <Text style={styles.statUnit}>{unit}</Text>
        </View>
      </View>
      <View
        style={[
          styles.trendBadge,
          { backgroundColor: trendUp ? 'rgba(52,199,89,0.1)' : 'rgba(255,59,48,0.1)' },
        ]}
      >
        <Text
          style={[
            styles.trendText,
            { color: trendUp ? IGO.fat : '#FF3B30' },
          ]}
        >
          {trend}
        </Text>
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
    <Animated.View
      entering={FadeInDown.duration(500).delay(300)}
      style={styles.graphCard}
    >
      <View style={styles.graphHeader}>
        <Text style={styles.graphTitle}>Today's Intake</Text>
        <View style={styles.graphBadge}>
          <Text style={styles.graphBadgeText}>1,680 / 2,200 kcal</Text>
        </View>
      </View>

      {/* Bar chart */}
      <View style={styles.graphBars}>
        {CALORIE_DATA.map((cal, i) => {
          const pct = (cal / MAX_CAL) * 100;
          return (
            <View key={i} style={styles.graphCol}>
              <View style={styles.graphBarTrack}>
                <View
                  style={[
                    styles.graphBarFill,
                    {
                      height: `${pct}%`,
                      backgroundColor:
                        pct > 80
                          ? IGO.carbs
                          : pct > 50
                          ? IGO.protein
                          : IGO.gray400,
                    },
                  ]}
                />
              </View>
              <Text style={styles.graphHour}>{HOURS[i]}</Text>
            </View>
          );
        })}
      </View>

      {/* Target line */}
      <View style={styles.targetLine}>
        <View style={styles.targetDash} />
        <Text style={styles.targetLabel}>Goal</Text>
      </View>
    </Animated.View>
  );
}

// ─── Stats Screen ────────────────────────────────────────────────────
export default function StatsScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <Text style={styles.headerLabel}>THIS WEEK</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(450).delay(50)}>
        <Text style={styles.pageTitle}>Statistics</Text>
      </Animated.View>

      {/* Summary stats */}
      <View style={styles.statsSection}>
        <StatRow
          icon={<Ionicons name="flame-outline" size={18} color={IGO.carbs} />}
          label="Calories"
          value="1,680"
          unit="kcal"
          trend="+12%"
          trendUp={true}
          delay={150}
        />
        <StatRow
          icon={<Ionicons name="water-outline" size={18} color={IGO.protein} />}
          label="Protein"
          value="96"
          unit="g"
          trend="+8%"
          trendUp={true}
          delay={200}
        />
        <StatRow
          icon={<Ionicons name="nutrition-outline" size={18} color={IGO.carbs} />}
          label="Carbs"
          value="184"
          unit="g"
          trend="-3%"
          trendUp={false}
          delay={250}
        />
        <StatRow
          icon={<Ionicons name="pulse-outline" size={18} color={IGO.fat} />}
          label="Health Score"
          value="78"
          unit="/100"
          trend="+5"
          trendUp={true}
          delay={300}
        />
      </View>

      {/* Graph */}
      <DailyGraph />

      {/* Health Score Card */}
      <Animated.View
        entering={FadeInDown.duration(500).delay(400)}
        style={styles.healthScoreCard}
      >
        <View style={styles.healthScoreRing}>
          <Text style={styles.healthScoreValue}>78</Text>
          <Text style={styles.healthScoreMax}>/100</Text>
        </View>
        <View style={styles.healthScoreInfo}>
          <Text style={styles.healthScoreTitle}>Health Score</Text>
          <Text style={styles.healthScoreDesc}>
            Your nutrition balance is good. Try adding more fiber to hit 85+.
          </Text>
        </View>
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

  // Stats
  statsSection: {
    gap: 12,
    marginBottom: 24,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: IGO.white,
    borderRadius: IGO.radiusLg,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    ...IGO.shadowSm,
  },
  statIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: IGO.gray200,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  statInfo: {
    flex: 1,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: IGO.gray600,
    marginBottom: 2,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '600',
    color: IGO.black,
    letterSpacing: -0.5,
  },
  statUnit: {
    fontSize: 14,
    fontWeight: '500',
    color: IGO.gray600,
  },
  trendBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: IGO.radiusFull,
  },
  trendText: {
    fontSize: 13,
    fontWeight: '600',
  },

  // Graph
  graphCard: {
    backgroundColor: IGO.white,
    borderRadius: IGO.radiusLg,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    ...IGO.shadowSm,
  },
  graphHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  graphTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: IGO.black,
  },
  graphBadge: {
    backgroundColor: IGO.gray200,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: IGO.radiusFull,
  },
  graphBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: IGO.gray700,
  },
  graphBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  graphCol: {
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  graphBarTrack: {
    width: 16,
    height: 100,
    backgroundColor: IGO.gray200,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  graphBarFill: {
    width: '100%',
    borderRadius: 8,
  },
  graphHour: {
    fontSize: 11,
    fontWeight: '500',
    color: IGO.gray600,
  },
  targetLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  targetDash: {
    flex: 1,
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: IGO.gray400,
  },
  targetLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: IGO.gray600,
  },

  // Health Score
  healthScoreCard: {
    backgroundColor: IGO.black,
    borderRadius: IGO.radiusLg,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 16,
    ...IGO.shadowMd,
  },
  healthScoreRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: IGO.fat,
    alignItems: 'center',
    justifyContent: 'center',
  },
  healthScoreValue: {
    fontSize: 24,
    fontWeight: '700',
    color: IGO.white,
  },
  healthScoreMax: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.5)',
    marginTop: -2,
  },
  healthScoreInfo: {
    flex: 1,
  },
  healthScoreTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: IGO.white,
    marginBottom: 6,
  },
  healthScoreDesc: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 19,
  },
});
