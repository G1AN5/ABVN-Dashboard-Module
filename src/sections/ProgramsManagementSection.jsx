import React, { useState, useEffect } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { getSupabaseClientAuthenticated } from '../api/supabaseClient';

const ProgramRow = ({ title, status, beneficiaries, budget }) => {
  const statusMap = {
    'P': { text: 'Pending Approval', style: 'bg-yellow-100 text-yellow-800' },
    'A': { text: 'Active', style: 'bg-green-100 text-green-800' },
    'C': { text: 'Completed', style: 'bg-blue-100 text-blue-800' },
  };
  const statusInfo = statusMap[status] || { text: 'Unknown', style: 'bg-gray-100 text-gray-800' };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-6 font-semibold text-gray-700">{title}</td>
      <td className="py-3 px-6">
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusInfo.style}`}>
          {statusInfo.text}
        </span>
      </td>
      <td className="py-3 px-6 text-center text-gray-600">{beneficiaries}</td>
      <td className="py-3 px-6 text-right font-mono text-gray-700">{budget.toLocaleString('en-US', { style: 'currency', currency: 'PHP' })}</td>
    </tr>
  );
};

export default function ProgramsManagementSection() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const supabase = getSupabaseClientAuthenticated();
        // The RLS policy ensures we only get projects for this user's organization
        const { data, error } = await supabase.get('/programs_and_projects?select=*');
        if (error) throw error;
        setPrograms(data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  return (
    <SectionWrapper name="programs-management" title="Programs & Projects Management">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="py-3 px-6">Program / Project Title</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6 text-center">Beneficiaries</th>
              <th className="py-3 px-6 text-right">Budget (PHP)</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {loading ? (
              <tr><td colSpan="4" className="text-center p-4">Loading projects...</td></tr>
            ) : programs.length > 0 ? (
              programs.map(program => (
                <ProgramRow key={program.id} title={program.name} status={program.status} beneficiaries={program.beneficiaries} budget={program.budget} />
              ))
            ) : (
              <tr><td colSpan="4" className="text-center p-4">No programs or projects found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
};