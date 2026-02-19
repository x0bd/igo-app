import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { IGO } from '@/constants/theme';

// ─── Daily Progress Ring ─────────────────────────────────────────────
function DailyRing() {
  const consumed = 1680;
  const goal = 2200;
  const remaining = goal - consumed;

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(100)} style={styles.ringCard}>
      <View style={styles.ringLeft}>
        {/* Ring visual */}
        <View style={styles.ringContainer}>
          <View style={styles.ringTrack}>
            <View style={styles.ringFill} />
          </View>
          <View style={styles.ringCenter}>
            <Text style={styles.ringValue}>{consumed}</Text>
            <Text style={styles.ringUnit}>kcal</Text>
          </View>
        </View>
      </View>
      <View style={styles.ringRight}>
        <View style={styles.ringMetaRow}>
          <View style={[styles.ringDot, { backgroundColor: IGO.black }]} />
          <Text style={styles.ringMetaLabel}>Consumed</Text>
          <Text style={styles.ringMetaValue}>{consumed.toLocaleString()}</Text>
        </View>
        <View style={styles.ringMetaRow}>
          <View style={[styles.ringDot, { backgroundColor: IGO.gray300 }]} />
          <Text style={styles.ringMetaLabel}>Remaining</Text>
          <Text style={styles.ringMetaValue}>{remaining}</Text>
        </View>
        <View style={styles.ringMetaRow}>
          <View style={[styles.ringDot, { backgroundColor: IGO.protein }]} />
          <Text style={styles.ringMetaLabel}>Goal</Text>
          <Text style={styles.ringMetaValue}>{goal.toLocaleString()}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

