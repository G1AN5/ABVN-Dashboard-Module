import React from 'react';
import { Element } from 'react-scroll';
import SectionWrapper from '../../components/SectionWrapper';

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
  return (
    <>
      <Element name="all-orgs">
        <SectionWrapper name="all-orgs" title="All Partner Organizations">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase"><tr><th className="py-3 px-6">Organization Name</th><th className="py-3 px-6">Contact Person</th><th className="py-3 px-6">Status</th><th className="py-3 px-6"></th></tr></thead>
            <tbody>
              <OrgRow name="Bayanihan Para sa Kinabukasan Org." contact="Juan dela Cruz" status="Approved" />
              <OrgRow name="Tulong Kabataan Foundation" contact="Maria Clara" status="Approved" />
              <OrgRow name="Pag-asa Youth Movement" contact="Jose Rizal" status="Pending" />
              <OrgRow name="Community Builders Inc." contact="Andres Bonifacio" status="Rejected" />
            </tbody>
          </table>
        </SectionWrapper>
      </Element>
      <Element name="review-apps">
        <SectionWrapper name="review-apps" title="Review New Applications">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <h3 className="font-bold">Pag-asa Youth Movement</h3>
            <p className="text-sm text-gray-700 mt-1">Submitted 2 days ago. This organization focuses on youth empowerment through sports and education.</p>
            <div className="mt-4 flex space-x-4">
              <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600">Approve</button>
              <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600">Reject</button>
              <button className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">View Documents</button>
            </div>
          </div>
        </SectionWrapper>
      </Element>
    </>
  );
}