import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import DashboardSection from '../sections/DashboardSection';
import RecentActivitySection from '../sections/RecentActivitySection';
import ProgramsManagementSection from '../sections/ProgramsManagementSection';
import FinancialsSection from '../sections/FinancialsSection';
import ProposeProgramSection from '../sections/ProposeProgramSection';
import SubmitReportSection from '../sections/SubmitReportSection';
import AccountSettingsSection from '../sections/AccountSettingsSection';
import { getSupabaseApiAuthenticated } from '../api/supabaseClient';
import { createClient } from '@supabase/supabase-js'; // Import the main client to get user data

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export default function DashboardPage() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // State to hold org info
  const [userEmail, setUserEmail] = useState("..."); // State for the user's email

  // This function will now fetch BOTH the organization profile and the user's email
  const fetchUserInfo = async () => {
    try {
      // Fetch organization profile
      const api = getSupabaseApiAuthenticated();
      const { data: profileData } = await api.get('/organization-profile');
      setUserInfo(profileData);

      // Fetch user's email from the auth session
      const sessionData = localStorage.getItem('auth_session');
      if (sessionData) {
        const session = JSON.parse(sessionData);
        const supabase = createClient(supabaseUrl, supabaseAnonKey, {
          global: { headers: { Authorization: `Bearer ${session.access_token}` } }
        });
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserEmail(user.email);
        }
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const orgName = userInfo?.name?.toUpperCase() || 'USER';

  return (
    <div className="flex min-h-[calc(100vh-5rem)]">
      {/* Pass both the org info and the email down to the Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        userInfo={userInfo}
        userEmail={userEmail}
      />

      <div className={`flex-grow p-4 md:p-10 transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        <div>
            <div className="bg-angat-blue text-white p-6 rounded-lg mb-10">
              <h1 className="text-3xl font-bold">WELCOME, {orgName}!</h1>
            </div>

            <DashboardSection />
            <RecentActivitySection />
            <ProgramsManagementSection />
            <FinancialsSection />
            <ProposeProgramSection />
            <SubmitReportSection />
            <AccountSettingsSection onProfileUpdate={fetchUserInfo} />
        </div>
      </div>
    </div>
  );
};