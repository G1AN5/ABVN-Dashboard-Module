import React from 'react';
import AngatBuhayLogo from '../assets/angat-buhay-logo.png';

export default function TopNav({ onNavigate, currentPage }) {
  const navItems = ['Home', 'About Us', 'The Team', 'Linkages', 'Operations', 'Resources'];
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img src={AngatBuhayLogo} alt="Angat Buhay Logo" className="h-10 w-auto" />
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map(item => (
            <a key={item} href="#" className={`text-gray-700 hover:text-angat-blue transition-colors duration-300 ${item.toLowerCase().replace(' ','') === 'home' && currentPage === 'home' ? 'text-angat-blue font-bold' : ''}`} onClick={() => item === 'Home' && onNavigate('home')}>
              {item}
            </a>
          ))}
          <a href="#" className={`px-4 py-2 rounded-full transition-colors duration-300 ${currentPage === 'partnership' ? 'bg-angat-blue text-white border-2 border-angat-blue' : 'text-angat-blue border-2 border-angat-blue hover:bg-angat-blue hover:text-white'}`} onClick={() => onNavigate('partnership')}>
            Partnership
          </a>
        </nav>
        <div className="hidden md:block">
          <a href="#" className="bg-angat-pink text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-opacity duration-300">
            Support our Programs!
          </a>
        </div>
        <div className="md:hidden">
            <button className="text-gray-700 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
        </div>
      </div>
    </header>
  );
};
