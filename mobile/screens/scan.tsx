import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { IGO } from '@/constants/theme';

const BORDER = 'rgba(0,0,0,0.04)';
const LIGHT_CARD_SHADOW = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.08,
  shadowRadius: 22,
  elevation: 7,
};

export default function ScanScreen() {
  const [hasScanned, setHasScanned] = useState(false);

  const handleMockScan = () => {
    setHasScanned(true);
  };

  return (
    <ScrollView
      style={s.screen}
      contentContainerStyle={s.content}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeInDown.duration(400)} style={s.header}>
        <Text style={s.headerLabel}>SCAN</Text>
        <Text style={s.headerTitle}>Meal analysis</Text>
      </Animated.View>

      {/* Hero scan card */}
      <Animated.View entering={FadeInDown.duration(520).delay(80)} style={s.heroCard}>
        <View style={s.heroGlowTop} />
        <View style={s.heroGlowBottom} />

        <View style={s.heroInner}>
          <View style={s.heroPill}>
            <Text style={s.heroPillText}>TEST RUN</Text>
          </View>
          <Text style={s.heroTitle}>
            Try a mock{'\n'}
            iGo scan
          </Text>
          <Text style={s.heroSubtitle}>
            We&apos;ll show you an example of how iGo breaks down a typical Cimas‑friendly meal.
          </Text>

          <Pressable style={s.heroButton} onPress={handleMockScan}>
            <Ionicons name="camera" size={18} color="#111827" />
            <Text style={s.heroButtonText}>
              {hasScanned ? 'Run again' : 'Run test scan'}
            </Text>
          </Pressable>
        </View>
      </Animated.View>

      {/* Mock result summary */}
      {hasScanned ? (
        <Animated.View entering={FadeInDown.duration(520).delay(160)} style={s.resultCard}>
          <View style={s.resultHeaderRow}>
            <View>
              <Text style={s.resultLabel}>Latest mock result</Text>
              <Text style={s.resultTitle}>Grilled Salmon Power Bowl</Text>
            </View>
            <View style={s.scorePill}>
              <Text style={s.scoreLabel}>Score</Text>
              <Text style={s.scoreValue}>82</Text>
            </View>
          </View>

          <View style={s.macroRow}>
            <View style={s.macroChip}>
              <Text style={[s.macroLabel, { color: IGO.protein }]}>Protein</Text>
              <Text style={s.macroValue}>34g</Text>
            </View>
            <View style={s.macroChip}>
              <Text style={[s.macroLabel, { color: IGO.carbs }]}>Carbs</Text>
              <Text style={s.macroValue}>52g</Text>
            </View>
            <View style={s.macroChip}>
              <Text style={[s.macroLabel, { color: IGO.fat }]}>Fat</Text>
              <Text style={s.macroValue}>18g</Text>
            </View>
          </View>

          <View style={s.tipCard}>
            <View style={s.tipIcon}>
              <Ionicons name="leaf" size={14} color={IGO.fat} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.tipTitle}>iGo tip</Text>
              <Text style={s.tipBody}>
                Add a handful of leafy greens or a side salad to push this meal closer to an{' '}
                <Text style={s.tipBodyBold}>85+</Text> health score.
              </Text>
            </View>
          </View>
        </Animated.View>
      ) : (
        <Animated.View entering={FadeInDown.duration(520).delay(140)} style={s.emptyCard}>
          <Ionicons name="image-outline" size={22} color={IGO.gray400} />
          <Text style={s.emptyTitle}>No scans yet</Text>
          <Text style={s.emptyBody}>
            Use the test button above to see how your future meal scans will look.
          </Text>
        </Animated.View>
      )}

      {/* Suggested meals rail */}
      {hasScanned && (
        <Animated.View entering={FadeInDown.duration(560).delay(240)}>
          <View style={s.suggestHeaderRow}>
            <Text style={s.suggestTitle}>Suggested follow‑up</Text>
            <Text style={s.suggestHint}>Keep the streak feeling good</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.suggestScroll}
          >
            <View style={s.suggestCard}>
              <View style={[s.suggestDot, { backgroundColor: '#22C55E' }]} />
              <Text style={s.suggestMealTitle}>Light evening dish</Text>
              <Text style={s.suggestMealSubtitle}>
                Baked fish, citrus salad, olive oil drizzle.
              </Text>
            </View>
            <View style={s.suggestCard}>
              <View style={[s.suggestDot, { backgroundColor: '#3B82F6' }]} />
              <Text style={s.suggestMealTitle}>Hydration focus</Text>
              <Text style={s.suggestMealSubtitle}>
                Pair with 2 glasses of water over the next hour.
              </Text>
            </View>
          </ScrollView>
        </Animated.View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
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
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: IGO.black,
    letterSpacing: -0.8,
    fontFamily: 'PlusJakartaSans',
  },

  heroCard: {
    borderRadius: 36,
    backgroundColor: '#FFFBF8',
    overflow: 'hidden',
    marginBottom: 18,
    ...LIGHT_CARD_SHADOW,
  },
  heroGlowTop: {
    position: 'absolute',
    top: -40,
    right: -30,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FFE4B5', // soft, warm highlight
    opacity: 0.55,
  },
  heroGlowBottom: {
    position: 'absolute',
    bottom: -40,
    left: -20,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#C7EFD6', // gentle green hint
    opacity: 0.45,
  },
  heroInner: {
    padding: 20,
    gap: 10,
  },
  heroPill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  heroPillText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
    color: '#6B7280',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.8,
    fontFamily: 'PlusJakartaSans',
  },
  heroSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    lineHeight: 18,
  },
  heroButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 999,
    backgroundColor: '#4CAF50',
  },
  heroButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  emptyCard: {
    marginTop: 4,
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...LIGHT_CARD_SHADOW,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  emptyBody: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },

  resultCard: {
    marginTop: 4,
    padding: 18,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: BORDER,
    gap: 14,
    ...LIGHT_CARD_SHADOW,
  },
  resultHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 1,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111827',
    letterSpacing: -0.6,
    fontFamily: 'PlusJakartaSans',
  },
  scorePill: {
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#ECFDF3',
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#166534',
    letterSpacing: 0.8,
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#166534',
  },

  macroRow: {
    flexDirection: 'row',
    gap: 10,
  },
  macroChip: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: '#F9FAFB',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  macroLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2,
  },
  macroValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },

  tipCard: {
    marginTop: 4,
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#ECFDF3',
  },
  tipIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(22,163,74,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#166534',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  tipBody: {
    fontSize: 12,
    fontWeight: '500',
    color: '#14532D',
    lineHeight: 18,
  },
  tipBodyBold: {
    fontWeight: '700',
  },

  suggestHeaderRow: {
    marginTop: 18,
    marginBottom: 6,
  },
  suggestTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.3,
    fontFamily: 'PlusJakartaSans',
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
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    padding: 14,
    marginRight: 10,
    borderWidth: 1,
    borderColor: BORDER,
    ...LIGHT_CARD_SHADOW,
  },
  suggestDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  suggestMealTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.2,
    marginBottom: 4,
  },
  suggestMealSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    lineHeight: 17,
  },
});


