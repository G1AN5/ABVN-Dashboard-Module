import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { Shield, Users, FolderKanban, DollarSign, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdminSidebar({ isCollapsed, setIsCollapsed }) {
  const [orgOpen, setOrgOpen] = useState(true);
  const [progOpen, setProgOpen] = useState(false);
  const [finOpen, setFinOpen] = useState(false);

  const scrollProps = {
    spy: true, smooth: true, offset: -110, duration: 500,
    className: "flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors duration-200",
    activeClass: "bg-angat-pink text-white shadow-lg"
  };

  return (
    <aside className={`bg-gray-800 text-white fixed top-0 h-screen transition-all duration-300 ease-in-out z-30 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex flex-col h-full">
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="absolute -right-4 top-24 bg-white text-gray-800 p-2 rounded-full shadow-lg border">
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        <div className={`flex items-center transition-all duration-300 px-4 pt-24 pb-8 ${isCollapsed ? 'justify-center' : ''}`}>
          <Shield size={isCollapsed ? 36 : 48} className="text-angat-pink flex-shrink-0" />
          {!isCollapsed && (
            <div className="ml-3 overflow-hidden">
              <p className="font-bold leading-tight truncate" title="Admin User">Admin User</p>
              <p className="text-sm text-gray-400 leading-tight truncate" title="admin@angatbuhay.ph">admin@angatbuhay.ph</p>
            </div>
          )}
        </div>

        <nav className="flex-grow overflow-y-auto px-4">
          {/* Organization Management */}
          <div>
            <div onClick={() => setOrgOpen(!orgOpen)} className="flex items-center justify-between p-3 my-1 rounded-lg cursor-pointer hover:bg-gray-700">
              <div className="flex items-center">
                <Users size={20} />
                {!isCollapsed && <span className="ml-4 font-semibold text-sm">Organization Mgt.</span>}
              </div>
              {!isCollapsed && <ChevronRight size={20} className={`transition-transform duration-300 ${orgOpen ? 'rotate-90' : ''}`} />}
            </div>
            {orgOpen && !isCollapsed && (
              <div className="pl-8 text-gray-300">
                <Link to="all-orgs" {...scrollProps} activeClass="bg-angat-pink text-white" className={`${scrollProps.className} hover:bg-gray-700`}><span className="text-sm">All Organizations</span></Link>
                <Link to="review-apps" {...scrollProps} activeClass="bg-angat-pink text-white" className={`${scrollProps.className} hover:bg-gray-700`}><span className="text-sm">Review Applications</span></Link>
              </div>
            )}
          </div>
          {/* Program Management */}
          <div>
            <div onClick={() => setProgOpen(!progOpen)} className="flex items-center justify-between p-3 my-1 rounded-lg cursor-pointer hover:bg-gray-700">
              <div className="flex items-center">
                <FolderKanban size={20} />
                {!isCollapsed && <span className="ml-4 font-semibold text-sm">Program & Proposal Mgt.</span>}
              </div>
              {!isCollapsed && <ChevronRight size={20} className={`transition-transform duration-300 ${progOpen ? 'rotate-90' : ''}`} />}
            </div>
            {progOpen && !isCollapsed && (
              <div className="pl-8 text-gray-300">
                <Link to="all-programs" {...scrollProps} activeClass="bg-angat-pink text-white" className={`${scrollProps.className} hover:bg-gray-700`}><span className="text-sm">All Programs List</span></Link>
                <Link to="review-proposals" {...scrollProps} activeClass="bg-angat-pink text-white" className={`${scrollProps.className} hover:bg-gray-700`}><span className="text-sm">Review Proposals</span></Link>
              </div>
            )}
          </div>
          {/* Financial Management */}
          <div>
            <div onClick={() => setFinOpen(!finOpen)} className="flex items-center justify-between p-3 my-1 rounded-lg cursor-pointer hover:bg-gray-700">
              <div className="flex items-center">
                <DollarSign size={20} />
                {!isCollapsed && <span className="ml-4 font-semibold text-sm">Financial Mgt.</span>}
              </div>
              {!isCollapsed && <ChevronRight size={20} className={`transition-transform duration-300 ${finOpen ? 'rotate-90' : ''}`} />}
            </div>
            {finOpen && !isCollapsed && (
              <div className="pl-8 text-gray-300">
                <Link to="fund-disbursement" {...scrollProps} activeClass="bg-angat-pink text-white" className={`${scrollProps.className} hover:bg-gray-700`}><span className="text-sm">Fund Disbursement</span></Link>
                <Link to="review-reports" {...scrollProps} activeClass="bg-angat-pink text-white" className={`${scrollProps.className} hover:bg-gray-700`}><span className="text-sm">Review Financial Reports</span></Link>
              </div>
            )}
          </div>
          <hr className="my-4 border-gray-600"/>
          <Link to="admin-settings" {...scrollProps} activeClass="bg-angat-pink text-white" className={`${scrollProps.className} hover:bg-gray-700`}>
            <Settings size={20} />
            {!isCollapsed && <span className="ml-4 font-semibold text-sm">Admin & System Settings</span>}
          </Link>
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-600 px-4 pb-4">
          <a href="#" className="flex items-center p-3 my-1 rounded-lg hover:bg-gray-700">
            <LogOut size={20} />
            {!isCollapsed && <span className="ml-4 font-semibold text-sm">Logout</span>}
          </a>
        </div>
      </div>
    </aside>
  );
};