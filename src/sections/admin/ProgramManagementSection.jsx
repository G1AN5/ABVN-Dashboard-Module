import React from 'react';
import { Element } from 'react-scroll';
import SectionWrapper from '../../components/SectionWrapper';

const ProgramRow = ({ title, org, status, budget }) => {
  const statusColor = {
    'Active': 'bg-green-100 text-green-800',
    'Pending Approval': 'bg-yellow-100 text-yellow-800',
    'Completed': 'bg-blue-100 text-blue-800',
  };
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-6 font-semibold text-gray-700">{title}</td>
      <td className="py-3 px-6 text-gray-600">{org}</td>
      <td className="py-3 px-6">
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColor[status]}`}>
          {status}
        </span>
      </td>
      <td className="py-3 px-6 text-right font-mono text-gray-700">{budget}</td>
      <td className="py-3 px-6 text-right">
        <button className="text-angat-blue hover:underline text-xs font-bold">View Details</button>
      </td>
    </tr>
  );
};

export default function ProgramManagementSection() {
  return (
    <>
      <Element name="all-programs">
        <SectionWrapper name="all-programs" title="All Programs & Projects List">
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
              <tbody className="bg-white">
                <ProgramRow title="Community Kitchen for Malabon" org="Bayanihan Org." status="Active" budget="150,000.00" />
                <ProgramRow title="Project Lapis: School Supplies Drive" org="Tulong Kabataan" status="Active" budget="50,000.00" />
                <ProgramRow title="Coastal Cleanup Initiative" org="Bayanihan Org." status="Completed" budget="25,000.00" />
                <ProgramRow title="Digital Literacy for Seniors" org="Tulong Kabataan" status="Pending Approval" budget="75,000.00" />
              </tbody>
            </table>
          </div>
        </SectionWrapper>
      </Element>
      <Element name="review-proposals">
        <SectionWrapper name="review-proposals" title="Review Program Proposals">
          <div className="bg-blue-50 border-l-4 border-angat-blue p-4 rounded-r-lg">
            <h3 className="font-bold">Digital Literacy for Seniors</h3>
            <p className="text-sm text-gray-600">Proposed by: <span className="font-semibold">Tulong Kabataan Foundation</span></p>
            <p className="text-sm text-gray-700 mt-1">A proposal to provide basic computer and internet skills training to 100 senior citizens. Budget request: PHP 75,000.</p>
            <div className="mt-4 flex space-x-4">
              <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600">Approve</button>
              <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600">Reject</button>
              <button className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">View Full Proposal</button>
            </div>
          </div>
        </SectionWrapper>
      </Element>
    </>
  );
}