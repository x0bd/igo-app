export const MOCK_USER = {
  name: 'Tinashe Moyo',
  shortName: 'Tinashe M.',
  initials: 'TM',
  avatarColor: '#003399',
  email: 'tinashe.moyo@cimashealth.co.zw',
  plan: 'Premium' as const,
  joinedYear: '2025',
  mealsScanned: 247,
  dayStreak: 12,
  avgScore: 78,
};

export type MockUser = typeof MOCK_USER;
