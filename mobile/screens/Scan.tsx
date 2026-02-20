import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Animated, {
  FadeInDown,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { NutritionAnalysis } from '../types/nutrition';

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_RESULT: NutritionAnalysis = {
  meal_name: 'Grilled Chicken Salad',
  calories: 480,
  protein: 42,
  carbs: 28,
  fat: 18,
  health_score: 87,
  igo_tip:
    'Great choice! This meal is rich in lean protein which supports muscle recovery. Pair it with a glass of water to stay on track with your Cimas iGo hydration goal.',
};

const SUGGESTED_MEALS = [
  {
    id: '1',
    title: 'Avocado Rice Bowl',
    kcal: 520,
    tag: 'Balanced',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&fit=crop',
  },
  {
    id: '2',
    title: 'Grilled Salmon',
    kcal: 460,
    tag: 'High Protein',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=400&fit=crop',
  },
  {
    id: '3',
    title: 'Lentil Power Soup',
    kcal: 310,
    tag: 'Low Cal',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=400&fit=crop',
  },
];

type ScanState = 'idle' | 'loading' | 'result';

// ─── Component ────────────────────────────────────────────────────────────────

const Scan = () => {
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [result, setResult] = useState<NutritionAnalysis | null>(null);

  const btnScale = useSharedValue(1);
  const btnAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: btnScale.value }],
  }));

  const handleScan = () => {
    if (scanState === 'loading') return;
    btnScale.value = withSpring(0.88, { damping: 15, stiffness: 300 });
    setTimeout(() => {
      btnScale.value = withSpring(1, { damping: 15, stiffness: 300 });
    }, 120);
    setScanState('loading');
    // Simulate AI API call
    setTimeout(() => {
      setResult(MOCK_RESULT);
      setScanState('result');
    }, 2400);
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

        {/* ── Empty State ─────────────────────────────────────────────────── */}
        {scanState === 'idle' && (
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
                  No scans yet
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '500',
                    color: '#9CA3AF',
                    textAlign: 'center',
                    lineHeight: 20,
                  }}>
                  Tap "Scan Now" to analyze your meal{'\n'}with iGo Vision AI
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
                {['Instant results', 'AI-powered', 'Cimas iGo'].map((chip) => (
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
        )}

        {/* ── Result State ────────────────────────────────────────────────── */}
        {scanState === 'result' && result && (
          <>
            {/* Results header + re-scan */}
            <Animated.View
              entering={FadeInDown.duration(400).delay(60)}
              style={{
                paddingHorizontal: 24,
                marginBottom: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '900',
                  color: '#111827',
                  letterSpacing: -1,
                }}>
                Your Results
              </Text>
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

            {/* Main result card */}
            <Animated.View
              entering={FadeInDown.duration(500).delay(120)}
              style={{ paddingHorizontal: 24, marginBottom: 14 }}>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 32,
                  padding: 24,
                  borderWidth: 1,
                  borderColor: '#EFEFEF',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.07,
                  shadowRadius: 18,
                  elevation: 5,
                  gap: 18,
                }}>
                {/* Meal name + health score badge */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 9,
                        fontWeight: '800',
                        color: '#9CA3AF',
                        letterSpacing: 1.5,
                        textTransform: 'uppercase',
                        marginBottom: 6,
                      }}>
                      MEAL IDENTIFIED
                    </Text>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: '900',
                        color: '#111827',
                        letterSpacing: -0.8,
                        lineHeight: 26,
                      }}>
                      {result.meal_name}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: scoreColor,
                      borderRadius: 20,
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      alignItems: 'center',
                      minWidth: 68,
                      flexShrink: 0,
                      shadowColor: scoreColor,
                      shadowOffset: { width: 0, height: 8 },
                      shadowOpacity: 0.4,
                      shadowRadius: 12,
                      elevation: 8,
                    }}>
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: '900',
                        color: '#FFFFFF',
                        letterSpacing: -1,
                      }}>
                      {result.health_score}
                    </Text>
                    <Text
                      style={{
                        fontSize: 8,
                        fontWeight: '800',
                        color: 'rgba(255,255,255,0.7)',
                        letterSpacing: 0.8,
                        textTransform: 'uppercase',
                        marginTop: 1,
                      }}>
                      SCORE
                    </Text>
                  </View>
                </View>

                {/* Calories strip */}
                <View
                  style={{
                    backgroundColor: '#111111',
                    borderRadius: 22,
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <View
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 13,
                        backgroundColor: 'rgba(255,214,0,0.15)',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Ionicons name="flame" size={18} color="#FFD600" />
                    </View>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '700',
                        color: 'rgba(255,255,255,0.55)',
                        letterSpacing: 0.2,
                      }}>
                      Total Calories
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'baseline',
                      gap: 4,
                    }}>
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: '900',
                        color: '#FFFFFF',
                        letterSpacing: -1.2,
                      }}>
                      {result.calories}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '700',
                        color: 'rgba(255,255,255,0.45)',
                      }}>
                      kcal
                    </Text>
                  </View>
                </View>

                {/* Macro chips */}
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  {[
                    {
                      label: 'Protein',
                      value: result.protein,
                      color: '#AF52DE',
                      bg: '#F7EEFF',
                    },
                    {
                      label: 'Carbs',
                      value: result.carbs,
                      color: '#FF9500',
                      bg: '#FFF5E5',
                    },
                    {
                      label: 'Fat',
                      value: result.fat,
                      color: '#34C759',
                      bg: '#EDFAF1',
                    },
                  ].map((m) => (
                    <View
                      key={m.label}
                      style={{
                        flex: 1,
                        backgroundColor: m.bg,
                        borderRadius: 20,
                        paddingVertical: 16,
                        alignItems: 'center',
                        gap: 4,
                      }}>
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: '900',
                          color: m.color,
                          letterSpacing: -0.8,
                        }}>
                        {m.value}g
                      </Text>
                      <Text
                        style={{
                          fontSize: 9,
                          fontWeight: '800',
                          color: m.color,
                          opacity: 0.65,
                          textTransform: 'uppercase',
                          letterSpacing: 0.6,
                        }}>
                        {m.label}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </Animated.View>

            {/* iGo Tip card */}
            <Animated.View
              entering={FadeInDown.duration(500).delay(200)}
              style={{ paddingHorizontal: 24, marginBottom: 28 }}>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 28,
                  padding: 20,
                  borderWidth: 1.5,
                  borderColor: '#D4E4FF',
                  shadowColor: '#003399',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.08,
                  shadowRadius: 12,
                  elevation: 3,
                  flexDirection: 'row',
                  gap: 14,
                  alignItems: 'flex-start',
                }}>
                <View
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 16,
                    backgroundColor: '#EEF3FF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 2,
                  }}>
                  <Ionicons name="leaf" size={22} color="#003399" />
                </View>
                <View style={{ flex: 1, gap: 6 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '900',
                        color: '#003399',
                        letterSpacing: 1.2,
                        textTransform: 'uppercase',
                      }}>
                      iGo Tip
                    </Text>
                    <View
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: '#FFD600',
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '500',
                      color: '#374151',
                      lineHeight: 21,
                    }}>
                    {result.igo_tip}
                  </Text>
                </View>
              </View>
            </Animated.View>

            {/* ── Suggested Follow-up Meals ─────────────────────────────── */}
            <Animated.View entering={FadeInDown.duration(500).delay(280)}>
              <View
                style={{
                  paddingHorizontal: 24,
                  marginBottom: 16,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: '900',
                    color: '#111827',
                    letterSpacing: -0.8,
                  }}>
                  Follow-up Meals
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '700',
                      color: '#003399',
                    }}>
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 24,
                  gap: 14,
                  paddingVertical: 4,
                }}>
                {SUGGESTED_MEALS.map((meal, index) => (
                  <Animated.View
                    key={meal.id}
                    entering={FadeInDown.delay(320 + index * 80).duration(400)}>
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
                      {/* Yellow accent dot */}
                      <View
                        style={{
                          position: 'absolute',
                          top: 16,
                          left: 16,
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: '#FFD600',
                        }}
                      />
                      {/* Bottom content */}
                      <View
                        style={{
                          position: 'absolute',
                          bottom: 16,
                          left: 16,
                          right: 16,
                          gap: 8,
                        }}>
                        <Text
                          style={{
                            fontSize: 17,
                            fontWeight: '900',
                            color: '#FFFFFF',
                            letterSpacing: -0.5,
                          }}>
                          {meal.title}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 8,
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              backgroundColor: 'rgba(255,255,255,0.18)',
                              borderRadius: 8,
                              paddingHorizontal: 10,
                              paddingVertical: 5,
                            }}>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: '800',
                                color: '#FFFFFF',
                              }}>
                              {meal.kcal} kcal
                            </Text>
                          </View>
                          <View
                            style={{
                              backgroundColor: 'rgba(0,51,153,0.55)',
                              borderRadius: 8,
                              paddingHorizontal: 10,
                              paddingVertical: 5,
                            }}>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: '700',
                                color: '#FFFFFF',
                              }}>
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
