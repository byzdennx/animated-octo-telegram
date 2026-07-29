import React, { createContext, useState, useEffect } from 'react';
import { auth, onAuthChange, saveUserProfile, getUserProfile } from '../services/firebase';
import { memory } from '../utils/memoryManager';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await getUserProfile(firebaseUser.uid);
        setUser({ ...firebaseUser, ...profile });
        // Store in memory
        memory.set(`user_${firebaseUser.uid}`, firebaseUser);
      } else {
        setUser(null);
        memory.clear();
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const updateProfile = async (data) => {
    if (user) {
      await saveUserProfile(user.uid, data);
      setUser(prev => ({ ...prev, ...data }));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
