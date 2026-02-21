import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import { NutritionAnalysis } from '../types/nutrition';
import { analyzeMeal } from '../services/mockMealService';
import { SCAN_SUGGESTED_MEALS } from '../data/mockMeals';
import { SCAN_HISTORY } from '../data/mockNutrition';

type ScanState = 'idle' | 'loading' | 'result';

// ─── Constants ────────────────────────────────────────────────────────────────

const DAILY_CAL_TARGET = 2000;
const DAILY_MACROS = { protein: 150, carbs: 280, fat: 80 };

const VERDICT_CFG: Record<string, { bgColor: string; label: string; icon: string }> = {
  Excellent: { bgColor: '#003399', label: 'Excellent\nChoice', icon: '🏆' },
  Good: { bgColor: '#1A4D8F', label: 'Good\nChoice', icon: '👍' },
  Fair: { bgColor: '#92400E', label: 'Fair\nChoice', icon: '⚠️' },
  Poor: { bgColor: '#7F1D1D', label: 'Needs\nAttention', icon: '❌' },
};

const GI_CFG: Record<string, { color: string; bg: string }> = {
  Low: { color: '#16A34A', bg: '#DCFCE7' },
  Medium: { color: '#D97706', bg: '#FEF3C7' },
  High: { color: '#DC2626', bg: '#FEE2E2' },
};

const INSIGHT_COLORS = ['#16A34A', '#003399', '#D97706'];
const INSIGHT_ICONS = ['trending-up', 'information-circle', 'warning'] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

