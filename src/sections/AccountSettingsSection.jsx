import React from 'react';
import SectionWrapper from '../components/SectionWrapper';

const InputField = ({ label, placeholder, type = 'text' }) => (
    <div>
        <label className="block text-sm font-bold mb-2 text-gray-700">{label}</label>
        <input type={type} className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700" placeholder={placeholder} />
    </div>
);

export default function AccountSettingsSection() {
  return (
    <>
      <SectionWrapper name="edit-profile" title="Edit Organization Profile">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Organization Name" placeholder="Bayanihan Org Inc." />
            <InputField label="Contact Person" placeholder="Juan dela Cruz" />
            <InputField label="Contact Email" placeholder="bayanihan.org@email.com" />
            <InputField label="Contact Number" placeholder="09171234567" />
            <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2 text-gray-700">Address</label>
                <textarea rows="3" className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700" placeholder="123 Mabini St, Brgy. Kapayapaan, Manila"></textarea>
            </div>
        </div>
        <div className="flex justify-end space-x-4 mt-8">
            <button className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">Cancel</button>
            <button className="bg-angat-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-angat-pink">Save Changes</button>
        </div>
      </SectionWrapper>
      
      <SectionWrapper name="account-settings" title="Account Settings">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
            <InputField label="Current Password" type="password" placeholder="******************" />
            <div className="md:col-span-2"></div>
            <InputField label="New Password" type="password" placeholder="******************" />
            <InputField label="Confirm New Password" type="password" placeholder="******************" />
        </div>
        <div className="flex justify-end mt-8 max-w-lg mx-auto">
            <button className="bg-angat-pink text-white font-bold py-2 px-4 rounded-lg hover:opacity-90">Update Password</button>
        </div>
      </SectionWrapper>
    </>
  );
};