import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import SectionWrapper from '../../components/SectionWrapper';
import { getSupabaseApiAuthenticated, getSupabaseStorageClient } from '../../api/supabaseClient';
import { X, Calendar, MapPin, Users, DollarSign, FileText } from 'lucide-react';

// Modal component for viewing program details
const ProgramDetailsModal = ({ program, onClose }) => {
    if (!program) return null;

    const handleViewProposal = async (filePath) => {
        if (!filePath) {
            alert("No proposal document attached.");
            return;
        }
        try {
            const storageClient = getSupabaseStorageClient();
            const { data, error } = await storageClient.storage.from('programsandprojects').createSignedUrl(filePath, 3600); // URL valid for 1 hour
            if (error) throw error;
            window.open(data.signedUrl, '_blank');
        } catch (err) {
            console.error("Error creating signed URL:", err);
            alert("Could not open the proposal document.");
        }
    };

    const formatDate = (dateString) => new Date(dateString).toLocaleString();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800">{program.name}</h3>
                        <p className="text-sm text-gray-500">Proposed by: {program.organization?.name || 'N/A'}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center"><DollarSign size={16} className="mr-2 text-gray-500" /> <strong>Budget: </strong> PHP {parseFloat(program.budget).toFixed(2)}</div>
                    <div className="flex items-center"><Users size={16} className="mr-2 text-gray-500" /> <strong>Beneficiaries: </strong> {program.beneficiaries}</div>
                    <div className="flex items-center col-span-full"><MapPin size={16} className="mr-2 text-gray-500" /> <strong>Location: </strong> {program.location}</div>
                    <div className="flex items-center"><Calendar size={16} className="mr-2 text-gray-500" /> <strong>Start: </strong> {formatDate(program.date_time_start)}</div>
                    <div className="flex items-center"><Calendar size={16} className="mr-2 text-gray-500" /> <strong>End: </strong> {formatDate(program.date_time_end)}</div>
                </div>
                <div className="mt-6 pt-4 border-t flex justify-end">
                    <button onClick={() => handleViewProposal(program.proposal_document)} className="flex items-center bg-angat-blue text-white font-bold py-2 px-4 rounded-lg hover:opacity-90">
                        <FileText size={16} className="mr-2"/> View Full Proposal
                    </button>
                </div>
            </div>
        </div>
    );
};


const ProgramRow = ({ program, onSelect }) => {
  const statusColor = {
    'Active': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800',
    'Completed': 'bg-blue-100 text-blue-800',
    'P': 'bg-yellow-100 text-yellow-800',
  };
  const statusText = {
      'P': 'Pending Approval',
      'Active': 'Active',
      'Rejected': 'Rejected',
      'Completed': 'Completed'
  }
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-6 font-semibold text-gray-700">{program.name}</td>
      <td className="py-3 px-6 text-gray-600">{program.organization?.name || 'N/A'}</td>
      <td className="py-3 px-6">
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColor[program.status]}`}>
          {statusText[program.status] || program.status}
        </span>
      </td>
      <td className="py-3 px-6 text-right font-mono text-gray-700">{parseFloat(program.budget).toFixed(2)}</td>
      <td className="py-3 px-6 text-right">
        <button onClick={() => onSelect(program.id)} className="text-angat-blue hover:underline text-xs font-bold">View Details</button>
      </td>
    </tr>
  );
};

export default function ProgramManagementSection() {
    const [allPrograms, setAllPrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const pendingProposals = allPrograms.filter(p => p.status === 'P');

    const fetchPrograms = async () => {
        setLoading(true);
        setError(null);
        try {
            const api = getSupabaseApiAuthenticated();
            const { data, error: reqError } = await api.get('/admin/all');
            if (reqError) throw reqError;
            setAllPrograms(data);
        } catch (err) {
            console.error("Error fetching programs:", err);
            setError("Could not fetch programs.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    const handleSelectProgram = async (programId) => {
        try {
            const api = getSupabaseApiAuthenticated();
            const { data } = await api.get(`/admin/program/${programId}`);
            setSelectedProgram(data);
        } catch (err) {
            console.error("Error fetching program details:", err);
            alert("Could not load program details.");
        }
    };

    const handleUpdateProposal = async (proposalId, newStatus) => {
        try {
            const api = getSupabaseApiAuthenticated();
            await api.post(`/admin/proposals/${proposalId}`, { status: newStatus });
            alert(`Proposal has been ${newStatus.toLowerCase()}!`);
            // Refresh the list to show the change
            fetchPrograms();
        } catch (err) {
            console.error(`Error updating proposal:`, err);
            alert(`Failed to update proposal status.`);
        }
    };

    const handleViewProposal = async (filePath) => {
        if (!filePath) {
            alert("No proposal document attached to this program.");
            return;
        }
        try {
            const storageClient = getSupabaseStorageClient();
            const { data, error } = await storageClient
                .storage
                .from('programsandprojects')
                .createSignedUrl(filePath, 3600); // URL valid for 1 hour

            if (error) throw error;
            window.open(data.signedUrl, '_blank');
        } catch (err) {
            console.error("Error creating signed URL:", err);
            alert("Could not open the proposal document.");
        }
    };

  return (
    <>
      {selectedProgram && <ProgramDetailsModal program={selectedProgram} onClose={() => setSelectedProgram(null)} />}
      <Element name="all-programs">
        <SectionWrapper name="all-programs" title="All Programs & Projects List">
          {loading && <p className="text-center p-4">Loading programs...</p>}
          {error && <p className="text-center p-4 text-red-500">{error}</p>}
          {!loading && allPrograms.length === 0 && <p className="text-center p-4 text-gray-500">No programs found.</p>}
          {!loading && allPrograms.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600 uppercase">
                  <tr>
                    <th className="py-3 px-6">Program Title</th>
                    <th className="py-3 px-6">Organization</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6 text-right">Budget (PHP)</th>
                    <th className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody>
                  {allPrograms.map(program => (
                      <ProgramRow key={program.id} program={program} onSelect={handleSelectProgram} />
                  ))}
              </tbody>
              </table>
            </div>
          )}
        </SectionWrapper>
      </Element>
      <Element name="review-proposals">
        <SectionWrapper name="review-proposals" title="Review Program Proposals">
            {loading && <p className="text-center p-4">Loading proposals...</p>}
            {!loading && pendingProposals.length === 0 && (
                <p className="text-center p-4 text-gray-500">No new proposals to review.</p>
            )}
            {!loading && pendingProposals.map(proposal => (
                <div key={proposal.id} className="bg-blue-50 border-l-4 border-angat-blue p-4 rounded-r-lg mb-4">
                    <h3 className="font-bold">{proposal.name}</h3>
                    <p className="text-sm text-gray-600">Proposed by: <span className="font-semibold">{proposal.organization?.name || 'Unknown Org'}</span></p>
                    <p className="text-sm text-gray-700 mt-1">A proposal for {proposal.beneficiaries} beneficiaries. Budget request: PHP {parseFloat(proposal.budget).toFixed(2)}.</p>
                    <div className="mt-4 flex space-x-4">
                    <button onClick={() => handleUpdateProposal(proposal.id, 'Active')} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600">Approve</button>
                    <button onClick={() => handleUpdateProposal(proposal.id, 'Rejected')} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600">Reject</button>
                    <button onClick={() => handleViewProposal(proposal.proposal_document)} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">View Full Proposal</button>
                    </div>
                </div>
            ))}
        </SectionWrapper>
      </Element>
    </>
  );
}