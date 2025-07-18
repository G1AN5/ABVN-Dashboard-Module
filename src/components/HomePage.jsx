import React from 'react';

export default function HomePage() {
  return (
    <div className="pt-32 container mx-auto px-6 text-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to AngatBuhay</h1>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        This is the home page. You can add content here about AngatBuhay's mission, vision, and impact. 
        Click on the "Partnership" button in the navigation bar to view the dashboard module we are building.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, 
        dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas 
        ligula massa, varius a, semper congue, euismod non, mi.
      </p>
    </div>
  );
};