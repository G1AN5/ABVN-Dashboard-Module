import React, { useState } from 'react';
import TopNav from './components/TopNav';
import HomePage from './components/HomePage';
import DashboardPage from './components/DashboardPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const navigateTo = (page) => { setCurrentPage(page); };

  return (
    <div className="font-agrandir">
      <TopNav onNavigate={navigateTo} currentPage={currentPage} />
      <main>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'partnership' && <DashboardPage />}
      </main>
    </div>
  );
}