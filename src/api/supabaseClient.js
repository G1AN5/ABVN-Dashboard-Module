import axios from 'axios';
import { createClient } from '@supabase/supabase-js'; // Import the official client

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
      'apikey': supabaseAnonKey,
      'Content-Type': 'application/json',
    }
});

// This client is for making authenticated API calls to your database tables
const getSupabaseClientAuthenticated = () => {
  const session = JSON.parse(localStorage.getItem('auth_session'));
  const token = session?.access_token;

  return axios.create({
    baseURL: `${supabaseUrl}/rest/v1`,
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
};

// This client is for making authenticated calls to your Edge Functions
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

// NEW: Create an authenticated Supabase JS client for storage operations
const getSupabaseStorageClient = () => {
    const session = JSON.parse(localStorage.getItem('auth_session'));
    const token = session?.access_token;

    // We must use the official createClient for storage, passing the token
    return createClient(supabaseUrl, supabaseAnonKey, {
        global: {
            headers: { Authorization: `Bearer ${token}` }
        }
    });
}


export { supabase, supabaseFunctions, getSupabaseClientAuthenticated, getSupabaseFunctionsAuthenticated, getSupabaseStorageClient };