import React, { useState } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { getSupabaseApiAuthenticated } from '../api/supabaseClient';

const InputField = ({ label, placeholder, name, value, onChange, type = "text", required = false }) => (
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

const TextArea = ({ label, placeholder, name, value, onChange }) => (
    <div className="md:col-span-2">
        <label className="block text-sm font-bold mb-2 text-gray-700">{label}</label>
        <textarea
            rows="4"
            className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
        ></textarea>
    </div>
);

export default function ProposeProgramSection() {
    const [formData, setFormData] = useState({
        name: '',
        beneficiaries: '',
        budget: '',
        location: '',
        date_time_start: '',
        date_time_end: '',
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("A proposal document is required.");
            return;
        }
        setLoading(true);
        setError(null);
        setSuccess(null);

        const submissionData = new FormData();
        // Append form text data
        for (const key in formData) {
            submissionData.append(key, formData[key]);
        }
        // Append file data
        submissionData.append('proposal_document', file);

        try {
            const api = getSupabaseApiAuthenticated();
            // This now correctly calls POST /programs-and-projects
            const { data } = await api.post('/', submissionData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log('Proposal successful:', data);
            setSuccess('Program proposed successfully! It is now pending admin review.');
            // Reset form
            setFormData({ name: '', beneficiaries: '', budget: '', location: '', date_time_start: '', date_time_end: '' });
            setFile(null);
            e.target.reset();
        } catch (err) {
            console.error('Proposal error:', err.response ? err.response.data : err.message);
            setError(err.response?.data?.error || 'Failed to propose program. Please try again.');
        } finally {
            setLoading(false);
        }
    };

  return (
    <SectionWrapper name="propose-program" title="Propose a New Program">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Program Title" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Community Livelihood Workshop" required />
            <InputField label="Target Location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Brgy. Santo Tomas, Pasig City" required />
            <InputField label="Target Beneficiaries (Count)" name="beneficiaries" value={formData.beneficiaries} onChange={handleChange} type="number" placeholder="e.g., 100" required />
            <InputField label="Proposed Budget (PHP)" name="budget" value={formData.budget} onChange={handleChange} type="number" placeholder="e.g., 250000.00" required />
            <InputField label="Start Date" name="date_time_start" value={formData.date_time_start} onChange={handleChange} type="datetime-local" required />
            <InputField label="End Date" name="date_time_end" value={formData.date_time_end} onChange={handleChange} type="datetime-local" required />

            <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2 text-gray-700">Attach Full Proposal Document (PDF, DOCX)</label>
                <input type="file" name="proposal_document" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-angat-blue file:text-white hover:file:bg-angat-pink" required/>
            </div>
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && <p className="text-green-600 text-center mt-4">{success}</p>}

        <div className="flex justify-end space-x-4 mt-8">
            <button type="submit" disabled={loading} className="bg-angat-pink text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 disabled:opacity-50">
                {loading ? 'Submitting...' : 'Propose'}
            </button>
        </div>
      </form>
    </SectionWrapper>
  );
};