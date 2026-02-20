import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import Svg, {
  Rect,
  Circle,
  G,
  Text as SvgText,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  ClipPath,
} from 'react-native-svg';
import {
  WEEKLY_SUMMARY,
  AT_A_GLANCE,
  WEEKLY_INSIGHTS as INSIGHTS,
  DAILY_BARS,
  MACROS,
  HEALTH_SCORE,
} from '../data/mockNutrition';

// ─── Mock Data ────────────────────────────────────────────────────────────────

// ─── Custom SVG Bar Chart ─────────────────────────────────────────────────────

const BAR_CHART_W = 340;
const BAR_CHART_H = 160;
const BAR_GAP = 10;
const BAR_COUNT = DAILY_BARS.length;
const maxKcal = Math.max(...DAILY_BARS.map((b) => b.kcal));

const BarChart = () => {
  const barWidth = (BAR_CHART_W - BAR_GAP * (BAR_COUNT + 1)) / BAR_COUNT;

  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={BAR_CHART_W} height={BAR_CHART_H + 24}>
        <Defs>
          <SvgLinearGradient id="barGradBlue" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#003399" stopOpacity="1" />
            <Stop offset="1" stopColor="#3366CC" stopOpacity="0.7" />
          </SvgLinearGradient>
          <SvgLinearGradient id="barGradPurple" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#AF52DE" stopOpacity="1" />
            <Stop offset="1" stopColor="#C084FC" stopOpacity="0.7" />
          </SvgLinearGradient>
          <SvgLinearGradient id="barGradOrange" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#FF9500" stopOpacity="1" />
            <Stop offset="1" stopColor="#FFBB33" stopOpacity="0.7" />
          </SvgLinearGradient>
        </Defs>

        {DAILY_BARS.map((bar, i) => {
          const x = BAR_GAP + i * (barWidth + BAR_GAP);
          const barH = (bar.kcal / maxKcal) * (BAR_CHART_H - 20);
          const y = BAR_CHART_H - barH - 4;
          const fillId =
            bar.color === '#AF52DE'
              ? 'url(#barGradPurple)'
              : bar.color === '#FF9500'
                ? 'url(#barGradOrange)'
                : 'url(#barGradBlue)';
          const fill = bar.color === '#CBD5E1' ? '#E2E8F0' : fillId;
          return (
            <G key={bar.label}>
              <Rect x={x} y={y} width={barWidth} height={barH} rx={barWidth / 2} fill={fill} />
              <SvgText
                x={x + barWidth / 2}
                y={BAR_CHART_H + 16}
                textAnchor="middle"
                fontSize={10}
                fontWeight="700"
                fill="#9CA3AF">
                {bar.label}
              </SvgText>
            </G>
          );
        })}
      </Svg>
    </View>
  );
};

// ─── Circular Health Score Ring ────────────────────────────────────────────────

const RING_SIZE = 140;
const STROKE_W = 14;
const RADIUS = (RING_SIZE - STROKE_W) / 2;
const CIRCUMF = 2 * Math.PI * RADIUS;

