import React from 'react';
import Sidebar from './Sidebar';
import DashboardSection from '../sections/DashboardSection';
import RecentActivitySection from '../sections/RecentActivitySection';
import ProgramsManagementSection from '../sections/ProgramsManagementSection';
import FinancialsSection from '../sections/FinancialsSection';
import ProposeProgramSection from '../sections/ProposeProgramSection';
import SubmitReportSection from '../sections/SubmitReportSection';
import AccountSettingsSection from '../sections/AccountSettingsSection';

export default function DashboardPage() {
  return (
    // The main container for the dashboard view
    <div className="flex">
      {/* The collapsible sidebar component */}
      <Sidebar />
      {/* The main content area that will scroll */}
      {/* FIX: Removed pt-24 from here and moved it to the inner div */}
      <div className="flex-grow p-4 md:p-10 ml-64 transition-all duration-300">
        {/* FIX: Added pt-24 here to correctly offset for the navbar */}
        <div className="pt-20">
            <div className="bg-angat-blue text-white p-6 rounded-lg mb-10">
              <h1 className="text-3xl font-bold">WELCOME, USER!</h1>
            </div>
            
            {/* Sections in correct order */}
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