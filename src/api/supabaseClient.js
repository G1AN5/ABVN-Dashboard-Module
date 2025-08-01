import axios from 'axios';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// This client is for reading public data (if any)
const supabase = axios.create({
  baseURL: `${supabaseUrl}/rest/v1`,
  headers: {
    'apikey': supabaseAnonKey,
    'Authorization': `Bearer ${supabaseAnonKey}`,
    'Content-Type': 'application/json',
  }
});

// This client is for calling Edge Functions (like login)
const supabaseFunctions = axios.create({
    baseURL: `${supabaseUrl}/functions/v1/user`,
    headers: {
      'apikey': supabaseAnonKey, // Functions often need the anon key too
      'Content-Type': 'application/json',
    }
});

// FIX: Create a new client that automatically includes the user's auth token
// This will be used for all secure admin actions.
const getSupabaseClientAuthenticated = () => {
  const session = JSON.parse(localStorage.getItem('auth_session'));
  const token = session?.access_token;

  return axios.create({
    baseURL: `${supabaseUrl}/rest/v1`,
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${token}`, // Use the logged-in user's token
      'Content-Type': 'application/json',
    }
  });
};

const getSupabaseFunctionsAuthenticated = () => {
  const session = JSON.parse(localStorage.getItem('auth_session'));
  const token = session?.access_token;

  return axios.create({
    baseURL: `${supabaseUrl}/functions/v1/user`,
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
};


export { supabase, supabaseFunctions, getSupabaseClientAuthenticated, getSupabaseFunctionsAuthenticated };