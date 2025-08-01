import React, { useState, useEffect } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { getSupabaseClientAuthenticated, getSupabaseStorageClient } from '../api/supabaseClient';

const InputField = ({ label, placeholder, name, value, onChange, type = 'text' }) => (
    <div>
        <label className="block text-sm font-bold mb-2 text-gray-700">{label}</label>
        <input type={type} name={name} value={value} onChange={onChange} className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700" placeholder={placeholder} required/>
    </div>
);

const TextArea = ({ label, placeholder, name, value, onChange }) => (
    <div className="md:col-span-2">
        <label className="block text-sm font-bold mb-2 text-gray-700">{label}</label>
        <textarea rows="4" name={name} value={value} onChange={onChange} className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700" placeholder={placeholder} required></textarea>
    </div>
);

export default function ProposeProgramSection() {
    const [org, setOrg] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        beneficiaries: '',
        budget: '',
        location: '',
        date_time_start: '',
        date_time_end: '',
    });
    const [proposalFile, setProposalFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchOrg = async () => {
            const supabase = getSupabaseClientAuthenticated();
            const { data, error } = await supabase.get('/organization?select=id,name').limit(1).single();
            if (data) setOrg(data);
        };
        fetchOrg();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setProposalFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!proposalFile || !org) {
            alert("Please fill all fields and attach a proposal document.");
            return;
        }
        setSubmitting(true);

        try {
            const supabaseStorage = getSupabaseStorageClient();
            const filePath = `${org.name}/${Date.now()}_${proposalFile.name}`;
            
            // FIX: Changed 'proposals' to the correct bucket name 'programsandprojects'
            const { error: uploadError } = await supabaseStorage.storage
                .from('programsandprojects') 
                .upload(filePath, proposalFile);
            
            if (uploadError) throw uploadError;

            const supabase = getSupabaseClientAuthenticated();
            const dataToInsert = {
                ...formData,
                submitted_by: org.id,
                proposal_document: filePath,
            };
            const { error: insertError } = await supabase.post('/programs_and_projects', dataToInsert);

            if (insertError) throw insertError;

            alert('Program proposed successfully!');
            setFormData({ name: '', beneficiaries: '', budget: '', location: '', date_time_start: '', date_time_end: '' });
            setProposalFile(null);
            e.target.reset();

        } catch (error) {
            console.error("Error proposing program:", error);
            alert("Failed to propose program. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

  return (
    <SectionWrapper name="propose-program" title="Propose a New Program">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Program Title" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Community Livelihood Workshop" />
            <InputField label="Target Beneficiaries" name="beneficiaries" value={formData.beneficiaries} onChange={handleChange} type="number" placeholder="e.g., 100" />
            <InputField label="Proposed Budget (PHP)" name="budget" value={formData.budget} onChange={handleChange} type="number" placeholder="e.g., 250000" />
            <InputField label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Brgy. Santo Tomas, Pasig City" />
            <InputField label="Start Date" name="date_time_start" value={formData.date_time_start} onChange={handleChange} type="datetime-local" />
            <InputField label="End Date" name="date_time_end" value={formData.date_time_end} onChange={handleChange} type="datetime-local" />
            
            <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2 text-gray-700">Attach Full Proposal Document (PDF, DOCX)</label>
                <input type="file" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-angat-blue file:text-white hover:file:bg-angat-pink" required/>
            </div>
        </div>
        <div className="flex justify-end space-x-4 mt-8">
            <button type="button" className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600">Follow-Up on Existing</button>
            <button type="button" className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600">Save as Draft</button>
            <button type="submit" disabled={submitting} className="bg-angat-pink text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 disabled:opacity-50">
                {submitting ? 'Submitting...' : 'Propose'}
            </button>
        </div>
      </form>
    </SectionWrapper>
  );
};