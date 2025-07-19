import React from 'react';
import { Element } from 'react-scroll';
import SectionWrapper from '../../components/SectionWrapper';

export default function FinancialManagementSection() {
  return (
    <>
      <Element name="fund-disbursement">
        <SectionWrapper name="fund-disbursement" title="Fund Disbursement">
          <p>A form or tool for admins to officially record the transfer of funds to partner organizations for approved programs.</p>
        </SectionWrapper>
      </Element>
      <Element name="review-reports">
        <SectionWrapper name="review-reports" title="Review Financial Reports">
          <p>A queue or list of submitted financial/liquidation reports from partners, with options for admins to review, approve, or flag them.</p>
        </SectionWrapper>
      </Element>
    </>
  );
}