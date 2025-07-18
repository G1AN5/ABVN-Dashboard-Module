import React from 'react';
import SectionWrapper from '../components/SectionWrapper';

const InputField = ({ label, placeholder }) => (
    <div>
        <label className="block text-sm font-bold mb-2 text-gray-700">{label}</label>
        <input type="text" className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700" placeholder={placeholder} />
    </div>
);

const TextArea = ({ label, placeholder }) => (
    <div className="md:col-span-2">
        <label className="block text-sm font-bold mb-2 text-gray-700">{label}</label>
        <textarea rows="4" className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700" placeholder={placeholder}></textarea>
    </div>
);

export default function ProposeProgramSection() {
  return (
    <SectionWrapper name="propose-program" title="Propose a New Program">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Program Title" placeholder="e.g., Community Livelihood Workshop" />
        <InputField label="Target Beneficiaries" placeholder="e.g., 100 families in Brgy. Santo Tomas" />
        <InputField label="Proposed Budget (PHP)" placeholder="e.g., 250,000.00" />
        <InputField label="Proposed Timeline" placeholder="e.g., 3 Months (Aug - Oct 2025)" />
        <TextArea label="Brief Program Description" placeholder="Describe the main objectives and activities..." />
        <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-2 text-gray-700">Attach Full Proposal Document (PDF, DOCX)</label>
            <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-angat-blue file:text-white hover:file:bg-angat-pink"/>
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-8">
        <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600">Follow-Up on Existing</button>
        <button className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600">Edit Draft</button>
        <button className="bg-angat-pink text-white font-bold py-2 px-4 rounded-lg hover:opacity-90">Propose</button>
      </div>
    </SectionWrapper>
  );
};