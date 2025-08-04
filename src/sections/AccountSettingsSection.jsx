import React, { useState, useEffect } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { getSupabaseApiAuthenticated } from '../api/supabaseClient';
import axios from 'axios'; // We need axios to call the change-password function

const InputField = ({ label, placeholder, type = 'text', name, value, onChange, required = false }) => (
    <div>
        <label className="block text-sm font-bold mb-2 text-gray-700">{label}</label>
        <input
            type={type}
            className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);

export default function AccountSettingsSection({ onProfileUpdate }) {
    // State for the Profile Form
    const [profile, setProfile] = useState({
        organization_name: '',
        contact_person_name: '',
        contact_person_number: '',
        organization_address: '',
    });
    const [profileLoading, setProfileLoading] = useState(true);
    const [profileError, setProfileError] = useState(null);
    const [profileSuccess, setProfileSuccess] = useState(null);

    // State for the Password Form
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordError, setPasswordError] = useState(null);
    const [passwordSuccess, setPasswordSuccess] = useState(null);


    useEffect(() => {
        const fetchProfile = async () => {
            setProfileLoading(true);
            try {
                const api = getSupabaseApiAuthenticated();
                const { data } = await api.get('/organization-profile');
                setProfile({
                    organization_name: data.name || '',
                    contact_person_name: data.contact_persons?.name || '',
                    contact_person_number: data.contact_persons?.number || '',
                    organization_address: data.address || '',
                });
            } catch (err) {
                console.error("Error fetching profile:", err);
                setProfileError("Could not load your organization's profile.");
            } finally {
                setProfileLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
    };

    const handleProfileSave = async (e) => {
        e.preventDefault();
        setProfileLoading(true);
        setProfileError(null);
        setProfileSuccess(null);
        try {
            const api = getSupabaseApiAuthenticated();
            await api.post('/organization-profile', profile);
            setProfileSuccess("Profile updated successfully!");
            if (onProfileUpdate) {
                onProfileUpdate();
            }
        } catch (err) {
            console.error("Error updating profile:", err);
            setProfileError("Failed to update profile. Please try again.");
        } finally {
            setProfileLoading(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        setPasswordError(null);
        setPasswordSuccess(null);

        if (passwords.newPassword.length < 6) {
            setPasswordError("New password must be at least 6 characters long.");
            return;
        }

        if (passwords.newPassword !== passwords.confirmPassword) {
            setPasswordError("New passwords do not match.");
            return;
        }

        setPasswordLoading(true);
        try {
            const session = JSON.parse(localStorage.getItem('auth_session'));
            const token = session?.access_token;
            const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

            // Call the existing change-password function
            await axios.post(
                `${supabaseUrl}/functions/v1/change-password`,
                {
                    currentPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword
                },
                { headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }}
            );

            setPasswordSuccess("Password updated successfully!");
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' }); // Clear fields
        } catch (err) {
            console.error("Error updating password:", err.response ? err.response.data : err.message);
            setPasswordError(err.response?.data?.error || "Failed to update password.");
        } finally {
            setPasswordLoading(false);
        }
    };

  return (
    <>
      <SectionWrapper name="edit-profile" title="Edit Organization Profile">
        {profileLoading && <p>Loading profile...</p>}
        {profileError && <p className="text-red-500">{profileError}</p>}
        {!profileLoading && (
            <form onSubmit={handleProfileSave}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Organization Name" name="organization_name" value={profile.organization_name} onChange={handleProfileChange} />
                    <InputField label="Contact Person" name="contact_person_name" value={profile.contact_person_name} onChange={handleProfileChange} />
                    <InputField label="Contact Number" name="contact_person_number" value={profile.contact_person_number} onChange={handleProfileChange} />
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold mb-2 text-gray-700">Address</label>
                        <textarea rows="3" className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700" name="organization_address" value={profile.organization_address} onChange={handleProfileChange}></textarea>
                    </div>
                </div>
                {profileSuccess && <p className="text-green-600 text-center mt-4">{profileSuccess}</p>}
                <div className="flex justify-end space-x-4 mt-8">
                    <button type="button" className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button type="submit" disabled={profileLoading} className="bg-angat-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-angat-pink disabled:opacity-50">Save Changes</button>
                </div>
            </form>
        )}
      </SectionWrapper>

      <SectionWrapper name="account-settings" title="Account Settings">
        <form onSubmit={handlePasswordUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
                <div className="md:col-span-2">
                    <InputField label="Current Password" type="password" name="currentPassword" value={passwords.currentPassword} onChange={handlePasswordChange} placeholder="******************" required />
                </div>
                <InputField label="New Password" type="password" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} placeholder="******************" required />
                <InputField label="Confirm New Password" type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} placeholder="******************" required />
            </div>
             {passwordError && <p className="text-red-500 text-center mt-4">{passwordError}</p>}
             {passwordSuccess && <p className="text-green-600 text-center mt-4">{passwordSuccess}</p>}
            <div className="flex justify-end mt-8 max-w-lg mx-auto">
                <button type="submit" disabled={passwordLoading} className="bg-angat-pink text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 disabled:opacity-50">
                    {passwordLoading ? 'Updating...' : 'Update Password'}
                </button>
            </div>
        </form>
      </SectionWrapper>
    </>
  );
};