import React, { useState } from 'react';
import TopNav from './components/TopNav';
import HomePage from './components/HomePage';
import DashboardPage from './components/DashboardPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    if (page === 'partnership') {
      setCurrentPage('login');
    } else {
      setCurrentPage(page);
    }
  };

  const handleLoginSuccess = () => {
    setCurrentPage('dashboard');
  };

  return (
    <div className="font-agrandir">
      <TopNav onNavigate={navigateTo} currentPage={currentPage} />

      <main>
        {currentPage === 'home' && <HomePage />}
        {/* Pass the navigateTo function to LoginPage */}
        {currentPage === 'login' && <LoginPage onLoginSuccess={handleLoginSuccess} onNavigate={navigateTo} />}
        {currentPage === 'register' && <RegisterPage />}
        {currentPage === 'dashboard' && <DashboardPage />}
      </main>
    </div>
  );
}
