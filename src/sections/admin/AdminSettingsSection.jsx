import React from 'react';
import SectionWrapper from '../../components/SectionWrapper';

export default function AdminSettingsSection() {
  return (
    <SectionWrapper name="admin-settings" title="Admin & System Settings">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold text-lg mb-2">Manage Admin Users</h3>
          <p className="text-sm text-gray-600 mb-4">Add or remove staff who have access to this administrator panel.</p>
          <button className="bg-angat-blue text-white font-bold py-2 px-4 rounded-lg hover:opacity-90">Manage Users</button>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">System Configuration</h3>
          <p className="text-sm text-gray-600 mb-4">Set up email notification templates, reporting deadlines, and other system-wide settings.</p>
          <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600">Configure Settings</button>
        </div>
      </div>
    </SectionWrapper>
  );
}