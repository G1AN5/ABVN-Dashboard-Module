import React, { useState, useEffect } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { getSupabaseApiAuthenticated } from '../api/supabaseClient';

const InputField = ({ label, placeholder, type = 'text', name, value, onChange }) => (
    <div>
        <label className="block text-sm font-bold mb-2 text-gray-700">{label}</label>
        <input
            type={type}
            className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
        />
    </div>
);

export default function AccountSettingsSection() {
    const [profile, setProfile] = useState({
        organization_name: '',
        contact_person_name: '',
        user_email: '', // Email is not editable for now
        contact_person_number: '',
        organization_address: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
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
                setError("Could not load your organization's profile.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const api = getSupabaseApiAuthenticated();
            await api.post('/organization-profile', profile);
            setSuccess("Profile updated successfully!");
        } catch (err) {
            console.error("Error updating profile:", err);
            setError("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

  return (
    <>
      <SectionWrapper name="edit-profile" title="Edit Organization Profile">
        {loading && <p>Loading profile...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && (
            <form onSubmit={handleSaveChanges}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Organization Name" name="organization_name" value={profile.organization_name} onChange={handleChange} placeholder="Your Organization Inc." />
                    <InputField label="Contact Person" name="contact_person_name" value={profile.contact_person_name} onChange={handleChange} placeholder="Juan dela Cruz" />
                    <InputField label="Contact Email" name="user_email" value={profile.user_email} onChange={handleChange} placeholder="your.email@example.com" />
                    <InputField label="Contact Number" name="contact_person_number" value={profile.contact_person_number} onChange={handleChange} placeholder="09171234567" />
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold mb-2 text-gray-700">Address</label>
                        <textarea rows="3" className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700" name="organization_address" value={profile.organization_address} onChange={handleChange} placeholder="123 Mabini St, Brgy. Kapayapaan, Manila"></textarea>
                    </div>
                </div>
                {success && <p className="text-green-600 text-center mt-4">{success}</p>}
                <div className="flex justify-end space-x-4 mt-8">
                    <button type="button" className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="bg-angat-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-angat-pink">Save Changes</button>
                </div>
            </form>
        )}
      </SectionWrapper>

      <SectionWrapper name="account-settings" title="Account Settings">
        {/* Password functionality remains the same */}
      </SectionWrapper>
    </>
  );
};
