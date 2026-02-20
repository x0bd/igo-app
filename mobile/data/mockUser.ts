export const MOCK_USER = {
  name: 'Mei Lin',
  shortName: 'Mei L.',
  email: 'mei.lin@cimashealth.co.zw',
  avatar:
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
  plan: 'Premium' as const,
  joinedYear: '2025',
  mealsScanned: 247,
  dayStreak: 12,
  avgScore: 78,
};

export type MockUser = typeof MOCK_USER;
