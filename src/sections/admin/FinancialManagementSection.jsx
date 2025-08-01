import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import SectionWrapper from '../../components/SectionWrapper';
import { CheckCircle, Clock, AlertTriangle, XCircle, FileText, X } from 'lucide-react';
import { getSupabaseApiAuthenticated, getSupabaseStorageClient } from '../../api/supabaseClient';

// Modal for viewing and managing a financial report
const ReportDetailsModal = ({ report, onClose, onUpdate }) => {
    if (!report) return null;

    const handleUpdateStatus = async (newStatus) => {
        try {
            const api = getSupabaseApiAuthenticated();
            await api.post(`/admin/financial-reports/${report.id}/status`, { status: newStatus });
            alert(`Report status updated to "${newStatus}"`);
            onUpdate(); // Refresh the list
        } catch (err) {
            console.error("Error updating report status:", err);
            alert("Failed to update report status.");
        }
    };

    const handleViewFile = async (filePath) => {
        if (!filePath) {
            alert("No document attached to this report.");
            return;
        }
        try {
            const storageClient = getSupabaseStorageClient();
            const { data, error } = await storageClient.storage.from('programsandprojects').createSignedUrl(filePath, 3600);
            if (error) throw error;
            window.open(data.signedUrl, '_blank');
        } catch (err) {
            console.error("Error creating signed URL:", err);
            alert("Could not open the report document.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{report.report_type}</h3>
                        <p className="text-sm text-gray-500">For: {report.associated_program}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                </div>
                <div className="space-y-2 text-sm">
                    <p><strong>Organization:</strong> {report.organization?.name || 'N/A'}</p>
                    <p><strong>Submitted:</strong> {new Date(report.created_at).toLocaleString()}</p>
                    <p><strong>Current Status:</strong> <span className="font-bold">{report.status}</span></p>
                </div>
                <div className="mt-6 pt-4 border-t flex flex-wrap justify-between items-center gap-2">
                     <button onClick={() => handleViewFile(report.report_document_path)} className="flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600">
                        <FileText size={16} className="mr-2"/> View Attached File
                    </button>
                    <div className="flex space-x-2">
                        <button onClick={() => handleUpdateStatus('Approved')} className="flex items-center bg-green-500 text-white font-bold py-2 px-3 rounded-lg hover:bg-green-600 text-xs"><CheckCircle size={14} className="mr-1"/> Approve</button>
                        <button onClick={() => handleUpdateStatus('Needs Revision')} className="flex items-center bg-yellow-500 text-white font-bold py-2 px-3 rounded-lg hover:bg-yellow-600 text-xs"><AlertTriangle size={14} className="mr-1"/> Needs Revision</button>
                        <button onClick={() => handleUpdateStatus('Rejected')} className="flex items-center bg-red-600 text-white font-bold py-2 px-3 rounded-lg hover:bg-red-700 text-xs"><XCircle size={14} className="mr-1"/> Reject</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const ReportCard = ({ report, onSelect }) => {
    const statusInfo = {
        'Pending': { icon: <Clock className="text-yellow-500" />, text: 'text-yellow-600' },
        'Approved': { icon: <CheckCircle className="text-green-500" />, text: 'text-green-600' },
        'Rejected': { icon: <XCircle className="text-red-500" />, text: 'text-red-600' },
        'Needs Revision': { icon: <AlertTriangle className="text-orange-500" />, text: 'text-orange-600' },
    };
    const currentStatus = report.status || 'Pending';
    return (
        <div className="bg-white p-4 rounded-lg shadow-md border flex flex-col">
            <div className="flex-grow">
                <p className="text-xs text-gray-500">{report.organization?.name || 'N/A'}</p>
                <h4 className="font-bold text-gray-800">{report.report_type}</h4>
                <p className="text-sm text-gray-600 mt-1">For: {report.associated_program}</p>
            </div>
            <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <div className={`flex items-center text-sm font-bold ${statusInfo[currentStatus].text}`}>
                    {statusInfo[currentStatus].icon}
                    <span className="ml-2">{currentStatus}</span>
                </div>
                <button onClick={() => onSelect(report)} className="bg-gray-200 text-gray-800 text-xs font-bold py-1 px-3 rounded-md hover:bg-gray-300">View Report</button>
            </div>
        </div>
    );
};

export default function FinancialManagementSection() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedReport, setSelectedReport] = useState(null);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const api = getSupabaseApiAuthenticated();
            const { data } = await api.get('/admin/financial-reports');
            setReports(data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        } catch (err) {
            console.error("Error fetching reports:", err);
            setError("Could not fetch financial reports.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleUpdate = () => {
        setSelectedReport(null); // Close modal
        fetchReports(); // Refresh data
    };

  return (
    <>
      {selectedReport && <ReportDetailsModal report={selectedReport} onClose={() => setSelectedReport(null)} onUpdate={handleUpdate} />}

      <Element name="review-reports">
        <SectionWrapper name="review-reports" title="Review Financial Reports">
            {loading && <p className="text-center p-4">Loading reports...</p>}
            {error && <p className="text-center p-4 text-red-500">{error}</p>}
            {!loading && reports.length === 0 && <p className="text-center p-4 text-gray-500">No financial reports to review.</p>}
            {!loading && reports.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map(report => (
                    <ReportCard key={report.id} report={report} onSelect={setSelectedReport} />
                ))}
              </div>
            )}
        </SectionWrapper>
      </Element>
    </>
  );
}