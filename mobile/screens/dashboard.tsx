import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeInDown,
} from 'react-native-reanimated';
import { IGO } from '@/constants/theme';

// ─── Hero Card ───────────────────────────────────────────────────────
function HeroCard() {
  return (
    <Animated.View entering={FadeInDown.duration(600).delay(100)}>
      <View style={styles.heroCard}>
        {/* Gradient background */}
        <View style={styles.heroGradientBg}>
          <View style={[styles.gradientCircle, styles.gradientCircle1]} />
          <View style={[styles.gradientCircle, styles.gradientCircle2]} />
          <View style={[styles.gradientCircle, styles.gradientCircle3]} />
          <View style={[styles.gradientCircle, styles.gradientCircle4]} />
        </View>

        {/* Content */}
        <View style={styles.heroContent}>
          <View style={styles.heroTopRow}>
            <View style={styles.heroIconWrap}>
              <Ionicons name="trending-up" size={18} color={IGO.black} />
            </View>
            <View style={styles.heroBadge}>
              <View style={styles.heroBadgeDot} />
              <Text style={styles.heroBadgeText}>Live</Text>
            </View>
          </View>

          <View style={styles.heroBottom}>
            <Text style={styles.heroLabel}>Lunch • 12:45 PM</Text>
            <Text style={styles.heroCalories}>682 kcal</Text>
            <Text style={styles.heroMeal}>Roasted Chicken Salad</Text>
          </View>

          {/* Mini bar chart */}
          <View style={styles.heroMiniChart}>
            {[12, 18, 24, 14, 8].map((h, i) => (
              <View
                key={i}
                style={[
                  styles.heroBar,
                  {
                    height: h,
                    backgroundColor:
                      i === 2 ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.1)',
                  },
                ]}
              />
            ))}
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

// ─── Macro Card ──────────────────────────────────────────────────────
interface MacroCardProps {
  label: string;
  value: string;
  goal: string;
  progress: number;
  color: string;
  delay: number;
}

function MacroCard({ label, value, goal, progress, color, delay }: MacroCardProps) {
  return (
    <Animated.View
      entering={FadeInDown.duration(500).delay(delay)}
      style={styles.macroCard}
    >
      <View>
        <Text style={styles.macroLabel}>{label}</Text>
        <Text style={styles.macroValue}>{value}</Text>
        <Text style={styles.macroGoal}>{goal}</Text>
      </View>
      <View style={styles.macroBarTrack}>
        <View
          style={[
            styles.macroBarFill,
            { width: `${progress}%`, backgroundColor: color },
          ]}
        />
      </View>
    </Animated.View>
  );
}

// ─── Scan Button Card ────────────────────────────────────────────────
function ScanCard() {
  return (
    <Animated.View entering={FadeInDown.duration(500).delay(500)}>
      <Pressable style={styles.scanCard}>
        <Ionicons name="camera" size={26} color={IGO.white} />
        <Text style={styles.scanText}>Scan Meal</Text>
      </Pressable>
    </Animated.View>
  );
}

// ─── Weekly Activity ─────────────────────────────────────────────────
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const DAY_DATA = [
  { height: 40, color: IGO.protein },
  { height: 65, color: IGO.carbs },
  { height: 45, color: IGO.fat },
  { height: 80, color: IGO.protein },
  { height: 50, color: IGO.carbs },
  { height: 70, color: IGO.fat },
  { height: 30, color: IGO.protein },
];

function WeeklyActivity() {
  return (
    <Animated.View
      entering={FadeInDown.duration(500).delay(600)}
      style={styles.weeklyCard}
    >
      <View style={styles.weeklyHeader}>
        <Text style={styles.weeklyTitle}>Weekly Activity</Text>
        <Text style={styles.weeklySubtitle}>Avg 2,100 kcal</Text>
      </View>
      <View style={styles.weeklyBars}>
        {DAY_DATA.map((day, i) => (
          <View key={i} style={styles.weeklyCol}>
            <View style={styles.weeklyBarTrack}>
              <View
                style={[
                  styles.weeklyBarFill,
                  {
                    height: `${day.height}%`,
                    backgroundColor: day.color,
                  },
                ]}
              />
            </View>
            <Text style={styles.weeklyDay}>{DAYS[i]}</Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
}

// ─── Wellness Tip ────────────────────────────────────────────────────
function WellnessTip() {
  return (
    <Animated.View
      entering={FadeInDown.duration(500).delay(700)}
      style={styles.wellnessCard}
    >
      <View style={styles.wellnessIconWrap}>
        <Ionicons name="bulb-outline" size={18} color={IGO.fat} />
      </View>
      <View style={styles.wellnessContent}>
        <Text style={styles.wellnessSource}>CIMAS HEALTH GROUP</Text>
        <Text style={styles.wellnessTip}>
          Adding leafy greens to your lunch can improve iron absorption by 15%.
        </Text>
      </View>
    </Animated.View>
  );
}

// ─── Dashboard Screen ────────────────────────────────────────────────
export default function DashboardScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <View>
          <Text style={styles.headerDateLabel}>TODAY</Text>
        </View>
        <Pressable style={styles.headerAvatar}>
          <Text style={styles.headerAvatarText}>MR</Text>
        </Pressable>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(500).delay(50)}>
        <Text style={styles.pageTitle}>Summary</Text>
      </Animated.View>

      {/* Hero */}
      <HeroCard />

      {/* Macro grid */}
      <View style={styles.macroGrid}>
        <View style={styles.macroRow}>
          <MacroCard
            label="Protein"
            value="42g"
            goal="35% of goal"
            progress={65}
            color={IGO.protein}
            delay={300}
          />
          <MacroCard
            label="Carbs"
            value="28g"
            goal="22% of goal"
            progress={45}
            color={IGO.carbs}
            delay={350}
          />
        </View>
        <View style={styles.macroRow}>
          <MacroCard
            label="Fat"
            value="18g"
            goal="15% of goal"
            progress={30}
            color={IGO.fat}
            delay={400}
          />
          <ScanCard />
        </View>
      </View>

      {/* Weekly */}
      <WeeklyActivity />

      {/* Wellness */}
      <WellnessTip />
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

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 8,
  },
  headerDateLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: IGO.gray600,
    letterSpacing: 1,
  },
  headerAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: IGO.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatarText: {
    fontSize: 12,
    fontWeight: '700',
    color: IGO.white,
  },
  pageTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: IGO.black,
    letterSpacing: -0.5,
    marginBottom: 20,
  },

  // Hero
  heroCard: {
    width: '100%',
    aspectRatio: 1.586,
    borderRadius: IGO.radiusLg,
    overflow: 'hidden',
    marginBottom: 16,
    ...IGO.shadowSm,
  },
  heroGradientBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F8F8F8',
  },
  gradientCircle: {
    position: 'absolute',
    borderRadius: 999,
  },
  gradientCircle1: {
    width: 280,
    height: 280,
    top: -60,
    left: -60,
    backgroundColor: 'rgba(224,195,252,0.6)',
  },
  gradientCircle2: {
    width: 240,
    height: 240,
    top: -40,
    right: -40,
    backgroundColor: 'rgba(255,223,211,0.6)',
  },
  gradientCircle3: {
    width: 200,
    height: 200,
    bottom: -40,
    right: -20,
    backgroundColor: 'rgba(255,249,196,0.6)',
  },
  gradientCircle4: {
    width: 220,
    height: 220,
    bottom: -60,
    left: -40,
    backgroundColor: 'rgba(142,197,252,0.3)',
  },
  heroContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    zIndex: 2,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: IGO.radiusFull,
  },
  heroBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: IGO.fat,
  },
  heroBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: IGO.black,
  },
  heroBottom: {
    marginTop: 'auto',
  },
  heroLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 4,
  },
  heroCalories: {
    fontSize: 28,
    fontWeight: '700',
    color: IGO.black,
    letterSpacing: -0.5,
  },
  heroMeal: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.4)',
    marginTop: 2,
  },
  heroMiniChart: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    height: 30,
  },
  heroBar: {
    width: 6,
    borderRadius: 3,
  },

  // Macros
  macroGrid: {
    gap: 12,
    marginBottom: 16,
  },
  macroRow: {
    flexDirection: 'row',
    gap: 12,
  },
  macroCard: {
    flex: 1,
    backgroundColor: IGO.white,
    borderRadius: IGO.radiusLg,
    padding: 16,
    minHeight: 140,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    ...IGO.shadowSm,
  },
  macroLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: IGO.gray600,
    marginBottom: 8,
  },
  macroValue: {
    fontSize: 26,
    fontWeight: '600',
    color: IGO.black,
    letterSpacing: -0.5,
  },
  macroGoal: {
    fontSize: 12,
    fontWeight: '500',
    color: IGO.gray600,
    marginTop: 2,
  },
  macroBarTrack: {
    height: 8,
    backgroundColor: IGO.gray200,
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 'auto',
  },
  macroBarFill: {
    height: '100%',
    borderRadius: 4,
  },

  // Scan
  scanCard: {
    flex: 1,
    backgroundColor: IGO.black,
    borderRadius: IGO.radiusLg,
    minHeight: 140,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...IGO.shadowSm,
  },
  scanText: {
    fontSize: 14,
    fontWeight: '600',
    color: IGO.white,
  },

  // Weekly
  weeklyCard: {
    backgroundColor: IGO.white,
    borderRadius: IGO.radiusLg,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    ...IGO.shadowSm,
  },
  weeklyHeader: {
    marginBottom: 24,
  },
  weeklyTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: IGO.gray600,
    marginBottom: 4,
  },
  weeklySubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: IGO.gray600,
  },
  weeklyBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 80,
  },
  weeklyCol: {
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  weeklyBarTrack: {
    width: 6,
    height: 60,
    backgroundColor: IGO.gray200,
    borderRadius: 3,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  weeklyBarFill: {
    width: '100%',
    borderRadius: 3,
  },
  weeklyDay: {
    fontSize: 11,
    fontWeight: '500',
    color: IGO.gray600,
  },

  // Wellness
  wellnessCard: {
    backgroundColor: IGO.white,
    borderRadius: IGO.radiusLg,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    marginBottom: 16,
    ...IGO.shadowSm,
  },
  wellnessIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(52,199,89,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wellnessContent: {
    flex: 1,
  },
  wellnessSource: {
    fontSize: 11,
    fontWeight: '700',
    color: IGO.gray600,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  wellnessTip: {
    fontSize: 15,
    fontWeight: '500',
    color: IGO.black,
    lineHeight: 22,
  },
});
