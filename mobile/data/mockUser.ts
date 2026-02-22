export const MOCK_USER = {
  name: 'Tinashe Moyo',
  shortName: 'Tinashe M.',
  initials: 'TM',
  avatarColor: '#003399',
  avatar: 'https://images.unsplash.com/flagged/photo-1573137707067-95ae9d7bc599?q=80&w=200&auto=format&fit=crop&crop=face',
  email: 'tinashe.moyo@cimashealth.co.zw',
  plan: 'Premium' as const,
  joinedYear: '2025',
  mealsScanned: 247,
  dayStreak: 12,
  avgScore: 78,
};

export type MockUser = typeof MOCK_USER;
