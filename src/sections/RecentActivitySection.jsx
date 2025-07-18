import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { CheckCircle2, FileClock, DollarSign } from 'lucide-react';

const ActivityItem = ({ icon, title, description, time }) => (
  <div className="flex items-start space-x-4 p-4 border-b">
    <div className="flex-shrink-0">{icon}</div>
    <div className="flex-grow">
      <h3 className="font-bold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    <div className="flex-shrink-0 text-xs text-gray-500">{time}</div>
  </div>
);

export default function RecentActivitySection() {
  return (
    <SectionWrapper name="recent-activity" title="Recent Activity">
      <div className="divide-y divide-gray-200">
        <ActivityItem 
          icon={<CheckCircle2 className="h-6 w-6 text-green-500" />}
          title="Proposal 'Community Kitchen' Approved"
          description="Your proposal for the community kitchen project has been approved by the AngatBuhay admin team."
          time="2 days ago"
        />
        <ActivityItem 
          icon={<DollarSign className="h-6 w-6 text-blue-500" />}
          title="Funds Disbursed for 'Project Lapis'"
          description="PHP 50,000 has been disbursed for the first phase of your educational materials project."
          time="5 days ago"
        />
        <ActivityItem 
          icon={<FileClock className="h-6 w-6 text-yellow-500" />}
          title="Q2 Financial Report Submitted"
          description="You have successfully submitted the financial report for the second quarter. It is now awaiting review."
          time="1 week ago"
        />
      </div>
    </SectionWrapper>
  );
};