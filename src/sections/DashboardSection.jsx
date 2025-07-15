import React from 'react';
import SectionWrapper from '../components/SectionWrapper';

export default function DashboardSection() {
  return (
    <SectionWrapper name="dashboard" title="Dashboard">
      <p className="text-gray-600 mb-4">
                This is the main dashboard, providing a high-level overview of your organization's partnership with AngatBuhay. Key metrics, fund allocations, and program statuses are displayed here for quick access. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. This is the main dashboard, providing a high-level overview of your organization's partnership with AngatBuhay. Key metrics, fund allocations, and program statuses are displayed here for quick access. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
      </p>
      <div className="mt-6 h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">Main Analytics and Graphs Area</span>
      </div>
       <p className="text-gray-600 mt-4">
                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum.
      </p>
    </SectionWrapper>
  );
};