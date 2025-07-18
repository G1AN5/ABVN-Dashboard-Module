import React from 'react';

export default function LoginPage({ onLoginSuccess, onNavigate }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 pt-24">
      <div className="w-full max-w-md bg-angat-blue p-8 rounded-lg shadow-lg">
        
        <h2 className="text-4xl font-bold text-white text-center mb-8">
          Welcome Back!
        </h2>
        
        <form>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-white text-base font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 text-base leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-white text-base font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 text-base mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-angat-pink text-white font-bold py-3 px-4 text-lg rounded-full w-full hover:opacity-90 transition-opacity duration-300"
              type="button"
              onClick={onLoginSuccess}
            >
              Log In
            </button>
          </div>
          <div className="text-center mt-6">
            <a
              href="#"
              className="inline-block align-baseline font-bold text-base text-white hover:text-gray-300"
            >
              Forgot your password?
            </a>
          </div>
          <div className="text-center mt-4">
            <p className="text-base text-white">
              Don’t have an account?{' '}
              <a 
                href="#" 
                className="font-bold hover:text-gray-300"
                onClick={(e) => {
                    e.preventDefault();
                    onNavigate('register');
                }}
              >
                Sign Up!
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}