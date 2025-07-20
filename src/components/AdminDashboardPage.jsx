import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import OrganizationManagementSection from '../sections/admin/OrganizationManagementSection';
import ProgramManagementSection from '../sections/admin/ProgramManagementSection';
import FinancialManagementSection from '../sections/admin/FinancialManagementSection';
import AdminSettingsSection from '../sections/admin/AdminSettingsSection';

export default function AdminDashboardPage() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-5rem)]">
      <AdminSidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />
      
      <div className={`flex-grow p-4 md:p-10 transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        <div>
            <div className="bg-angat-pink text-white p-6 rounded-lg mb-10">
              <h1 className="text-3xl font-bold">ADMINISTRATOR DASHBOARD</h1>
            </div>
            
            <OrganizationManagementSection />
            <ProgramManagementSection />
            <FinancialManagementSection />
            <AdminSettingsSection />
        </div>
      </div>
    </div>
  );
};