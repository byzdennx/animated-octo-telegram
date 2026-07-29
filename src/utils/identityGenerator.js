export const generateIdentity = (userId) => {
  const existing = localStorage.getItem(`identity_${userId}`);
  if (existing) {
    try {
      return JSON.parse(existing);
    } catch {
      // Fall through to generate new
    }
  }

  const names = [
    'Pandawa', 'Kusuma', 'Dewi', 'Surya', 'Chandra',
    'Arjuna', 'Bima', 'Nakula', 'Sahadeva', 'Yudhistira',
    'Bayu', 'Indra', 'Agni', 'Varuna', 'Kubera'
  ];

  const identity = {
    id: userId,
    name: `${names[Math.floor(Math.random() * names.length)]}_${userId.slice(0, 6)}`,
    displayName: `User ${userId.slice(0, 8)}`,
    createdAt: new Date().toISOString(),
    preferences: {
      theme: 'dark',
      language: 'id',
      notifications: true
    },
    metadata: {
      device: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language
    }
  };

  localStorage.setItem(`identity_${userId}`, JSON.stringify(identity));
  return identity;
};

export const updateIdentity = (userId, updates) => {
  const existing = localStorage.getItem(`identity_${userId}`);
  if (existing) {
    const identity = JSON.parse(existing);
    const updated = { ...identity, ...updates };
    localStorage.setItem(`identity_${userId}`, JSON.stringify(updated));
    return updated;
  }
  return generateIdentity(userId);
};

export const getIdentity = (userId) => {
  const existing = localStorage.getItem(`identity_${userId}`);
  if (existing) {
    return JSON.parse(existing);
  }
  return generateIdentity(userId);
};
