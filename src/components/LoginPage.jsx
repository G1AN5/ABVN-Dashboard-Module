import React, { useState } from 'react';
import { supabaseFunctions } from '../api/supabaseClient';

export default function LoginPage({ onLoginSuccess, onNavigate }) {
  const [loginAs, setLoginAs] = useState('organization');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data } = await supabaseFunctions.post('/sign-in', {
        email,
        password,
      });

      // FIX: Store the user's session in localStorage for other components to use
      if (data.session) {
        localStorage.setItem('auth_session', JSON.stringify(data.session));
      }

      console.log('Login successful:', data);
      onLoginSuccess(loginAs);

    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-angat-blue p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back!
        </h2>

        <div className="flex justify-center bg-blue-900/20 rounded-full p-1 mb-6">
          <button
            onClick={() => setLoginAs('organization')}
            className={`w-1/2 py-2 text-sm font-bold rounded-full transition-colors duration-300 ${loginAs === 'organization' ? 'bg-white text-angat-blue' : 'text-white'}`}
          >
            Sign in as Organization
          </button>
          <button
            onClick={() => setLoginAs('admin')}
            className={`w-1/2 py-2 text-sm font-bold rounded-full transition-colors duration-300 ${loginAs === 'admin' ? 'bg-white text-angat-blue' : 'text-white'}`}
          >
            Sign in as Admin
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
          <div className="mt-6 flex items-center justify-between">
            <button
              className="bg-angat-pink text-white font-bold py-2 px-4 text-base rounded-full w-full hover:opacity-90 transition-opacity duration-300 disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Logging In...' : 'Log In'}
            </button>
          </div>
          <div className="text-center mt-4">
            <a href="#" className="inline-block align-baseline font-bold text-sm text-white hover:text-gray-300">
              Forgot your password?
            </a>
          </div>
          {loginAs === 'organization' && (
            <div className="text-center mt-2">
              <p className="text-sm text-white">
                Don’t have an account?{' '}
                <a href="#" className="font-bold hover:text-gray-300" onClick={(e) => { e.preventDefault(); onNavigate('register'); }}>
                  Sign Up!
                </a>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}