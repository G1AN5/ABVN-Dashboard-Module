import React, { useState } from 'react';
import TopNav from './components/TopNav';
import HomePage from './components/HomePage';
import DashboardPage from './components/DashboardPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AdminDashboardPage from './components/AdminDashboardPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [userRole, setUserRole] = useState(null); 

  const navigateTo = (page) => {
    if (page === 'partnership') {
      setCurrentPage('login');
    } else {
      setCurrentPage(page);
    }
  };

  // FIX: This function now correctly handles routing based on the user's role.
  const handleLoginSuccess = (role) => {
    setUserRole(role);
    if (role === 'admin') {
      setCurrentPage('adminDashboard');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const isPartnershipRelated = ['login', 'register', 'dashboard', 'adminDashboard'].includes(currentPage);

  return (
    <div className="font-agrandir">
      <TopNav onNavigate={navigateTo} currentPage={currentPage} isPartnershipActive={isPartnershipRelated} />

      <main>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'login' && <LoginPage onLoginSuccess={handleLoginSuccess} onNavigate={navigateTo} />}
        {currentPage === 'register' && <RegisterPage onNavigate={navigateTo}/>}
        {currentPage === 'dashboard' && <DashboardPage />}
        {currentPage === 'adminDashboard' && <AdminDashboardPage />} 
      </main>
    </div>
  );
}