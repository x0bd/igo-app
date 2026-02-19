import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, { FadeIn } from 'react-native-reanimated';

interface AreaChartProps {
  data: number[];
  width: number;
  height: number;
  gradientFrom: string;
  gradientTo: string;
  lineColor: string;
}

export function AreaChart({
  data,
  width,
  height,
  gradientFrom,
  gradientTo,
  lineColor,
}: AreaChartProps) {
  if (data.length < 2) return null;

  const max = Math.max(...data) * 1.15;
  const min = 0;
  const range = max - min || 1;
  const padding = 0;

  const stepX = (width - padding * 2) / (data.length - 1);

  // Build smooth bezier path
  const points = data.map((v, i) => ({
    x: padding + i * stepX,
    y: height - padding - ((v - min) / range) * (height - padding * 2),
  }));

  let linePath = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx1 = prev.x + stepX * 0.4;
    const cpy1 = prev.y;
    const cpx2 = curr.x - stepX * 0.4;
    const cpy2 = curr.y;
    linePath += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${curr.x} ${curr.y}`;
  }

  // Area fill — close path to bottom
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return (
    <Animated.View entering={FadeIn.duration(800).delay(200)}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={gradientFrom} stopOpacity="0.3" />
            <Stop offset="1" stopColor={gradientTo} stopOpacity="0.02" />
          </LinearGradient>
        </Defs>
        <Path d={areaPath} fill="url(#areaGrad)" />
        <Path
          d={linePath}
          fill="none"
          stroke={lineColor}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* End dot */}
        <Path
          d={`M ${points[points.length - 1].x - 3} ${points[points.length - 1].y} 
              a 3 3 0 1 0 6 0 
              a 3 3 0 1 0 -6 0`}
          fill={lineColor}
        />
      </Svg>
    </Animated.View>
  );
}
