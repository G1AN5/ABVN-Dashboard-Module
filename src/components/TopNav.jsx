import React from 'react';
import AngatBuhayLogo from '../assets/angat-buhay-logo.png'; 

export default function TopNav({ onNavigate, currentPage }) {
  const navItems = ['Home', 'About Us', 'The Team', 'Linkages', 'Operations', 'Resources', 'Partnership'];

  return (
    <header className="bg-angat-blue shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="w-full flex items-center justify-between px-4 py-1">
        
        <div className="flex items-center flex-shrink-0">
          <div className="bg-white rounded-r-full shadow-lg flex items-center pl-2 pr-4 py-1">
            <img src={AngatBuhayLogo} alt="Angat Buhay Logo" className="h-14 w-auto" />
          </div>
          <div className="relative ml-6 hidden lg:block">
            <input 
              type="text" 
              className="bg-white rounded-md py-2 pl-10 pr-4 w-64 focus:outline-none"
              placeholder="Search..."
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex-grow flex justify-center">
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map(item => {
              const isHomeActive = item === 'Home' && currentPage === 'home';
              const isPartnershipActive = item === 'Partnership' && ['login', 'register', 'dashboard'].includes(currentPage);
              const isActive = isHomeActive || isPartnershipActive;

              return (
                <a 
                  key={item} 
                  href="#" 
                  className={`px-4 py-3 rounded-lg text-white text-xs transition-colors duration-300 ${isActive ? 'bg-angat-pink' : 'hover:bg-white/20'}`} 
                  onClick={() => {
                    if (item === 'Home') onNavigate('home');
                    if (item === 'Partnership') onNavigate('partnership');
                  }}
                >
                  {item}
                </a>
              );
            })}
          </nav>
        </div>

        <div className="flex-shrink-0 ml-4">
          <a href="#" className="bg-angat-pink text-white px-6 py-3 rounded-full font-bold transition-transform duration-300 hover:scale-105 border-4 border-yellow-300 shadow-lg hidden lg:block">
            SUPPORT OUR PROGRAMS!
          </a>
        </div>
        
        <div className="md:hidden">
            <button className="text-white focus:outline-none">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
        </div>

      </div>
    </header>
  );
};