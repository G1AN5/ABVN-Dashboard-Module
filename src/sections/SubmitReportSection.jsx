import React, { useState, useEffect } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { getSupabaseApiAuthenticated } from '../api/supabaseClient';

export default function SubmitReportSection() {
  const [reportType, setReportType] = useState('Quarterly Progress Report');
  const [associatedProgram, setAssociatedProgram] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [approvedPrograms, setApprovedPrograms] = useState([]);

  useEffect(() => {
    const fetchApprovedPrograms = async () => {
      try {
        const api = getSupabaseApiAuthenticated();
        const { data } = await api.get('/'); // Gets all programs for the user's org
        const activePrograms = data.filter(p => p.status === 'Active');
        setApprovedPrograms(activePrograms);
        // Set default dropdown value if there are active programs
        if (activePrograms.length > 0) {
          setAssociatedProgram(activePrograms[0].name);
        }
      } catch (err) {
        console.error("Error fetching approved programs:", err);
        setError("Could not load your organization's approved programs.");
      }
    };
    fetchApprovedPrograms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please attach a report file.');
      return;
    }
    if (!associatedProgram) {
      setError('Please select an associated program.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('reportType', reportType);
    formData.append('associatedProgram', associatedProgram);
    formData.append('file', file);

    try {
      const api = getSupabaseApiAuthenticated();
      const { data } = await api.post('/reports', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Report submitted successfully! It is now pending review.');
      setFile(null);
      e.target.reset();
    } catch (err) {
      console.error('Report submission error:', err.response ? err.response.data : err.message);
      setError(err.response?.data?.error || 'Failed to submit the report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper name="submit-report" title="Submit a Report">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="shadow-inner border rounded w-full py-2 px-3 text-gray-700"
              >
                  <option>Quarterly Progress Report</option>
                  <option>Event Completion Report</option>
                  <option>Beneficiary Impact Story</option>
              </select>
          </div>
          <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Associated Program/Project</label>
              <select
                value={associatedProgram}
                onChange={(e) => setAssociatedProgram(e.target.value)}
                className="shadow-inner border rounded w-full py-2 px-3 text-gray-700"
                disabled={approvedPrograms.length === 0}
              >
                {approvedPrograms.length > 0 ? (
                  approvedPrograms.map(program => (
                    <option key={program.id} value={program.name}>{program.name}</option>
                  ))
                ) : (
                  <option>No approved programs found</option>
                )}
              </select>
          </div>
          <div className="md:col-span-2">
              <label className="block text-sm font-bold mb-2 text-gray-700">Attach Report File (PDF, DOCX)</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-angat-blue file:text-white hover:file:bg-angat-pink"
                required
              />
          </div>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && <p className="text-green-600 text-center mt-4">{success}</p>}
        <div className="flex justify-end space-x-4 mt-8">
          <button type="submit" disabled={loading || approvedPrograms.length === 0} className="bg-angat-pink text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 disabled:opacity-50">
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </form>
    </SectionWrapper>
  );
};