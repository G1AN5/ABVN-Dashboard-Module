import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { 
  LayoutDashboard, BarChart3, FolderKanban, DollarSign, FilePlus2, FileText, Settings, LogOut, ChevronLeft, ChevronRight, UserCircle2 
} from 'lucide-react';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFinancialsOpen, setIsFinancialsOpen] = useState(false);

  const scrollProps = {
    spy: true,
    smooth: true,
    offset: -110, // FIX: Fine-tuned the offset for more accurate highlighting
    duration: 500,
    className: "flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors duration-200",
    activeClass: "bg-angat-blue text-white shadow-lg"
  };

  return (
    // FIX: Removed top padding from here. It's now handled by the main content div.
    <aside className={`bg-sidebar-light fixed top-0 h-screen transition-all duration-300 ease-in-out z-30 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex flex-col h-full">
        
        {/* FIX: Added pt-24 to this button to align it correctly with the content */}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="absolute -right-4 top-24 bg-white p-2 rounded-full shadow-lg border">
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        {/* User Profile */}
        {/* FIX: Added pt-24 to this container to push it down below the navbar */}
        <div className={`flex items-center transition-all duration-300 px-4 pt-24 pb-8 ${isCollapsed ? 'justify-center' : ''}`}>
          <UserCircle2 size={isCollapsed ? 36 : 48} className="text-gray-600 flex-shrink-0" />
          {!isCollapsed && (
            <div className="ml-3">
              <p className="font-bold text-gray-800 leading-tight">Username</p>
              <p className="text-sm text-gray-600 leading-tight">user@email.com</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-grow text-gray-700 overflow-y-auto px-4">
          <Link to="dashboard" {...scrollProps} className={`${scrollProps.className} hover:bg-sidebar-lighter`}>
            <LayoutDashboard size={20} className="flex-shrink-0" />
            {!isCollapsed && <span className="ml-4 font-semibold text-sm">Dashboard</span>}
          </Link>
          <Link to="recent-activity" {...scrollProps} className={`${scrollProps.className} hover:bg-sidebar-lighter`}>
            <BarChart3 size={20} className="flex-shrink-0" />
            {!isCollapsed && <span className="ml-4 font-semibold text-sm">Recent Activity</span>}
          </Link>
          <Link to="programs-management" {...scrollProps} className={`${scrollProps.className} hover:bg-sidebar-lighter`}>
            <FolderKanban size={20} className="flex-shrink-0" />
            {!isCollapsed && <span className="ml-4 font-semibold text-sm">Programs & Projects</span>}
          </Link>
          
          <div>
            <div 
              onClick={() => setIsFinancialsOpen(!isFinancialsOpen)} 
              className="flex items-center justify-between p-3 my-1 rounded-lg cursor-pointer hover:bg-sidebar-lighter"
            >
              <div className="flex items-center">
                <DollarSign size={20} className="flex-shrink-0" />
                {!isCollapsed && <span className="ml-4 font-semibold text-sm">Financials & Reporting</span>}
              </div>
              {!isCollapsed && <ChevronRight size={20} className={`transition-transform duration-300 ${isFinancialsOpen ? 'rotate-90' : ''}`} />}
            </div>
            {isFinancialsOpen && !isCollapsed && (
              <div className="pl-8">
                <Link to="financial-overview" {...scrollProps} className={`${scrollProps.className} hover:bg-sidebar-lighter`}>
                  <FileText size={18} className="flex-shrink-0" />
                  <span className="ml-4 text-sm">Financial Overview</span>
                </Link>
                <Link to="financial-report-form" {...scrollProps} className={`${scrollProps.className} hover:bg-sidebar-lighter`}>
                  <FilePlus2 size={18} className="flex-shrink-0" />
                  <span className="ml-4 text-sm">Financial Report Form</span>
                </Link>
                <Link to="report-history" {...scrollProps} className={`${scrollProps.className} hover:bg-sidebar-lighter`}>
                  <BarChart3 size={18} className="flex-shrink-0" />
                  <span className="ml-4 text-sm">Report History</span>
                </Link>
              </div>
            )}
          </div>

          <Link to="propose-program" {...scrollProps} className={`${scrollProps.className} hover:bg-sidebar-lighter`}>
            <FilePlus2 size={20} className="flex-shrink-0" />
            {!isCollapsed && <span className="ml-4 font-semibold text-sm">Propose a New Program</span>}
          </Link>
          <Link to="submit-report" {...scrollProps} className={`${scrollProps.className} hover:bg-sidebar-lighter`}>
            <FileText size={20} className="flex-shrink-0" />
            {!isCollapsed && <span className="ml-4 font-semibold text-sm">Submit a Report</span>}
          </Link>
          
          <hr className="my-4 border-gray-300"/>

          <Link to="edit-profile" {...scrollProps} className={`${scrollProps.className} hover:bg-sidebar-lighter`}>
            <FolderKanban size={20} className="flex-shrink-0" />
            {!isCollapsed && <span className="ml-4 font-semibold text-sm">Edit Organization Profile</span>}
          </Link>
          <Link to="account-settings" {...scrollProps} className={`${scrollProps.className} hover:bg-sidebar-lighter`}>
            <Settings size={20} className="flex-shrink-0" />
            {!isCollapsed && <span className="ml-4 font-semibold text-sm">Account Settings</span>}
          </Link>
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-300 px-4 pb-4">
          <a href="#" className="flex items-center p-3 my-1 rounded-lg hover:bg-sidebar-lighter text-gray-700">
            <LogOut size={20} className="flex-shrink-0" />
            {!isCollapsed && <span className="ml-4 font-semibold text-sm">Logout</span>}
          </a>
        </div>
      </div>
    </aside>
  );
};