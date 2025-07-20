import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardSection from '../sections/DashboardSection';
import RecentActivitySection from '../sections/RecentActivitySection';
import ProgramsManagementSection from '../sections/ProgramsManagementSection';
import FinancialsSection from '../sections/FinancialsSection';
import ProposeProgramSection from '../sections/ProposeProgramSection';
import SubmitReportSection from '../sections/SubmitReportSection';
import AccountSettingsSection from '../sections/AccountSettingsSection';

export default function DashboardPage() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-5rem)]">
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />
      
      <div className={`flex-grow p-4 md:p-10 transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        <div>
            <div className="bg-angat-blue text-white p-6 rounded-lg mb-10">
              <h1 className="text-3xl font-bold">WELCOME, USER!</h1>
            </div>
            
            <DashboardSection />
            <RecentActivitySection />
            <ProgramsManagementSection />
            <FinancialsSection />
            <ProposeProgramSection />
            <SubmitReportSection />
            <AccountSettingsSection />
        </div>
      </div>
    </div>
  );
};