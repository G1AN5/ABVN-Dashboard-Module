import React from 'react';
import SectionWrapper from '../components/SectionWrapper';

export default function ProgramsManagementSection() {
  return (
    <SectionWrapper name="programs-management" title="Programs & Projects Management">
       <p className="text-gray-600">
        Here you can manage all your organization's initiatives. A table or list of all past, ongoing, and proposed programs will be displayed, along with their current status (e.g., Pending, Approved, Completed). You can click on each program to view more details or submit updates.
        <br/><br/>
        Suspendisse non nisl sit amet velit hendrerit rutrum. Ut leo. Ut Pharetra augue nec augue. Nam elit agna, endrerit sit amet, tincidunt ac, viverra sed, nisl. Quisque ante. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.
      </p>
    </SectionWrapper>
  );
};