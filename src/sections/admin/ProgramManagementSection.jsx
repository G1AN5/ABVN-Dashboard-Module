import React from 'react';
import { Element } from 'react-scroll';
import SectionWrapper from '../../components/SectionWrapper';

export default function ProgramManagementSection() {
  return (
    <>
      <Element name="all-programs">
        <SectionWrapper name="all-programs" title="All Programs & Projects List">
          <p>A master table showing all programs from all partner organizations would be displayed here, with filters for status, organization, etc.</p>
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