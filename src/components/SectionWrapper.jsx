import React from 'react';
import { Element } from 'react-scroll';

export default function SectionWrapper({ name, title, children }) {
  return (
    <Element name={name} className="mb-12">
      <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-angat-blue pb-2 mb-6">{title}</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {children}
      </div>
    </Element>
  );
}