const HealthRing = ({ score }: { score: number }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(300, withTiming(score / 100, { duration: 1200 }));
  }, []);

  const dashOffset = CIRCUMF * (1 - score / 100);

  const ringColor = score >= 80 ? '#16A34A' : score >= 60 ? '#D97706' : '#DC2626';

  return (
    <View
      style={{
        width: RING_SIZE,
        height: RING_SIZE,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Svg width={RING_SIZE} height={RING_SIZE} style={{ position: 'absolute' }}>
        {/* Track */}
        <Circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RADIUS}
          stroke="#F3F4F6"
          strokeWidth={STROKE_W}
          fill="none"
        />
        {/* Progress arc */}
        <Circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RADIUS}
          stroke={ringColor}
          strokeWidth={STROKE_W}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${CIRCUMF}`}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
        />
      </Svg>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 32, fontWeight: '900', color: '#111827', letterSpacing: -1.5 }}>
          {score}
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: '800',
            color: '#9CA3AF',
            letterSpacing: 0.8,
            textTransform: 'uppercase',
          }}>
          Score
        </Text>
      </View>
    </View>
  );
};

// ─── Animated Macro Bar ───────────────────────────────────────────────────────

const MacroBar = ({
  label,
  current,
  target,
  color,
  trackBg,
  delay,
}: {
  label: string;
  current: number;
  target: number;
  color: string;
  trackBg: string;
  delay: number;
}) => {
  const pct = Math.min(current / target, 1);
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withDelay(delay, withSpring(pct, { damping: 18, stiffness: 80 }));
  }, []);

  const barStyle = useAnimatedStyle(() => ({
    width: `${width.value * 100}%`,
  }));

  return (
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 14, fontWeight: '800', color: '#111827' }}>{label}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 3 }}>
          <Text style={{ fontSize: 18, fontWeight: '900', color, letterSpacing: -0.8 }}>
            {current}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: '600', color: '#9CA3AF' }}>/ {target}g</Text>
        </View>
      </View>
      {/* Track */}
      <View style={{ height: 10, backgroundColor: trackBg, borderRadius: 999, overflow: 'hidden' }}>
        <Animated.View
          style={[barStyle, { height: '100%', backgroundColor: color, borderRadius: 999 }]}
        />
      </View>
      <Text style={{ fontSize: 10, fontWeight: '700', color: '#9CA3AF', textAlign: 'right' }}>
        {Math.round(pct * 100)}% of daily goal
      </Text>
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

const Stats = () => {
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
            THIS WEEK
          </Text>
          <Text
            style={{
              fontSize: 34,
              fontWeight: '900',
              color: '#111827',
              letterSpacing: -1.5,
              lineHeight: 38,
            }}>
            Statistics
          </Text>
        </Animated.View>

        {/* ── Hero Card ───────────────────────────────────────────────────── */}
        <Animated.View
          entering={FadeInDown.duration(400).delay(80)}
          style={{ paddingHorizontal: 24, marginTop: 20, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: '#003399',
              borderRadius: 40,
              padding: 28,
              overflow: 'hidden',
              shadowColor: '#003399',
              shadowOffset: { width: 0, height: 20 },
              shadowOpacity: 0.45,
              shadowRadius: 28,
              elevation: 18,
            }}>
            {/* Blobs */}
            <View
              style={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: 100,
                backgroundColor: '#FFD600',
                opacity: 0.12,
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: -30,
                left: -30,
                width: 150,
                height: 150,
                borderRadius: 75,
                backgroundColor: '#0055FF',
                opacity: 0.25,
              }}
            />

            {/* Decorative shapes */}
            <View
              style={{
                position: 'absolute',
                top: 24,
                right: 24,
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: '#FFD600',
                opacity: 0.9,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 68,
                right: 16,
                width: 38,
                height: 38,
                borderRadius: 10,
                backgroundColor: '#0044CC',
                opacity: 0.65,
                transform: [{ rotate: '18deg' }],
              }}
            />

            {/* Badge */}
            <View
              style={{
                alignSelf: 'flex-start',
                backgroundColor: 'rgba(255,255,255,0.18)',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.12)',
                paddingHorizontal: 14,
                paddingVertical: 6,
                borderRadius: 999,
                marginBottom: 20,
              }}>
              <Text
                style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '800', letterSpacing: 1.5 }}>
                WEEKLY REPORT
              </Text>
            </View>

            <Text
              style={{
                fontSize: 38,
                fontWeight: '900',
                color: '#FFFFFF',
                letterSpacing: -2,
                lineHeight: 40,
                marginBottom: 10,
              }}>
              Strong{'\n'}Progress
            </Text>
            <Text
              style={{
                color: 'rgba(179,210,255,0.9)',
                fontSize: 13,
                fontWeight: '500',
                lineHeight: 20,
                maxWidth: '70%',
                marginBottom: 28,
              }}>
              You're 14% above your weekly nutrition target.
            </Text>

            {/* Metrics row */}
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {[
                { label: 'Avg kcal', value: `${WEEKLY_SUMMARY.avgKcal}` },
                { label: 'Best Score', value: `${WEEKLY_SUMMARY.bestScore}` },
                { label: 'Consistency', value: WEEKLY_SUMMARY.consistency },
              ].map((m) => (
                <View
                  key={m.label}
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    borderRadius: 20,
                    paddingVertical: 14,
                    alignItems: 'center',
                    gap: 4,
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.08)',
                  }}>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: '900',
                      color: '#FFFFFF',
                      letterSpacing: -1,
                    }}>
                    {m.value}
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: '800',
                      color: 'rgba(255,255,255,0.5)',
                      textTransform: 'uppercase',
                      letterSpacing: 0.8,
                    }}>
                    {m.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>

        {/* ── At a Glance ─────────────────────────────────────────────────── */}
        <Animated.View
          entering={FadeInDown.duration(400).delay(140)}
          style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '900',
              color: '#111827',
              letterSpacing: -0.8,
              marginBottom: 14,
            }}>
            At a Glance
          </Text>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 32,
              borderWidth: 1,
              borderColor: '#EFEFEF',
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 12,
              elevation: 3,
            }}>
            {AT_A_GLANCE.map((item, i) => {
              const isUp = item.trend >= 0;
              return (
                <View
                  key={item.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    borderBottomWidth: i < AT_A_GLANCE.length - 1 ? 1 : 0,
                    borderBottomColor: '#F5F5F5',
                    gap: 14,
                  }}>
                  {/* Icon */}
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 15,
                      backgroundColor: item.iconBg,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Ionicons name={item.icon as any} size={20} color={item.iconColor} />
                  </View>

                  {/* Label + value */}
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '700',
                        color: '#9CA3AF',
                        marginBottom: 2,
                      }}>
                      {item.label}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '900',
                          color: '#111827',
                          letterSpacing: -0.8,
                        }}>
                        {item.value}
                      </Text>
                      <Text style={{ fontSize: 11, fontWeight: '600', color: '#9CA3AF' }}>
                        {item.unit}
                      </Text>
                    </View>
                  </View>

                  {/* Trend badge */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                      backgroundColor: isUp ? '#EDFAF1' : '#FFF1F2',
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 10,
                    }}>
                    <Ionicons
                      name={isUp ? 'trending-up' : 'trending-down'}
                      size={13}
                      color={isUp ? '#16A34A' : '#DC2626'}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '800',
                        color: isUp ? '#16A34A' : '#DC2626',
                      }}>
                      {isUp ? '+' : ''}
                      {item.trend}%
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </Animated.View>

        {/* ── AI Insights Rail ────────────────────────────────────────────── */}
        <Animated.View entering={FadeInDown.duration(400).delay(190)} style={{ marginBottom: 24 }}>
          <View
            style={{
              paddingHorizontal: 24,
              marginBottom: 14,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <Text
              style={{ fontSize: 22, fontWeight: '900', color: '#111827', letterSpacing: -0.8 }}>
              AI Insights
            </Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#003399' }}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 14, paddingVertical: 4 }}>
            {INSIGHTS.map((insight, i) => (
              <Animated.View
                key={insight.id}
                entering={FadeInDown.delay(200 + i * 80).duration(400)}>
                <TouchableOpacity
                  activeOpacity={0.88}
                  style={{
                    width: 230,
                    backgroundColor: '#111111',
                    borderRadius: 28,
                    padding: 22,
                    gap: 12,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.25,
                    shadowRadius: 18,
                    elevation: 10,
                  }}>
                  <View
                    style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: insight.dot }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '900',
                      color: '#FFFFFF',
                      letterSpacing: -0.3,
                    }}>
                    {insight.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      color: 'rgba(255,255,255,0.55)',
                      lineHeight: 18,
                    }}>
                    {insight.body}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* ── Daily Graph ─────────────────────────────────────────────────── */}
        <Animated.View
          entering={FadeInDown.duration(400).delay(240)}
          style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 32,
              padding: 24,
              borderWidth: 1,
              borderColor: '#EFEFEF',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 12,
              elevation: 3,
              gap: 16,
            }}>
            {/* Card header */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '800',
                    color: '#9CA3AF',
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    marginBottom: 4,
                  }}>
                  TODAY
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '900',
                    color: '#111827',
                    letterSpacing: -0.8,
                  }}>
                  Calorie Intake
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#EEF3FF',
                  borderRadius: 14,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '900',
                    color: '#003399',
                    letterSpacing: -0.5,
                  }}>
                  2,340
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: '800',
                    color: 'rgba(0,51,153,0.5)',
                    textTransform: 'uppercase',
                    letterSpacing: 0.6,
                  }}>
                  / 2,500 kcal
                </Text>
              </View>
            </View>

            {/* Color key */}
            <View style={{ flexDirection: 'row', gap: 16 }}>
              {[
                { color: '#AF52DE', label: 'Protein-rich' },
                { color: '#FF9500', label: 'Carb-heavy' },
                { color: '#E2E8F0', label: 'Light' },
              ].map((k) => (
                <View key={k.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <View
                    style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: k.color }}
                  />
                  <Text style={{ fontSize: 10, fontWeight: '700', color: '#9CA3AF' }}>
                    {k.label}
                  </Text>
                </View>
              ))}
            </View>

            {/* SVG bar chart */}
            <BarChart />
          </View>
        </Animated.View>

        {/* ── Macro Summary ────────────────────────────────────────────────── */}
        <Animated.View
          entering={FadeInDown.duration(400).delay(290)}
          style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 32,
              padding: 24,
              borderWidth: 1,
              borderColor: '#EFEFEF',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 12,
              elevation: 3,
              gap: 20,
            }}>
            <Text
              style={{ fontSize: 20, fontWeight: '900', color: '#111827', letterSpacing: -0.8 }}>
              Macro Summary
            </Text>
            {MACROS.map((m, i) => (
              <MacroBar key={m.label} {...m} delay={300 + i * 100} />
            ))}
          </View>
        </Animated.View>

        {/* ── Health Score Card ────────────────────────────────────────────── */}
        <Animated.View
          entering={FadeInDown.duration(400).delay(340)}
          style={{ paddingHorizontal: 24, marginBottom: 8 }}>
          <View
            style={{
              backgroundColor: '#111111',
              borderRadius: 40,
              padding: 28,
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 20 },
              shadowOpacity: 0.35,
              shadowRadius: 28,
              elevation: 18,
            }}>
            {/* Decorative blob */}
            <View
              style={{
                position: 'absolute',
                top: -40,
                right: -40,
                width: 160,
                height: 160,
                borderRadius: 80,
                backgroundColor: '#003399',
                opacity: 0.3,
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: -30,
                left: -30,
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: '#FFD600',
                opacity: 0.1,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 20,
              }}>
              {/* Left text */}
              <View style={{ flex: 1, gap: 10 }}>
                <View
                  style={{
                    alignSelf: 'flex-start',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    paddingHorizontal: 12,
                    paddingVertical: 5,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: '900',
                      color: 'rgba(255,255,255,0.6)',
                      letterSpacing: 1.2,
                      textTransform: 'uppercase',
                    }}>
                    HEALTH SCORE
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: '900',
                    color: '#FFFFFF',
                    letterSpacing: -1,
                    lineHeight: 30,
                  }}>
                  Looking{'\n'}Good!
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '500',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 20,
                  }}>
                  You're in the top 22% of iGo users this week.
                </Text>
                {/* Badges */}
                <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
                  {['Good', '+5 pts', 'Week Best'].map((tag) => (
                    <View
                      key={tag}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        borderRadius: 10,
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                      }}>
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '800',
                          color: 'rgba(255,255,255,0.7)',
                          letterSpacing: 0.2,
                        }}>
                        {tag}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Right: SVG ring */}
              <HealthRing score={HEALTH_SCORE} />
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default Stats;