const AnimProgressBar = ({
  value,
  total,
  color,
  trackColor = 'rgba(0,0,0,0.08)',
  height = 6,
  delay = 0,
}: {
  value: number;
  total: number;
  color: string;
  trackColor?: string;
  height?: number;
  delay?: number;
}) => {
  const progress = useSharedValue(0);
  const pct = Math.min((value / Math.max(total, 1)) * 100, 100);
  const animStyle = useAnimatedStyle(() => ({ width: `${progress.value}%` as any }));

  useEffect(() => {
    progress.value = withDelay(delay, withTiming(pct, { duration: 900 }));
  }, [pct]);

  return (
    <View
      style={{ height, borderRadius: height / 2, backgroundColor: trackColor, overflow: 'hidden' }}>
      <Animated.View
        style={[animStyle, { height: '100%', borderRadius: height / 2, backgroundColor: color }]}
      />
    </View>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────

const Scan = () => {
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [result, setResult] = useState<NutritionAnalysis | null>(null);

  // §7.5 — reset scan state when navigating away so returning always shows fresh idle
  useFocusEffect(
    useCallback(() => {
      return () => {
        setScanState('idle');
        setResult(null);
      };
    }, [])
  );

  const btnScale = useSharedValue(1);
  const btnAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: btnScale.value }],
  }));

  const handleScan = async () => {
    if (scanState === 'loading') return;
    btnScale.value = withSpring(0.88, { damping: 15, stiffness: 300 });
    setTimeout(() => {
      btnScale.value = withSpring(1, { damping: 15, stiffness: 300 });
    }, 120);
    setScanState('loading');
    try {
      const analysis = await analyzeMeal();
      setResult(analysis);
      setScanState('result');
    } catch {
      setScanState('idle');
    }
  };

  const handleReset = () => {
    setScanState('idle');
    setResult(null);
  };

  const scoreColor = result
    ? result.health_score >= 80
      ? '#16A34A'
      : result.health_score >= 60
        ? '#D97706'
        : '#DC2626'
    : '#003399';

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FC' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}>
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <Animated.View
          entering={FadeInDown.duration(400)}
          style={{ paddingHorizontal: 24, paddingTop: 64, paddingBottom: 4 }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: '800',
              color: '#9CA3AF',
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 6,
            }}>
            SCAN
          </Text>
          <Text
            style={{
              fontSize: 34,
              fontWeight: '900',
              color: '#111827',
              letterSpacing: -1.5,
              lineHeight: 38,
            }}>
            Meal Analysis
          </Text>
        </Animated.View>

        {/* ── Hero Scan Card ──────────────────────────────────────────────── */}
        <Animated.View
          entering={FadeInDown.duration(400).delay(100)}
          style={{ paddingHorizontal: 24, marginTop: 20, marginBottom: 20 }}>
          <View
            style={{
              backgroundColor: '#003399',
              borderRadius: 40,
              padding: 28,
              overflow: 'hidden',
              minHeight: 290,
              justifyContent: 'space-between',
              shadowColor: '#003399',
              shadowOffset: { width: 0, height: 20 },
              shadowOpacity: 0.45,
              shadowRadius: 28,
              elevation: 18,
            }}>
            {/* Glow blobs */}
            <View
              style={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: 100,
                backgroundColor: '#FFD600',
                opacity: 0.15,
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: -40,
                left: -40,
                width: 160,
                height: 160,
                borderRadius: 80,
                backgroundColor: '#0055FF',
                opacity: 0.3,
              }}
            />

            {/* Decorative shapes top-right */}
            <View
              style={{
                position: 'absolute',
                top: 28,
                right: 28,
                width: 68,
                height: 68,
                borderRadius: 34,
                backgroundColor: '#FFD600',
                opacity: 0.95,
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowRadius: 8,
                shadowOffset: { width: 6, height: 6 },
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 76,
                right: 14,
                width: 46,
                height: 46,
                borderRadius: 14,
                backgroundColor: '#0044CC',
                opacity: 0.7,
                transform: [{ rotate: '18deg' }],
              }}
            />

            {/* Text content */}
            <View style={{ zIndex: 10 }}>
              <View
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: 'rgba(255,255,255,0.18)',
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.1)',
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  borderRadius: 999,
                  marginBottom: 18,
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 10,
                    fontWeight: '800',
                    letterSpacing: 1.5,
                  }}>
                  AI POWERED
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 42,
                  fontWeight: '900',
                  color: '#FFFFFF',
                  letterSpacing: -2,
                  lineHeight: 42,
                  marginBottom: 12,
                }}>
                Scan your{'\n'}Meal
              </Text>
              <Text
                style={{
                  color: 'rgba(179, 210, 255, 0.9)',
                  fontSize: 14,
                  fontWeight: '500',
                  lineHeight: 21,
                  maxWidth: '65%',
                }}>
                Point your camera at any food and get instant nutrition insights.
              </Text>
            </View>

            {/* CTA button */}
            <Animated.View style={[btnAnimStyle, { zIndex: 10, marginTop: 28 }]}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={handleScan}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 999,
                  paddingVertical: 15,
                  paddingHorizontal: 24,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  alignSelf: 'flex-start',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.2,
                  shadowRadius: 14,
                  elevation: 8,
                }}>
                {scanState === 'loading' ? (
                  <ActivityIndicator size="small" color="#003399" />
                ) : (
                  <Ionicons name="camera" size={20} color="#003399" />
                )}
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '900',
                    color: '#003399',
                    letterSpacing: -0.3,
                  }}>
                  {scanState === 'loading' ? 'Analysing...' : 'Scan Now'}
                </Text>
                {scanState !== 'loading' && (
                  <View
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      backgroundColor: '#FFD600',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Ionicons name="arrow-forward" size={14} color="#000" />
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>

        {/* ── Loading State ───────────────────────────────────────────────── */}
        {scanState === 'loading' && (
          <Animated.View
            entering={FadeIn.duration(300)}
            style={{ paddingHorizontal: 24, marginBottom: 20 }}>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 28,
                padding: 32,
                borderWidth: 1,
                borderColor: '#EFEFEF',
                alignItems: 'center',
                gap: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 12,
                elevation: 3,
              }}>
              <View
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 24,
                  backgroundColor: '#EEF3FF',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator size="large" color="#003399" />
              </View>
              <View style={{ alignItems: 'center', gap: 6 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '900',
                    color: '#111827',
                    letterSpacing: -0.5,
                  }}>
                  Analyzing meal...
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '500',
                    color: '#9CA3AF',
                    textAlign: 'center',
                    lineHeight: 20,
                  }}>
                  iGo Vision AI is reading your{'\n'}nutritional data
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
                {['#003399', '#FFD600', '#003399'].map((c, i) => (
                  <View
                    key={i}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: c,
                      opacity: 0.65,
                    }}
                  />
                ))}
              </View>
            </View>
          </Animated.View>
        )}

        {/* ── Idle State ──────────────────────────────────────────────── */}
        {scanState === 'idle' && (
          <>
            {/* Empty State Prompt */}
            <Animated.View
              entering={FadeInDown.duration(400).delay(200)}
              style={{ paddingHorizontal: 24, marginBottom: 20 }}>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 28,
                  padding: 36,
                  borderWidth: 1,
                  borderColor: '#EFEFEF',
                  alignItems: 'center',
                  gap: 14,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.04,
                  shadowRadius: 12,
                  elevation: 3,
                }}>
                <View
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: 26,
                    backgroundColor: '#EEF3FF',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Ionicons name="image-outline" size={34} color="#003399" />
                </View>
                <View style={{ alignItems: 'center', gap: 6 }}>
                  <Text
                    style={{
                      fontSize: 21,
                      fontWeight: '900',
                      color: '#111827',
                      letterSpacing: -0.5,
                    }}>
                    Scan your meal
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '500',
                      color: '#9CA3AF',
                      textAlign: 'center',
                      lineHeight: 20,
                    }}>
                    iGo Vision AI identifies ingredients,{'\n'}macros and gives personalised
                    insights.
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                    marginTop: 4,
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}>
                  {['Instant results', 'AI-powered', '4 mock meals'].map((chip) => (
                    <View
                      key={chip}
                      style={{
                        backgroundColor: '#F4F5F7',
                        paddingHorizontal: 14,
                        paddingVertical: 7,
                        borderRadius: 999,
                      }}>
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '700',
                          color: '#6B7280',
                          letterSpacing: 0.2,
                        }}>
                        {chip}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </Animated.View>

            {/* Recent Scans Rail */}
            <Animated.View
              entering={FadeInDown.duration(400).delay(300)}
              style={{ marginBottom: 28 }}>
              <View
                style={{
                  paddingHorizontal: 24,
                  marginBottom: 14,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: '800',
                      color: '#9CA3AF',
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      marginBottom: 4,
                    }}>
                    HISTORY
                  </Text>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: '900',
                      color: '#111827',
                      letterSpacing: -0.8,
                    }}>
                    Recent Scans
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: '#003399' }}>See all</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24, gap: 14, paddingVertical: 4 }}>
                {SCAN_HISTORY.map((item, index) => {
                  const scoreColor =
                    item.health_score >= 80
                      ? '#16A34A'
                      : item.health_score >= 60
                        ? '#D97706'
                        : '#DC2626';
                  return (
                    <Animated.View
                      key={item.id}
                      entering={FadeInDown.delay(340 + index * 60).duration(400)}>
                      <TouchableOpacity
                        activeOpacity={0.88}
                        style={{
                          width: 180,
                          height: 120,
                          borderRadius: 24,
                          overflow: 'hidden',
                          backgroundColor: '#1A1A1A',
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 8 },
                          shadowOpacity: 0.2,
                          shadowRadius: 14,
                          elevation: 8,
                        }}>
                        <Image
                          source={{ uri: item.image_url }}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            opacity: 0.55,
                          }}
                          contentFit="cover"
                        />
                        <LinearGradient
                          colors={['transparent', 'rgba(0,0,0,0.78)']}
                          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 70 }}
                        />
                        {/* Health score badge top-right */}
                        <View
                          style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            backgroundColor: scoreColor,
                            borderRadius: 10,
                            paddingHorizontal: 8,
                            paddingVertical: 3,
                          }}>
                          <Text style={{ fontSize: 11, fontWeight: '900', color: '#fff' }}>
                            {item.health_score}
                          </Text>
                        </View>
                        {/* Meal type top-left */}
                        <View
                          style={{
                            position: 'absolute',
                            top: 10,
                            left: 10,
                            backgroundColor: 'rgba(255,255,255,0.18)',
                            borderRadius: 8,
                            paddingHorizontal: 8,
                            paddingVertical: 3,
                          }}>
                          <Text
                            style={{
                              fontSize: 9,
                              fontWeight: '800',
                              color: '#fff',
                              letterSpacing: 0.5,
                            }}>
                            {item.meal_type.toUpperCase()}
                          </Text>
                        </View>
                        {/* Bottom info */}
                        <View
                          style={{ position: 'absolute', bottom: 10, left: 12, right: 12, gap: 2 }}>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: '900',
                              color: '#fff',
                              letterSpacing: -0.3,
                            }}
                            numberOfLines={1}>
                            {item.meal_name}
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: '600',
                              color: 'rgba(255,255,255,0.6)',
                            }}>
                            {item.scanned_at} · {item.calories} kcal
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </Animated.View>
                  );
                })}
              </ScrollView>
            </Animated.View>
          </>
        )}

        {/* ── Result State ────────────────────────────────────────────────── */}
        {scanState === 'result' && result && (
          <>
            {/* ① Results header + re-scan */}
            <Animated.View
              entering={FadeInDown.duration(400).delay(60)}
              style={{
                paddingHorizontal: 24,
                marginBottom: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text style={{ fontSize: 9, fontWeight: '800', color: '#9CA3AF', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>
                  AI ANALYSIS COMPLETE
                </Text>
                <Text style={{ fontSize: 24, fontWeight: '900', color: '#111827', letterSpacing: -1 }}>
                  Your Results
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleReset}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                  backgroundColor: '#F4F5F7',
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 999,
                }}>
                <Ionicons name="refresh" size={14} color="#6B7280" />
                <Text style={{ fontSize: 12, fontWeight: '700', color: '#6B7280' }}>Re-scan</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* ② Food Photo Card */}
            <Animated.View
              entering={FadeInDown.duration(500).delay(100)}
              style={{ paddingHorizontal: 24, marginBottom: 14 }}>
              <View style={{ height: 230, borderRadius: 32, overflow: 'hidden', backgroundColor: '#1A1A1A' }}>
                {result.image_url && (
                  <Image
                    source={{ uri: result.image_url }}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.72 }}
                    contentFit="cover"
                  />
                )}
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.82)']}
                  style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 130 }}
                />
                {/* Top: badges */}
                <View style={{ position: 'absolute', top: 16, left: 16, right: 16, flexDirection: 'row', gap: 8 }}>
                  {result.meal_type && (
                    <View style={{ backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 }}>
                      <Text style={{ fontSize: 10, fontWeight: '800', color: '#fff', letterSpacing: 0.5 }}>
                        {result.meal_type.toUpperCase()}
                      </Text>
                    </View>
                  )}
                  {result.ai_confidence && (
                    <View style={{ backgroundColor: '#FFD600', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <Ionicons name="sparkles" size={10} color="#000" />
                      <Text style={{ fontSize: 10, fontWeight: '900', color: '#000', letterSpacing: 0.3 }}>
                        {result.ai_confidence}% MATCH
                      </Text>
                    </View>
                  )}
                </View>
                {/* Health Score circle top-right */}
                <View
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: scoreColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: scoreColor,
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.5,
                    shadowRadius: 10,
                    elevation: 8,
                  }}>
                  <Text style={{ fontSize: 20, fontWeight: '900', color: '#fff', letterSpacing: -0.5 }}>
                    {result.health_score}
                  </Text>
                  <Text style={{ fontSize: 7, fontWeight: '800', color: 'rgba(255,255,255,0.7)', letterSpacing: 0.5 }}>
                    SCORE
                  </Text>
                </View>
                {/* Bottom: meal name */}
                <View style={{ position: 'absolute', bottom: 18, left: 20, right: 72 }}>
                  <Text
                    style={{ fontSize: 26, fontWeight: '900', color: '#fff', letterSpacing: -0.8, lineHeight: 30 }}
                    numberOfLines={2}>
                    {result.meal_name}
                  </Text>
                  {result.scanned_at && (
                    <Text style={{ fontSize: 11, fontWeight: '600', color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>
                      Scanned at {result.scanned_at} today
                    </Text>
                  )}
                </View>
              </View>
            </Animated.View>

            {/* ③ Calorie Progress Card */}
            <Animated.View
              entering={FadeInDown.duration(500).delay(160)}
              style={{ paddingHorizontal: 24, marginBottom: 14 }}>
              <View
                style={{
                  backgroundColor: '#111111',
                  borderRadius: 28,
                  padding: 22,
                  gap: 14,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.2,
                  shadowRadius: 18,
                  elevation: 10,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <View style={{ width: 40, height: 40, borderRadius: 14, backgroundColor: 'rgba(255,214,0,0.15)', alignItems: 'center', justifyContent: 'center' }}>
                      <Ionicons name="flame" size={20} color="#FFD600" />
                    </View>
                    <View>
                      <Text style={{ fontSize: 12, fontWeight: '700', color: 'rgba(255,255,255,0.45)', letterSpacing: 0.2 }}>
                        THIS MEAL
                      </Text>
                      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 3, marginTop: 1 }}>
                        <Text style={{ fontSize: 32, fontWeight: '900', color: '#fff', letterSpacing: -1.2 }}>
                          {result.calories}
                        </Text>
                        <Text style={{ fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.4)' }}>
                          kcal
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ alignItems: 'flex-end', gap: 4 }}>
                    <Text style={{ fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.4)' }}>
                      DAILY GOAL
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: '900', color: 'rgba(255,255,255,0.7)', letterSpacing: -0.5 }}>
                      {DAILY_CAL_TARGET} kcal
                    </Text>
                    <View style={{ backgroundColor: 'rgba(52,199,89,0.2)', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 }}>
                      <Text style={{ fontSize: 10, fontWeight: '800', color: '#34C759' }}>
                        {DAILY_CAL_TARGET - result.calories} remaining
                      </Text>
                    </View>
                  </View>
                </View>
                <AnimProgressBar
                  value={result.calories}
                  total={DAILY_CAL_TARGET}
                  color={result.calories / DAILY_CAL_TARGET > 0.9 ? '#EF4444' : result.calories / DAILY_CAL_TARGET > 0.7 ? '#F59E0B' : '#34C759'}
                  trackColor="rgba(255,255,255,0.1)"
                  height={8}
                  delay={200}
                />
                <Text style={{ fontSize: 11, fontWeight: '600', color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
                  {Math.round((result.calories / DAILY_CAL_TARGET) * 100)}% of your daily target
                </Text>
              </View>
            </Animated.View>

            {/* ④ Macro Breakdown */}
            <Animated.View
              entering={FadeInDown.duration(500).delay(220)}
              style={{ paddingHorizontal: 24, marginBottom: 14 }}>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                {[
                  { label: 'Protein', value: result.protein, target: DAILY_MACROS.protein, color: '#AF52DE', bg: '#F7EEFF', track: '#EDD9FF' },
                  { label: 'Carbs', value: result.carbs, target: DAILY_MACROS.carbs, color: '#FF9500', bg: '#FFF5E5', track: '#FFE5B4' },
                  { label: 'Fat', value: result.fat, target: DAILY_MACROS.fat, color: '#34C759', bg: '#EDFAF1', track: '#C6F0D4' },
                ].map((m, i) => (
                  <View
                    key={m.label}
                    style={{
                      flex: 1,
                      backgroundColor: m.bg,
                      borderRadius: 22,
                      padding: 16,
                      gap: 8,
                      shadowColor: m.color,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.12,
                      shadowRadius: 10,
                      elevation: 4,
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
                      <Text style={{ fontSize: 24, fontWeight: '900', color: m.color, letterSpacing: -0.8 }}>
                        {m.value}
                      </Text>
                      <Text style={{ fontSize: 11, fontWeight: '700', color: m.color, opacity: 0.7 }}>g</Text>
                    </View>
                    <AnimProgressBar value={m.value} total={m.target} color={m.color} trackColor={m.track} height={5} delay={300 + i * 100} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 9, fontWeight: '800', color: m.color, opacity: 0.65, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        {m.label}
                      </Text>
                      <Text style={{ fontSize: 9, fontWeight: '700', color: m.color, opacity: 0.5 }}>
                        /{m.target}g
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </Animated.View>

            {/* ⑤ Nutrient Intel */}
            <Animated.View
              entering={FadeInDown.duration(500).delay(280)}
              style={{ paddingHorizontal: 24, marginBottom: 14 }}>
              <View
                style={{
                  backgroundColor: '#111111',
                  borderRadius: 28,
                  padding: 22,
                  gap: 16,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.2,
                  shadowRadius: 16,
                  elevation: 8,
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, fontWeight: '900', color: '#fff', letterSpacing: -0.4 }}>
                    Nutrient Intel
                  </Text>
                  <View style={{ backgroundColor: 'rgba(255,214,0,0.15)', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Ionicons name="sparkles" size={10} color="#FFD600" />
                    <Text style={{ fontSize: 9, fontWeight: '800', color: '#FFD600', letterSpacing: 0.5 }}>
                      AI ANALYSED
                    </Text>
                  </View>
                </View>
                {/* 2×2 grid */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                  {[
                    { icon: 'leaf', label: 'Fiber', value: result.fiber ?? '—', unit: 'g', color: '#34C759' },
                    { icon: 'water', label: 'Sugar', value: result.sugar ?? '—', unit: 'g', color: '#FF9500' },
                    { icon: 'flash', label: 'Sodium', value: result.sodium ?? '—', unit: 'mg', color: '#60A5FA' },
                    { icon: 'ellipse', label: 'Sat Fat', value: result.sat_fat ?? '—', unit: 'g', color: '#F472B6' },
                  ].map((n) => (
                    <View
                      key={n.label}
                      style={{
                        width: '47%',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        borderRadius: 18,
                        padding: 14,
                        gap: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: `${n.color}22`, alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons name={n.icon as any} size={16} color={n.color} />
                      </View>
                      <View>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
                          <Text style={{ fontSize: 18, fontWeight: '900', color: '#fff', letterSpacing: -0.5 }}>
                            {n.value}
                          </Text>
                          <Text style={{ fontSize: 10, fontWeight: '600', color: 'rgba(255,255,255,0.4)' }}>
                            {n.unit}
                          </Text>
                        </View>
                        <Text style={{ fontSize: 10, fontWeight: '600', color: 'rgba(255,255,255,0.45)', marginTop: 1 }}>
                          {n.label}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
                {/* Tags row */}
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  {result.glycemic_index && (
                    <View
                      style={{
                        backgroundColor: GI_CFG[result.glycemic_index]?.bg ?? '#F3F4F6',
                        borderRadius: 10,
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                      }}>
                      <Ionicons name="stats-chart" size={11} color={GI_CFG[result.glycemic_index]?.color ?? '#6B7280'} />
                      <Text style={{ fontSize: 10, fontWeight: '800', color: GI_CFG[result.glycemic_index]?.color ?? '#6B7280' }}>
                        {GI_CFG[result.glycemic_index]?.label ?? result.glycemic_index} GI
                      </Text>
                    </View>
                  )}
                  {result.meal_type && (
                    <View style={{ backgroundColor: 'rgba(0,51,153,0.25)', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 }}>
                      <Text style={{ fontSize: 10, fontWeight: '800', color: '#60A5FA' }}>
                        {result.meal_type}
                      </Text>
                    </View>
                  )}
                  <View style={{ flex: 1 }} />
                  {result.ai_confidence && (
                    <View style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 }}>
                      <Text style={{ fontSize: 10, fontWeight: '700', color: 'rgba(255,255,255,0.5)' }}>
                        {result.ai_confidence}% confidence
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </Animated.View>

            {/* ⑥ Detected Ingredients */}
            {result.ingredients && result.ingredients.length > 0 && (
              <Animated.View
                entering={FadeInDown.duration(500).delay(340)}
                style={{ paddingHorizontal: 24, marginBottom: 14 }}>
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 28,
                    padding: 22,
                    borderWidth: 1.5,
                    borderColor: '#D4E4FF',
                    gap: 14,
                    shadowColor: '#003399',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.07,
                    shadowRadius: 12,
                    elevation: 3,
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <View style={{ width: 34, height: 34, borderRadius: 11, backgroundColor: '#EEF3FF', alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons name="search" size={16} color="#003399" />
                      </View>
                      <Text style={{ fontSize: 15, fontWeight: '900', color: '#111827', letterSpacing: -0.3 }}>
                        Ingredients
                      </Text>
                    </View>
                    <View style={{ backgroundColor: '#EEF3FF', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 }}>
                      <Text style={{ fontSize: 10, fontWeight: '800', color: '#003399' }}>
                        {result.ingredients.length} detected
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                    {result.ingredients.map((ing, i) => {
                      const chipColors = [
                        { bg: '#EEF3FF', color: '#003399' },
                        { bg: '#FFFDE7', color: '#8B6F00' },
                        { bg: '#F7EEFF', color: '#7E22CE' },
                        { bg: '#EDFAF1', color: '#166534' },
                        { bg: '#FFF5E5', color: '#9A3412' },
                        { bg: '#FEE2E2', color: '#991B1B' },
                        { bg: '#E0F2FE', color: '#075985' },
                        { bg: '#F0FDF4', color: '#14532D' },
                      ];
                      const c = chipColors[i % chipColors.length];
                      return (
                        <View
                          key={ing}
                          style={{
                            backgroundColor: c.bg,
                            borderRadius: 999,
                            paddingHorizontal: 13,
                            paddingVertical: 7,
                          }}>
                          <Text style={{ fontSize: 12, fontWeight: '700', color: c.color }}>
                            {ing}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </Animated.View>
            )}

            {/* ⑦ AI Personalized Insights */}
            {result.ai_insights && result.ai_insights.length > 0 && (
              <Animated.View
                entering={FadeInDown.duration(500).delay(400)}
                style={{ paddingHorizontal: 24, marginBottom: 14 }}>
                <View style={{ marginBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={{ fontSize: 18, fontWeight: '900', color: '#111827', letterSpacing: -0.5 }}>
                    AI Insights
                  </Text>
                  <View style={{ backgroundColor: '#EEF3FF', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 }}>
                    <Text style={{ fontSize: 9, fontWeight: '800', color: '#003399', letterSpacing: 0.5 }}>
                      PERSONALISED
                    </Text>
                  </View>
                </View>
                <View style={{ gap: 10 }}>
                  {result.ai_insights.map((insight, i) => {
                    const col = INSIGHT_COLORS[i % INSIGHT_COLORS.length];
                    const ico = INSIGHT_ICONS[i % INSIGHT_ICONS.length];
                    return (
                      <View
                        key={i}
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: 20,
                          padding: 16,
                          flexDirection: 'row',
                          gap: 12,
                          alignItems: 'flex-start',
                          borderWidth: 1,
                          borderColor: '#F1F5F9',
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.04,
                          shadowRadius: 8,
                          elevation: 2,
                        }}>
                        {/* Colored left bar */}
                        <View style={{ width: 3, alignSelf: 'stretch', borderRadius: 2, backgroundColor: col, flexShrink: 0 }} />
                        <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: `${col}1A`, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Ionicons name={ico} size={18} color={col} />
                        </View>
                        <Text style={{ flex: 1, fontSize: 13, fontWeight: '500', color: '#374151', lineHeight: 20 }}>
                          {insight}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </Animated.View>
            )}

            {/* ⑧ iGo Verdict Card */}
            {result.verdict && (
              <Animated.View
                entering={FadeInDown.duration(500).delay(460)}
                style={{ paddingHorizontal: 24, marginBottom: 14 }}>
                <View
                  style={{
                    backgroundColor: VERDICT_CFG[result.verdict]?.bgColor ?? '#003399',
                    borderRadius: 32,
                    padding: 28,
                    overflow: 'hidden',
                    shadowColor: '#003399',
                    shadowOffset: { width: 0, height: 16 },
                    shadowOpacity: 0.4,
                    shadowRadius: 24,
                    elevation: 14,
                  }}>
                  {/* Decorative blobs */}
                  <View style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: 80, backgroundColor: '#FFD600', opacity: 0.12 }} />
                  <View style={{ position: 'absolute', bottom: -30, left: -30, width: 120, height: 120, borderRadius: 60, backgroundColor: '#FFFFFF', opacity: 0.06 }} />
                  {/* Decorative shapes */}
                  <View style={{ position: 'absolute', top: 20, right: 20, width: 52, height: 52, borderRadius: 26, backgroundColor: '#FFD600', opacity: 0.9 }} />
                  <View style={{ position: 'absolute', top: 56, right: 8, width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.12)', transform: [{ rotate: '18deg' }] }} />
                  <View style={{ gap: 12, zIndex: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <View style={{ backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Ionicons name="leaf" size={10} color="#FFFFFF" />
                        <Text style={{ fontSize: 9, fontWeight: '900', color: '#FFFFFF', letterSpacing: 1.2, textTransform: 'uppercase' }}>
                          iGo Verdict
                        </Text>
                      </View>
                      {result.ai_confidence && (
                        <View style={{ backgroundColor: 'rgba(255,214,0,0.22)', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 5 }}>
                          <Text style={{ fontSize: 9, fontWeight: '800', color: '#FFD600', letterSpacing: 0.5 }}>
                            {result.ai_confidence}% AI
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text style={{ fontSize: 38, fontWeight: '900', color: '#FFFFFF', letterSpacing: -1.5, lineHeight: 40 }}>
                      {VERDICT_CFG[result.verdict]?.label ?? result.verdict}
                    </Text>
                    <View style={{ width: '70%', height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.12)', overflow: 'hidden', marginTop: 4 }}>
                      <View style={{ width: `${result.health_score}%`, height: '100%', borderRadius: 2, backgroundColor: '#FFD600' }} />
                    </View>
                    <Text style={{ fontSize: 11, fontWeight: '600', color: 'rgba(255,255,255,0.5)', marginTop: -4 }}>
                      Health score: {result.health_score}/100
                    </Text>
                    {result.igo_tip && (
                      <View style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 18, padding: 14, marginTop: 4 }}>
                        <Text style={{ fontSize: 13, fontWeight: '500', color: 'rgba(255,255,255,0.85)', lineHeight: 20 }}>
                          {result.igo_tip}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </Animated.View>
            )}

            {/* ⑨ Follow-up Meals */}
            <Animated.View entering={FadeInDown.duration(500).delay(520)}>
              <View
                style={{
                  paddingHorizontal: 24,
                  marginBottom: 16,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                <View>
                  <Text style={{ fontSize: 9, fontWeight: '800', color: '#9CA3AF', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>
                    AI RECOMMENDED
                  </Text>
                  <Text style={{ fontSize: 22, fontWeight: '900', color: '#111827', letterSpacing: -0.8 }}>
                    Follow-up Meals
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: '#003399' }}>See all</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24, gap: 14, paddingVertical: 4 }}>
                {SCAN_SUGGESTED_MEALS.map((meal, index) => (
                  <Animated.View
                    key={meal.id}
                    entering={FadeInDown.delay(560 + index * 80).duration(400)}>
                    <TouchableOpacity
                      activeOpacity={0.88}
                      style={{
                        width: 200,
                        height: 240,
                        borderRadius: 28,
                        overflow: 'hidden',
                        backgroundColor: '#1A1A1A',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 10 },
                        shadowOpacity: 0.28,
                        shadowRadius: 18,
                        elevation: 10,
                      }}>
                      <Image
                        source={{ uri: meal.image }}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.55 }}
                        contentFit="cover"
                      />
                      <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120 }}
                      />
                      <View style={{ position: 'absolute', top: 14, left: 14, width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFD600' }} />
                      <View style={{ position: 'absolute', bottom: 16, left: 16, right: 16, gap: 8 }}>
                        <Text style={{ fontSize: 17, fontWeight: '900', color: '#FFFFFF', letterSpacing: -0.5 }}>
                          {meal.title}
                        </Text>
                        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                          <View style={{ backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 }}>
                            <Text style={{ fontSize: 11, fontWeight: '800', color: '#FFFFFF' }}>
                              {meal.kcal} kcal
                            </Text>
                          </View>
                          <View style={{ backgroundColor: 'rgba(0,51,153,0.55)', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 }}>
                            <Text style={{ fontSize: 11, fontWeight: '700', color: '#FFFFFF' }}>
                              {meal.tag}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Animated.View>
                ))}
              </ScrollView>
            </Animated.View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Scan;
