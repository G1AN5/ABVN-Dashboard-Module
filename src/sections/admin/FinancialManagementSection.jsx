import React from 'react';
import { Element } from 'react-scroll';
import SectionWrapper from '../../components/SectionWrapper';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const ReportCard = ({ title, org, date, amount, status }) => {
    const statusInfo = {
        'Pending': { icon: <Clock className="text-yellow-500" />, text: 'text-yellow-600' },
        'Approved': { icon: <CheckCircle className="text-green-500" />, text: 'text-green-600' },
        'Flagged': { icon: <AlertTriangle className="text-red-500" />, text: 'text-red-600' },
    };
    return (
        <div className="bg-white p-4 rounded-lg shadow-md border flex flex-col">
            <div className="flex-grow">
                <p className="text-xs text-gray-500">{org}</p>
                <h4 className="font-bold text-gray-800">{title}</h4>
                <p className="text-sm text-gray-600 mt-1">Submitted: {date}</p>
                <p className="font-mono text-lg font-semibold mt-2">PHP {amount}</p>
            </div>
            <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <div className={`flex items-center text-sm font-bold ${statusInfo[status].text}`}>
                    {statusInfo[status].icon}
                    <span className="ml-2">{status}</span>
                </div>
                <button className="bg-gray-200 text-gray-800 text-xs font-bold py-1 px-3 rounded-md hover:bg-gray-300">View Report</button>
            </div>
        </div>
    );
};

export default function FinancialManagementSection() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ReportCard title="Q2 Liquidation Report" org="Bayanihan Org." date="July 18, 2025" amount="75,000.00" status="Pending" />
            <ReportCard title="Project Lapis - Phase 1" org="Tulong Kabataan" date="July 15, 2025" amount="25,000.00" status="Approved" />
            <ReportCard title="Q1 Kitchen Expenses" org="Bayanihan Org." date="April 10, 2025" amount="50,000.00" status="Flagged" />
          </div>
        </SectionWrapper>
      </Element>
    </>
  );
}