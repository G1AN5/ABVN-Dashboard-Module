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
    <div className="flex pt-16">
      <Sidebar />
      <div className="flex-grow p-4 md:p-10 ml-64 transition-all duration-300">
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
  );
};