import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import SectionWrapper from '../../components/SectionWrapper';
// Correctly import the necessary clients
import { getSupabaseFunctionsAuthenticated, getSupabaseStorageClient, getSupabaseApiAuthenticated } from '../../api/supabaseClient';
import { X, FileText, Download } from 'lucide-react';

const ViewDocumentsModal = ({ orgName, onClose }) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const supabaseFunctions = getSupabaseFunctionsAuthenticated();
                const { data: fileList, error: listError } = await supabaseFunctions.post('/list-files', { org_name: orgName });

                if (listError) throw listError;
                if (!fileList || fileList.length === 0) {
                    setFiles([]);
                    setLoading(false);
                    return;
                }
                const supabaseStorage = getSupabaseStorageClient();
                const signedUrlPromises = fileList.map(file =>
                    supabaseStorage.storage
                        .from('registrationrequestfiles')
                        .createSignedUrl(`${orgName}/${file.name}`, 3600)
                );
                const signedUrlResults = await Promise.all(signedUrlPromises);
                const filesWithUrls = signedUrlResults.map((result, index) => {
                    if (result.error) {
                        console.error(`Error creating signed URL for ${fileList[index].name}:`, result.error);
                        return null;
                    }
                    return { name: fileList[index].name, url: result.data.signedUrl };
                }).filter(Boolean);

                setFiles(filesWithUrls);

            } catch (err) {
                console.error("Error fetching files:", err);
                setError("Could not load documents.");
            } finally {
                setLoading(false);
            }
        };
        fetchFiles();
    }, [orgName]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">Documents for {orgName}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <X size={24} />
                    </button>
                </div>
                {loading && <p>Loading documents...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && (
                    <ul className="space-y-2 max-h-96 overflow-y-auto">
                        {files.length > 0 ? files.map(file => (
                            <li key={file.name}>
                                <a
                                    href={file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-3 rounded-md bg-gray-50 hover:bg-angat-blue hover:text-white transition-colors group"
                                >
                                    <div className="flex items-center">
                                        <FileText size={20} className="mr-3 flex-shrink-0" />
                                        <span className="truncate">{file.name}</span>
                                    </div>
                                    <Download size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </li>
                        )) : <p className="text-gray-500 text-center py-4">No documents were uploaded for this application.</p>}
                    </ul>
                )}
            </div>
        </div>
    );
};


const OrgRow = ({ name, contact, status }) => {
  const statusStyle = {
    'Approved': 'bg-green-100 text-green-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Rejected': 'bg-red-100 text-red-800',
  };
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-6 font-semibold">{name}</td>
      <td className="py-3 px-6">{contact}</td>
      <td className="py-3 px-6"><span className={`px-2 py-1 rounded-full text-xs font-bold ${statusStyle[status]}`}>{status}</span></td>
      <td className="py-3 px-6 flex justify-end space-x-2">
        <button className="bg-angat-blue text-white text-xs font-bold py-1 px-3 rounded-md hover:opacity-90">View/Edit</button>
      </td>
    </tr>
  );
};

export default function OrganizationManagementSection() {
  const [requests, setRequests] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrg, setSelectedOrg] = useState(null);

  const fetchRequests = async () => {
    try {
      // This uses the 'user' function client, which is correct for this call
      const supabaseFunctions = getSupabaseFunctionsAuthenticated();
      const { data, error } = await supabaseFunctions.get('/organization_registration_requests');
      if (error) throw error;
      setRequests(data);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError("Could not fetch registration requests.");
    }
  };

  const fetchOrganizations = async () => {
    try {
        // Use the new, correct API client
        const api = getSupabaseApiAuthenticated();
        const { data, error } = await api.get('/admin/organizations');
        if (error) throw error;
        setOrganizations(data);
    } catch (err) {
        console.error("Error fetching organizations:", err);
        setError("Could not fetch partner organizations.");
    }
  };

  useEffect(() => {
    const loadData = async () => {
        setLoading(true);
        setError(null);
        await Promise.all([fetchRequests(), fetchOrganizations()]);
        setLoading(false);
    };
    loadData();
  }, []);

  const handleApprove = async (requestId) => {
    try {
        const supabaseFunctions = getSupabaseFunctionsAuthenticated();
        await supabaseFunctions.post('/approve-registration', { request_id: requestId });
        alert('Organization Approved! The user can now log in.');
        // Refetch both lists after approval
        fetchRequests();
        fetchOrganizations();
    } catch (err) {
        console.error("Approval error:", err);
        alert(`Failed to approve organization: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleReject = async (requestId) => {
    if (window.confirm("Are you sure you want to reject this application? This cannot be undone.")) {
        try {
            const supabaseFunctions = getSupabaseFunctionsAuthenticated();
            await supabaseFunctions.post('/reject-registration', { request_id: requestId });
            alert('Organization Rejected.');
            fetchRequests();
        } catch (err) {
            console.error("Rejection error:", err);
            alert('Failed to reject organization.');
        }
    }
  };

  return (
    <>
      {selectedOrg && <ViewDocumentsModal orgName={selectedOrg} onClose={() => setSelectedOrg(null)} />}

      <Element name="all-orgs">
        <SectionWrapper name="all-orgs" title="All Partner Organizations">
          {loading && <p>Loading organizations...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && organizations.length === 0 && <p className="text-gray-500 text-center">No partner organizations found.</p>}
          {!loading && organizations.length > 0 && (
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase"><tr><th className="py-3 px-6">Organization Name</th><th className="py-3 px-6">Contact Person</th><th className="py-3 px-6">Status</th><th className="py-3 px-6"></th></tr></thead>
              <tbody>
                {organizations.map(org => (
                  <OrgRow key={org.id} name={org.name} contact={org.contact_persons?.name || 'N/A'} status="Approved" />
                ))}
              </tbody>
            </table>
          )}
        </SectionWrapper>
      </Element>
      <Element name="review-apps">
        <SectionWrapper name="review-apps" title="Review New Applications">
          {loading && <p>Loading applications...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && requests.length === 0 && (
            <p className="text-gray-500 text-center">No new applications to review.</p>
          )}

          {requests.map((req) => (
            <div key={req.id} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-4">
              <h3 className="font-bold">{req.name}</h3>
              <p className="text-sm text-gray-700 mt-1">
                Submitted on: {new Date(req.created_at).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">Contact: {req.contact_person?.name || 'N/A'}</p>
              <div className="mt-4 flex space-x-4">
                <button onClick={() => handleApprove(req.id)} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600">Approve</button>
                <button onClick={() => handleReject(req.id)} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600">Reject</button>
                <button onClick={() => setSelectedOrg(req.name)} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">View Documents</button>
              </div>
            </div>
          ))}
        </SectionWrapper>
      </Element>
    </>
  );
}
