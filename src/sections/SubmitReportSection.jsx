import React from 'react';
import SectionWrapper from '../components/SectionWrapper';

export default function SubmitReportSection() {
  return (
    <SectionWrapper name="submit-report" title="Submit a Report">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Report Type</label>
            <select className="shadow-inner border rounded w-full py-2 px-3 text-gray-700">
                <option>Quarterly Progress Report</option>
                <option>Event Completion Report</option>
                <option>Beneficiary Impact Story</option>
            </select>
        </div>
        <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Associated Program/Project</label>
            <select className="shadow-inner border rounded w-full py-2 px-3 text-gray-700">
                <option>Community Kitchen for Malabon</option>
                <option>Project Lapis: School Supplies Drive</option>
            </select>
        </div>
        <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-2 text-gray-700">Attach Report File (PDF, DOCX)</label>
            <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-angat-blue file:text-white hover:file:bg-angat-pink"/>
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-8">
        <button className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600">Edit Last Submission</button>
        <button className="bg-angat-pink text-white font-bold py-2 px-4 rounded-lg hover:opacity-90">Submit Report</button>
      </div>
    </SectionWrapper>
  );
};