import React from 'react';
import { Element } from 'react-scroll';

export default function FinancialsSection() {
  return (
    <>
      <Element name="financial-overview" className="mb-12">
        <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-angat-blue pb-2 mb-6">Financial Overview</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-600">Detailed graphs and visuals breaking down fund utilization will be shown here. This includes total funds received over time, budget vs. actual expenditure per program, and sources of funding. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.</p>
        </div>
      </Element>
      <Element name="financial-report-form" className="mb-12">
        <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-angat-blue pb-2 mb-6">Financial Report Form</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-600">Use the form in this section to submit your financial and liquidation reports. You will be able to upload necessary documents such as scanned receipts, official statements, and other supporting files to ensure transparency and accountability for all allocated funds. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus.</p>
        </div>
      </Element>
      <Element name="report-history" className="mb-12">
        <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-angat-blue pb-2 mb-6">Report History</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-600">View a complete history of all reports your organization has submitted. This table will show the report title, submission date, and the current status (e.g., Awaiting Review, Approved, Revision Requested), allowing you to track the progress of each submission. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu.</p>
        </div>
      </Element>
    </>
  );
};