// ─── Hero Card ───────────────────────────────────────────────────────
function HeroCard() {
  return (
    <Animated.View entering={FadeInDown.duration(600).delay(200)}>
      <View style={styles.heroCard}>
        {/* Pastel gradient circles — matching inspo exactly */}
        <View style={styles.heroGradientBg}>
          <View style={[styles.gc, { width: 300, height: 300, top: -80, left: -80, backgroundColor: 'rgba(224,195,252,0.7)' }]} />
          <View style={[styles.gc, { width: 260, height: 260, top: -50, right: -50, backgroundColor: 'rgba(255,223,211,0.7)' }]} />
          <View style={[styles.gc, { width: 220, height: 220, bottom: -50, right: -30, backgroundColor: 'rgba(255,249,196,0.7)' }]} />
          <View style={[styles.gc, { width: 240, height: 240, bottom: -70, left: -50, backgroundColor: 'rgba(142,197,252,0.35)' }]} />
          {/* Shimmer overlay */}
          <View style={styles.heroShimmer} />
        </View>

        {/* Content */}
        <View style={styles.heroContent}>
          <View style={styles.heroTopRow}>
            <View style={styles.heroIconCircle}>
              <Ionicons name="restaurant-outline" size={16} color={IGO.black} />
            </View>
            <View style={styles.heroBadge}>
              <View style={styles.heroBadgeDot} />
              <Text style={styles.heroBadgeText}>Latest Scan</Text>
            </View>
          </View>

          <View style={styles.heroBottomArea}>
            <Text style={styles.heroTimeLabel}>Lunch • 12:45 PM</Text>
            <Text style={styles.heroCalories}>682 kcal</Text>
            <Text style={styles.heroMealName}>Roasted Chicken Salad</Text>
          </View>

          {/* Mini sparkline */}
          <View style={styles.heroSparkline}>
            {[12, 18, 30, 14, 8, 22, 16].map((h, i) => (
              <View
                key={i}
                style={[
                  styles.sparkBar,
                  {
                    height: h,
                    backgroundColor: i === 2 ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.08)',
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
interface MacroProps {
  label: string;
  value: string;
  pct: string;
  progress: number;
  color: string;
  delay: number;
}

function MacroCard({ label, value, pct, progress, color, delay }: MacroProps) {
  return (
    <Animated.View entering={FadeInDown.duration(450).delay(delay)} style={styles.macroCard}>
      <Text style={styles.macroLabel}>{label}</Text>
      <Text style={styles.macroValue}>{value}</Text>
      <Text style={styles.macroPct}>{pct}</Text>
      <View style={styles.macroTrack}>
        <View style={[styles.macroFill, { width: `${progress}%`, backgroundColor: color }]} />
      </View>
    </Animated.View>
  );
}

// ─── Scan CTA ────────────────────────────────────────────────────────
function ScanCTA() {
  return (
    <Animated.View entering={FadeInDown.duration(450).delay(550)}>
      <Pressable style={styles.scanCta}>
        <View style={styles.scanCtaInner}>
          <View style={styles.scanIconRing}>
            <Ionicons name="scan" size={22} color={IGO.white} />
          </View>
          <Text style={styles.scanCtaLabel}>Scan Meal</Text>
          <Text style={styles.scanCtaSub}>Take a photo</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

// ─── Recent Meals ────────────────────────────────────────────────────
const MEALS = [
  { name: 'Avocado Toast', time: '8:20 AM', cal: 320, icon: '🥑', type: 'Breakfast' },
  { name: 'Grilled Salmon Bowl', time: '12:45 PM', cal: 682, icon: '🐟', type: 'Lunch' },
  { name: 'Greek Yogurt Parfait', time: '3:30 PM', cal: 180, icon: '🫐', type: 'Snack' },
  { name: 'Quinoa Salad', time: 'Yesterday', cal: 410, icon: '🥗', type: 'Dinner' },
];

function RecentMeals() {
  return (
    <Animated.View entering={FadeInDown.duration(500).delay(600)}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Meals</Text>
        <Pressable>
          <Text style={styles.sectionAction}>See All</Text>
        </Pressable>
      </View>
      <View style={styles.mealsCard}>
        {MEALS.map((meal, i) => (
          <View key={i}>
            <View style={styles.mealRow}>
              <View style={styles.mealEmoji}>
                <Text style={styles.mealEmojiText}>{meal.icon}</Text>
              </View>
              <View style={styles.mealInfo}>
                <Text style={styles.mealName}>{meal.name}</Text>
                <Text style={styles.mealMeta}>{meal.type} • {meal.time}</Text>
              </View>
              <View style={styles.mealCalBadge}>
                <Text style={styles.mealCalText}>{meal.cal}</Text>
                <Text style={styles.mealCalUnit}>kcal</Text>
              </View>
            </View>
            {i < MEALS.length - 1 && <View style={styles.mealDivider} />}
          </View>
        ))}
      </View>
    </Animated.View>
  );
}

// ─── Weekly Activity ─────────────────────────────────────────────────
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const DAY_DATA = [
  { pct: 40, color: IGO.protein },
  { pct: 65, color: IGO.carbs },
  { pct: 45, color: IGO.fat },
  { pct: 80, color: IGO.protein },
  { pct: 50, color: IGO.carbs },
  { pct: 70, color: IGO.fat },
  { pct: 30, color: IGO.gray400 },
];

function WeeklyActivity() {
  return (
    <Animated.View entering={FadeInDown.duration(500).delay(700)} style={styles.weeklyCard}>
      <View style={styles.weeklyHeader}>
        <View>
          <Text style={styles.weeklyTitle}>Weekly Activity</Text>
          <Text style={styles.weeklySubtitle}>Avg 2,100 kcal / day</Text>
        </View>
        <View style={styles.weeklyBadge}>
          <Ionicons name="flame" size={12} color={IGO.carbs} />
          <Text style={styles.weeklyBadgeText}>7 day streak</Text>
        </View>
      </View>
      <View style={styles.weeklyBars}>
        {DAY_DATA.map((day, i) => (
          <View key={i} style={styles.weeklyCol}>
            <View style={styles.weeklyBarTrack}>
              <Animated.View
                entering={FadeInUp.duration(600).delay(750 + i * 60)}
                style={[
                  styles.weeklyBarFill,
                  {
                    height: `${day.pct}%`,
                    backgroundColor: day.color,
                  },
                ]}
              />
            </View>
            <Text style={[styles.weeklyDay, i === 3 && styles.weeklyDayActive]}>{DAYS[i]}</Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
}

// ─── Wellness Tip ────────────────────────────────────────────────────
function WellnessTip() {
  return (
    <Animated.View entering={FadeInDown.duration(500).delay(800)} style={styles.wellnessCard}>
      <View style={styles.wellnessLeft}>
        <View style={styles.wellnessIcon}>
          <Ionicons name="leaf" size={16} color={IGO.fat} />
        </View>
      </View>
      <View style={styles.wellnessRight}>
        <Text style={styles.wellnessSource}>CIMAS HEALTH GROUP</Text>
        <Text style={styles.wellnessTip}>
          Adding leafy greens to your lunch can improve iron absorption by
          <Text style={styles.wellnessBold}> 15%</Text>. Try spinach or kale with your next meal.
        </Text>
      </View>
    </Animated.View>
  );
}

// ─── Quick Actions ───────────────────────────────────────────────────
function QuickActions() {
  return (
    <Animated.View entering={FadeInDown.duration(500).delay(850)}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
      </View>
      <View style={styles.actionsRow}>
        <Pressable style={styles.actionCard}>
          <View style={[styles.actionIcon, { backgroundColor: 'rgba(175,82,222,0.08)' }]}>
            <Ionicons name="water" size={20} color={IGO.protein} />
          </View>
          <Text style={styles.actionLabel}>Log Water</Text>
          <Text style={styles.actionSub}>4 / 8 glasses</Text>
        </Pressable>
        <Pressable style={styles.actionCard}>
          <View style={[styles.actionIcon, { backgroundColor: 'rgba(255,149,0,0.08)' }]}>
            <Ionicons name="fitness" size={20} color={IGO.carbs} />
          </View>
          <Text style={styles.actionLabel}>Activity</Text>
          <Text style={styles.actionSub}>340 kcal burned</Text>
        </Pressable>
        <Pressable style={styles.actionCard}>
          <View style={[styles.actionIcon, { backgroundColor: 'rgba(52,199,89,0.08)' }]}>
            <Ionicons name="heart" size={20} color={IGO.fat} />
          </View>
          <Text style={styles.actionLabel}>Health</Text>
          <Text style={styles.actionSub}>Score: 78</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// Dashboard Screen
// ═══════════════════════════════════════════════════════════════════════
export default function DashboardScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header — breathe, ma (間) */}
      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <View>
          <Text style={styles.headerGreeting}>Good afternoon,</Text>
          <Text style={styles.headerName}>Munyaradzi</Text>
        </View>
        <Pressable style={styles.headerAvatar}>
          <Text style={styles.headerAvatarText}>MR</Text>
        </Pressable>
      </Animated.View>

      {/* Daily Progress */}
      <DailyRing />

      {/* Hero — last meal */}
      <HeroCard />

      {/* Macros Grid — 3 + Scan */}
      <View style={styles.macroGrid}>
        <View style={styles.macroRow}>
          <MacroCard label="Protein" value="42g" pct="35% of goal" progress={65} color={IGO.protein} delay={400} />
          <MacroCard label="Carbs" value="28g" pct="22% of goal" progress={45} color={IGO.carbs} delay={450} />
        </View>
        <View style={styles.macroRow}>
          <MacroCard label="Fat" value="18g" pct="15% of goal" progress={30} color={IGO.fat} delay={500} />
          <ScanCTA />
        </View>
      </View>

      {/* Recent Meals */}
      <RecentMeals />

      {/* Weekly Activity */}
      <WeeklyActivity />

      {/* Quick Actions */}
      <QuickActions />

      {/* Wellness Tip */}
      <WellnessTip />

      {/* Bottom safe area spacer */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// Styles — every pixel intentional
// ═══════════════════════════════════════════════════════════════════════
const CARD_RADIUS = 22;
const SUBTLE_BORDER = 'rgba(0,0,0,0.04)';
const CARD_SHADOW = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.03,
  shadowRadius: 12,
  elevation: 2,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 130,
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: Platform.OS === 'ios' ? 64 : 52,
    paddingBottom: 24,
  },
  headerGreeting: {
    fontSize: 14,
    fontWeight: '500',
    color: IGO.gray600,
    letterSpacing: 0.2,
    marginBottom: 2,
  },
  headerName: {
    fontSize: 28,
    fontWeight: '700',
    color: IGO.black,
    letterSpacing: -0.8,
  },
  headerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: IGO.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatarText: {
    fontSize: 13,
    fontWeight: '700',
    color: IGO.white,
    letterSpacing: 0.5,
  },

  // ── Daily Ring ──
  ringCard: {
    flexDirection: 'row',
    backgroundColor: IGO.white,
    borderRadius: CARD_RADIUS,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: SUBTLE_BORDER,
    ...CARD_SHADOW,
  },
  ringLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  ringContainer: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringTrack: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 7,
    borderColor: IGO.gray200,
    position: 'absolute',
  },
  ringFill: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 7,
    borderColor: IGO.black,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    position: 'absolute',
    transform: [{ rotate: '45deg' }],
  },
  ringCenter: {
    alignItems: 'center',
  },
  ringValue: {
    fontSize: 20,
    fontWeight: '700',
    color: IGO.black,
    letterSpacing: -0.5,
  },
  ringUnit: {
    fontSize: 10,
    fontWeight: '600',
    color: IGO.gray600,
    marginTop: -2,
  },
  ringRight: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
  },
  ringMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ringDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 8,
  },
  ringMetaLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: '400',
    color: IGO.gray600,
  },
  ringMetaValue: {
    fontSize: 15,
    fontWeight: '600',
    color: IGO.black,
    letterSpacing: -0.3,
  },

  // ── Hero Card ──
  heroCard: {
    width: '100%',
    aspectRatio: 1.6,
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    marginBottom: 14,
    ...CARD_SHADOW,
  },
  heroGradientBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F8F8FA',
  },
  gc: {
    position: 'absolute',
    borderRadius: 999,
  },
  heroShimmer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  heroContent: {
    flex: 1,
    padding: 22,
    justifyContent: 'space-between',
    zIndex: 2,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.75)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
  },
  heroBadgeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#34C759',
  },
  heroBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.7)',
    letterSpacing: 0.1,
  },
  heroBottomArea: {},
  heroTimeLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.5)',
    marginBottom: 3,
    letterSpacing: 0.1,
  },
  heroCalories: {
    fontSize: 30,
    fontWeight: '700',
    color: IGO.black,
    letterSpacing: -1,
    marginBottom: 1,
  },
  heroMealName: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.35)',
    letterSpacing: 0.1,
  },
  heroSparkline: {
    position: 'absolute',
    bottom: 22,
    right: 22,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2.5,
    height: 32,
  },
  sparkBar: {
    width: 5,
    borderRadius: 2.5,
  },

  // ── Macro Grid ──
  macroGrid: {
    gap: 10,
    marginBottom: 24,
  },
  macroRow: {
    flexDirection: 'row',
    gap: 10,
  },
  macroCard: {
    flex: 1,
    backgroundColor: IGO.white,
    borderRadius: CARD_RADIUS,
    padding: 16,
    minHeight: 130,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: SUBTLE_BORDER,
    ...CARD_SHADOW,
  },
  macroLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: IGO.gray600,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  macroValue: {
    fontSize: 28,
    fontWeight: '700',
    color: IGO.black,
    letterSpacing: -1,
    marginBottom: 1,
  },
  macroPct: {
    fontSize: 11,
    fontWeight: '500',
    color: IGO.gray600,
    marginBottom: 12,
  },
  macroTrack: {
    height: 5,
    backgroundColor: IGO.gray200,
    borderRadius: 3,
    overflow: 'hidden',
  },
  macroFill: {
    height: '100%',
    borderRadius: 3,
  },

  // ── Scan CTA ──
  scanCta: {
    flex: 1,
    backgroundColor: IGO.black,
    borderRadius: CARD_RADIUS,
    minHeight: 130,
    ...CARD_SHADOW,
    overflow: 'hidden',
  },
  scanCtaInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  scanIconRing: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  scanCtaLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: IGO.white,
    letterSpacing: -0.1,
  },
  scanCtaSub: {
    fontSize: 11,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.45)',
  },

  // ── Section Headers ──
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: IGO.black,
    letterSpacing: -0.3,
  },
  sectionAction: {
    fontSize: 14,
    fontWeight: '500',
    color: IGO.gray600,
  },

  // ── Recent Meals ──
  mealsCard: {
    backgroundColor: IGO.white,
    borderRadius: CARD_RADIUS,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: SUBTLE_BORDER,
    ...CARD_SHADOW,
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  mealEmoji: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: IGO.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  mealEmojiText: {
    fontSize: 20,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 15,
    fontWeight: '500',
    color: IGO.black,
    marginBottom: 2,
    letterSpacing: -0.1,
  },
  mealMeta: {
    fontSize: 12,
    fontWeight: '400',
    color: IGO.gray600,
  },
  mealCalBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  mealCalText: {
    fontSize: 16,
    fontWeight: '600',
    color: IGO.black,
    letterSpacing: -0.3,
  },
  mealCalUnit: {
    fontSize: 11,
    fontWeight: '400',
    color: IGO.gray600,
  },
  mealDivider: {
    height: 1,
    backgroundColor: IGO.gray200,
    marginLeft: 56,
  },

  // ── Weekly Activity ──
  weeklyCard: {
    backgroundColor: IGO.white,
    borderRadius: CARD_RADIUS,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: SUBTLE_BORDER,
    ...CARD_SHADOW,
  },
  weeklyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  weeklyTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: IGO.black,
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  weeklySubtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: IGO.gray600,
  },
  weeklyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,149,0,0.08)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 100,
  },
  weeklyBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: IGO.carbs,
  },
  weeklyBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 90,
  },
  weeklyCol: {
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  weeklyBarTrack: {
    width: 6,
    height: 64,
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
  weeklyDayActive: {
    color: IGO.black,
    fontWeight: '700',
  },

  // ── Quick Actions ──
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  actionCard: {
    flex: 1,
    backgroundColor: IGO.white,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: SUBTLE_BORDER,
    ...CARD_SHADOW,
  },
  actionIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: IGO.black,
    marginBottom: 2,
  },
  actionSub: {
    fontSize: 11,
    fontWeight: '400',
    color: IGO.gray600,
  },

  // ── Wellness Tip ──
  wellnessCard: {
    backgroundColor: IGO.white,
    borderRadius: CARD_RADIUS,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    borderWidth: 1,
    borderColor: SUBTLE_BORDER,
    marginBottom: 14,
    ...CARD_SHADOW,
  },
  wellnessLeft: {},
  wellnessIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(52,199,89,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wellnessRight: {
    flex: 1,
  },
  wellnessSource: {
    fontSize: 10,
    fontWeight: '700',
    color: IGO.gray600,
    letterSpacing: 1.8,
    marginBottom: 5,
  },
  wellnessTip: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(0,0,0,0.65)',
    lineHeight: 20,
    letterSpacing: -0.1,
  },
  wellnessBold: {
    fontWeight: '600',
    color: IGO.black,
  },
});
