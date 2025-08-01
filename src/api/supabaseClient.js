import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// This client is for calling the 'user' Edge Function (login, registration, approval)
const supabaseFunctions = axios.create({
    baseURL: `${supabaseUrl}/functions/v1/user`,
    headers: {
      'apikey': supabaseAnonKey,
      'Content-Type': 'application/json',
    }
});

// This is the main authenticated client for ALL other API calls (programs, reports, etc.)
// It points to the 'programs-and-projects' edge function.
const getSupabaseApiAuthenticated = () => {
  const session = JSON.parse(localStorage.getItem('auth_session'));
  const token = session?.access_token;

  if (!token) {
    console.error("No auth token found in localStorage.");
    // This will cause API calls to fail, prompting a re-login.
  }

  return axios.create({
    baseURL: `${supabaseUrl}/functions/v1/programs-and-projects`,
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${token}`,
    }
  });
};

// This client is for making authenticated calls to the 'user' Edge Function (e.g., approve/reject)
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

// This client uses the official JS library, primarily for storage operations like getting signed URLs.
const getSupabaseStorageClient = () => {
    const session = JSON.parse(localStorage.getItem('auth_session'));
    const token = session?.access_token;

    return createClient(supabaseUrl, supabaseAnonKey, {
        global: {
            headers: { Authorization: `Bearer ${token}` }
        }
    });
}

export { supabaseFunctions, getSupabaseApiAuthenticated, getSupabaseFunctionsAuthenticated, getSupabaseStorageClient };
