import React, { useState, useEffect } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { getSupabaseApiAuthenticated } from '../api/supabaseClient';

const ProgramRow = ({ name, status, beneficiaries, budget }) => {
  const statusColor = {
    'Active': 'bg-green-100 text-green-800',
    'Pending Approval': 'bg-yellow-100 text-yellow-800',
    'Completed': 'bg-blue-100 text-blue-800',
    'P': 'bg-yellow-100 text-yellow-800', // For Pending
  };

  const statusText = {
      'P': 'Pending Approval'
  }

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-6 font-semibold text-gray-700">{name}</td>
      <td className="py-3 px-6">
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColor[status]}`}>
          {statusText[status] || status}
        </span>
      </td>
      <td className="py-3 px-6 text-center text-gray-600">{beneficiaries}</td>
      <td className="py-3 px-6 text-right font-mono text-gray-700">{parseFloat(budget).toFixed(2)}</td>
    </tr>
  );
};

export default function ProgramsManagementSection() {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const api = getSupabaseApiAuthenticated();
                // This now correctly calls GET /programs-and-projects
                const { data, error: reqError } = await api.get('/');
                if (reqError) throw reqError;
                setPrograms(data);
            } catch (err) {
                console.error("Error fetching programs:", err);
                setError("Could not fetch your organization's programs.");
            } finally {
                setLoading(false);
            }
        };
        fetchPrograms();
    }, []);

  return (
    <SectionWrapper name="programs-management" title="Programs & Projects Management">
      <div className="overflow-x-auto">
        {loading && <p className="text-center p-4">Loading your programs...</p>}
        {error && <p className="text-center p-4 text-red-500">{error}</p>}
        {!loading && !error && (
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
                {programs.length > 0 ? (
                    programs.map(program => <ProgramRow key={program.id} {...program} />)
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center p-4 text-gray-500">You have not submitted any programs yet.</td>
                    </tr>
                )}
            </tbody>
            </table>
        )}
      </div>
    </SectionWrapper>
  );
};