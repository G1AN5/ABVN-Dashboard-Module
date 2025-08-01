import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import { getSupabaseApiAuthenticated } from '../api/supabaseClient';
import SectionWrapper from '../components/SectionWrapper';
import { AlertCircle } from 'lucide-react';

// Helper to format numbers as currency
const formatCurrency = (number) => {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
    }).format(number);
};

export default function FinancialsSection() {
  const [reports, setReports] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Derived state for financial overview
  const totalReceived = programs
    .filter(p => p.status === 'Active' || p.status === 'Finished')
    .reduce((sum, p) => sum + (p.budget || 0), 0);

  const totalUtilized = programs
    .filter(p => p.status === 'Finished')
    .reduce((sum, p) => sum + (p.budget || 0), 0);

  const remainingBalance = totalReceived - totalUtilized;

  const reportsRequiringAttention = reports.filter(
    report => report.status === 'Rejected' || report.status === 'Flagged'
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const api = getSupabaseApiAuthenticated();
        const [reportsRes, programsRes] = await Promise.all([
            api.get('/reports'),
            api.get('/')
        ]);

        const sortedReports = reportsRes.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setReports(sortedReports);
        setPrograms(programsRes.data);

      } catch (err) {
        console.error("Error fetching financial data:", err);
        setError("Could not load your financial data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Element name="financial-overview" className="mb-12">
        <SectionWrapper name="financial-overview" title="Financial Overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800 font-bold">Total Funds Received</p>
                    <p className="text-3xl font-bold text-blue-900">{formatCurrency(totalReceived)}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-800 font-bold">Total Funds Utilized</p>
                    <p className="text-3xl font-bold text-green-900">{formatCurrency(totalUtilized)}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800 font-bold">Remaining Balance</p>
                    <p className="text-3xl font-bold text-yellow-900">{formatCurrency(remainingBalance)}</p>
                </div>
            </div>
        </SectionWrapper>
      </Element>

      <Element name="financial-report-form" className="mb-12">
        <SectionWrapper name="financial-report-form" title="Reports Requiring Attention">
            {loading && <p className="text-center p-4">Loading reports...</p>}
            {error && <p className="text-center p-4 text-red-500">{error}</p>}
            {!loading && !error && (
                <div>
                    {reportsRequiringAttention.length > 0 ? (
                        <ul className="space-y-3">
                            {reportsRequiringAttention.map(report => (
                                <li key={report.id} className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg flex items-center justify-between">
                                    <div className="flex items-center">
                                        <AlertCircle className="h-6 w-6 text-red-600 mr-4" />
                                        <div>
                                            <p className="font-bold text-gray-800">{report.report_type} ({report.status})</p>
                                            <p className="text-sm text-gray-600">For: {report.associated_program}</p>
                                        </div>
                                    </div>
                                    <button className="bg-red-500 text-white text-sm font-bold py-2 px-4 rounded-lg hover:bg-red-600">
                                        Review & Resubmit
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-center p-4">No reports currently require your attention. Great job!</p>
                    )}
                </div>
            )}
        </SectionWrapper>
      </Element>

      <Element name="report-history" className="mb-12">
        <SectionWrapper name="report-history" title="Full Report History">
            <div className="overflow-x-auto">
                {loading && <p className="text-center p-4">Loading history...</p>}
                {error && <p className="text-center p-4 text-red-500">{error}</p>}
                {!loading && !error && (
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="py-3 px-6">Report Type</th>
                                <th className="py-3 px-6">Associated Program</th>
                                <th className="py-3 px-6">Submission Date</th>
                                <th className="py-3 px-6">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.length > 0 ? reports.map(report => (
                                <tr className="border-b" key={report.id}>
                                    <td className="py-3 px-6">{report.report_type}</td>
                                    <td className="py-3 px-6">{report.associated_program}</td>
                                    <td className="py-3 px-6">{new Date(report.created_at).toLocaleDateString()}</td>
                                    <td className={`py-3 px-6 font-bold ${
                                        report.status === 'Approved' ? 'text-green-600' :
                                        report.status === 'Rejected' || report.status === 'Flagged' ? 'text-red-600' : 'text-yellow-600'
                                    }`}>{report.status}</td>
                                </tr>
                            )) : (
                                <tr><td colSpan="4" className="text-center p-4 text-gray-500">No reports submitted yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </SectionWrapper>
      </Element>
    </>
  );
};