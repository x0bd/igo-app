export const DAILY_GOALS = [
  {
    id: '1',
    label: 'Protein Left',
    value: '120g',
    icon: 'barbell',
    bg: '#003399',
    shadowColor: '#003399',
    isYellow: false,
  },
  {
    id: '2',
    label: 'Water Intake',
    value: '4/8',
    icon: 'water',
    bg: '#1A56DB',
    shadowColor: '#1A56DB',
    isYellow: false,
  },
  {
    id: '3',
    label: 'Daily Steps',
    value: '4.2k',
    icon: 'walk',
    bg: '#FFD600',
    shadowColor: '#C8A800',
    isYellow: true,
  },
];

export const CALORIE_TARGET = 2200;
export const PROTEIN_TARGET = 150;
export const CARBS_TARGET = 280;
export const FAT_TARGET = 80;
export const WATER_TARGET = 8;
export const STEPS_TARGET = 10000;

export type DailyGoal = (typeof DAILY_GOALS)[number];
