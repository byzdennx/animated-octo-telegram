import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
});

// Cache management - auto clear to prevent egress overage
export const clearCache = async () => {
  await supabase.removeAllChannels();
  // Clear any cached data
  localStorage.removeItem('supabase.auth.token');
};

// Auto clear cache every hour
setInterval(clearCache, 3600000);
