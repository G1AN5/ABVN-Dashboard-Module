import React from 'react';
import { Element } from 'react-scroll';

// A small component for the form fields
const InputField = ({ label, type = 'text', placeholder, required = false }) => (
  <div>
    <label className="block text-sm font-bold mb-2 text-gray-700">{label}</label>
    <input
      type={type}
      className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-angat-blue"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

export default function FinancialsSection() {
  return (
    <>
      <Element name="financial-overview" className="mb-12">
        <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-angat-blue pb-2 mb-6">Financial Overview</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800 font-bold">Total Funds Received</p>
                <p className="text-3xl font-bold text-blue-900">PHP 225,000.00</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800 font-bold">Total Funds Utilized</p>
                <p className="text-3xl font-bold text-green-900">PHP 175,000.00</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-800 font-bold">Remaining Balance</p>
                <p className="text-3xl font-bold text-yellow-900">PHP 50,000.00</p>
            </div>
        </div>
      </Element>

      <Element name="financial-report-form" className="mb-12">
        <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-angat-blue pb-2 mb-6">Financial Report Form</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Associated Program/Project</label>
              <select className="shadow-inner border rounded w-full py-2 px-3 text-gray-700">
                <option>Community Kitchen for Malabon</option>
                <option>Project Lapis: School Supplies Drive</option>
              </select>
            </div>
            <InputField label="Reporting Period (e.g., Q3 2025)" placeholder="Q3 2025" />
            <div className="md:col-span-2">
              <label className="block text-sm font-bold mb-2 text-gray-700">Upload Scanned Receipts & Documents (ZIP, PDF)</label>
              <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-angat-blue file:text-white hover:file:bg-angat-pink"/>
            </div>
          </div>
        </div>
      </Element>

      <Element name="report-history" className="mb-12">
        <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-angat-blue pb-2 mb-6">Report History</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600">
                    <tr>
                        <th className="py-3 px-6">Report Title</th>
                        <th className="py-3 px-6">Submission Date</th>
                        <th className="py-3 px-6">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b">
                        <td className="py-3 px-6">Q2 Financial Report</td>
                        <td className="py-3 px-6">July 1, 2025</td>
                        <td className="py-3 px-6 text-yellow-600 font-bold">Pending Review</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-3 px-6">Q1 Liquidation Report</td>
                        <td className="py-3 px-6">April 5, 2025</td>
                        <td className="py-3 px-6 text-green-600 font-bold">Approved</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </Element>
    </>
  );
};