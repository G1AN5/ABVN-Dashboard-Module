import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import SectionWrapper from '../../components/SectionWrapper';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { getSupabaseApiAuthenticated } from '../../api/supabaseClient'; // Corrected import

const ReportCard = ({ report_type, organization, created_at, status }) => {
    const statusInfo = {
        'Pending': { icon: <Clock className="text-yellow-500" />, text: 'text-yellow-600' },
        'Approved': { icon: <CheckCircle className="text-green-500" />, text: 'text-green-600' },
        'Flagged': { icon: <AlertTriangle className="text-red-500" />, text: 'text-red-600' },
    };
    const currentStatus = status || 'Pending'; // Default to pending if status is null

    return (
        <div className="bg-white p-4 rounded-lg shadow-md border flex flex-col">
            <div className="flex-grow">
                <p className="text-xs text-gray-500">{organization?.name || 'N/A'}</p>
                <h4 className="font-bold text-gray-800">{report_type}</h4>
                <p className="text-sm text-gray-600 mt-1">Submitted: {new Date(created_at).toLocaleDateString()}</p>
            </div>
            <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <div className={`flex items-center text-sm font-bold ${statusInfo[currentStatus].text}`}>
                    {statusInfo[currentStatus].icon}
                    <span className="ml-2">{currentStatus}</span>
                </div>
                <button className="bg-gray-200 text-gray-800 text-xs font-bold py-1 px-3 rounded-md hover:bg-gray-300">View Report</button>
            </div>
        </div>
    );
};

export default function FinancialManagementSection() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const api = getSupabaseApiAuthenticated();
                // Correct endpoint for admins to get all financial reports
                const { data, error: reqError } = await api.get('/admin/financial-reports');
                if (reqError) throw reqError;
                setReports(data);
            } catch (err) {
                console.error("Error fetching reports:", err);
                setError("Could not fetch financial reports.");
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

  return (
    <>
      <Element name="fund-disbursement">
        <SectionWrapper name="fund-disbursement" title="Fund Disbursement">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">Select Approved Program</label>
                <select className="shadow-inner border rounded w-full py-2 px-3 text-gray-700">
                    <option>Community Kitchen for Malabon</option>
                    <option>Project Lapis: School Supplies Drive</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">Amount to Disburse (PHP)</label>
                <input type="text" className="shadow-inner border rounded w-full py-2 px-3 text-gray-700" placeholder="e.g., 50000.00" />
            </div>
            <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2 text-gray-700">Notes / Reference Code</label>
                <input type="text" className="shadow-inner border rounded w-full py-2 px-3 text-gray-700" placeholder="e.g., Tranche 1, Q3-2025" />
            </div>
            <div className="md:col-span-2 flex justify-end">
                <button className="bg-angat-pink text-white font-bold py-2 px-6 rounded-lg hover:opacity-90">Confirm Disbursement</button>
            </div>
          </div>
        </SectionWrapper>
      </Element>
      <Element name="review-reports">
        <SectionWrapper name="review-reports" title="Review Financial Reports">
            {loading && <p className="text-center p-4">Loading reports...</p>}
            {error && <p className="text-center p-4 text-red-500">{error}</p>}
            {!loading && reports.length === 0 && <p className="text-center p-4 text-gray-500">No financial reports to review.</p>}
            {!loading && reports.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map(report => (
                    <ReportCard key={report.id} {...report} />
                ))}
              </div>
            )}
        </SectionWrapper>
      </Element>
    </>
  );
}
