import React, { useState, useEffect } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { getSupabaseClientAuthenticated } from '../api/supabaseClient';

export default function SubmitReportSection() {
  const [activePrograms, setActivePrograms] = useState([]);
  
  // Fetch active programs to populate the dropdown
  useEffect(() => {
    const fetchActivePrograms = async () => {
        try {
            const supabase = getSupabaseClientAuthenticated();
            // Fetching programs with 'Active' status ('A')
            const { data, error } = await supabase.get('/programs_and_projects?status=eq.A');
            if (error) throw error;
            setActivePrograms(data);
        } catch (error) {
            console.error("Error fetching active programs:", error);
        }
    };
    fetchActivePrograms();
  }, []);

  // Note: The form submission logic for reports would be similar to the
  // "Propose a New Program" section, but would likely point to a different
  // table (e.g., 'program_reports') which is not in the provided schema.
  // This is a placeholder for the UI and data fetching part.

  return (
    <SectionWrapper name="submit-report" title="Submit a Report">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Report Type</label>
            <select className="shadow-inner border rounded w-full py-2 px-3 text-gray-700">
                <option>Quarterly Progress Report</option>
                <option>Event Completion Report</option>
                <option>Beneficiary Impact Story</option>
            </select>
        </div>
        <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Associated Program/Project</label>
            <select className="shadow-inner border rounded w-full py-2 px-3 text-gray-700">
                {activePrograms.length > 0 ? (
                    activePrograms.map(program => (
                        <option key={program.id} value={program.id}>{program.name}</option>
                    ))
                ) : (
                    <option disabled>No active programs</option>
                )}
            </select>
        </div>
        <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-2 text-gray-700">Attach Report File (PDF, DOCX)</label>
            <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-angat-blue file:text-white hover:file:bg-angat-pink"/>
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-8">
        <button className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600">Edit Last Submission</button>
        <button className="bg-angat-pink text-white font-bold py-2 px-4 rounded-lg hover:opacity-90">Submit Report</button>
      </div>
    </SectionWrapper>
  );
};