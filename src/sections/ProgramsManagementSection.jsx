import React from 'react';
import SectionWrapper from '../components/SectionWrapper';

const ProgramRow = ({ title, status, beneficiaries, budget }) => {
  const statusColor = {
    'Active': 'bg-green-100 text-green-800',
    'Pending Approval': 'bg-yellow-100 text-yellow-800',
    'Completed': 'bg-blue-100 text-blue-800',
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-6 font-semibold text-gray-700">{title}</td>
      <td className="py-3 px-6">
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColor[status]}`}>
          {status}
        </span>
      </td>
      <td className="py-3 px-6 text-center text-gray-600">{beneficiaries}</td>
      <td className="py-3 px-6 text-right font-mono text-gray-700">{budget}</td>
    </tr>
  );
};

export default function ProgramsManagementSection() {
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
            <ProgramRow title="Community Kitchen for Malabon" status="Active" beneficiaries="250" budget="150,000.00" />
            <ProgramRow title="Project Lapis: School Supplies Drive" status="Active" beneficiaries="500+" budget="50,000.00" />
            <ProgramRow title="Coastal Cleanup Initiative" status="Completed" beneficiaries="75" budget="25,000.00" />
            <ProgramRow title="Digital Literacy for Seniors" status="Pending Approval" beneficiaries="100" budget="75,000.00" />
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
};