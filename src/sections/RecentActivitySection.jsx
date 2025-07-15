import React from 'react';
import SectionWrapper from '../components/SectionWrapper';

export default function RecentActivitySection() {
  return (
    <SectionWrapper name="recent-activity" title="Recent Activity">
       <p className="text-gray-600">
        This section will display a chronological feed of recent activities related to your account. This includes status updates on your program proposals, notifications of new fund disbursements, and confirmations of report submissions. It serves as a log to keep you informed of all interactions with the platform.
        <br/><br/>
        Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices.
      </p>
    </SectionWrapper>
  );
};