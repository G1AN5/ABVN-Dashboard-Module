import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function DashboardSection() {
  const barChartData = {
    labels: ['2021', '2022', '2023', '2024', '2025'],
    datasets: [
      {
        label: 'Programs',
        data: [3, 6, 4, 7, 8],
        backgroundColor: '#1fafbb',
        borderRadius: 5,
      },
      {
        label: 'Projects',
        data: [2, 5, 3, 6, 10],
        backgroundColor: '#f550a1',
        borderRadius: 5,
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Project 1', 'Project 2', 'Program 1'],
    datasets: [
      {
        label: 'Fund Allocation',
        data: [12.5, 25, 62.5],
        backgroundColor: ['#1fafbb', '#f550a1', '#ffe5c1'],
        borderColor: ['#ffffff', '#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Number of Programs and Projects Implemented' },
    },
  };

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      title: { display: true, text: 'Fund Allocation (%)' },
    },
    cutout: '60%',
  };

  return (
    <SectionWrapper name="dashboard" title="Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-gray-50 p-4 rounded-lg">
          <Bar options={barChartOptions} data={barChartData} />
          <p className="text-center text-sm text-gray-600 mt-2">
            This chart shows the growth of your organization's initiatives over the past five years, distinguishing between comprehensive programs and specific projects.
          </p>
        </div>
        <div className="lg:col-span-1 bg-gray-50 p-4 rounded-lg">
          <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
          <p className="text-center text-sm text-gray-600 mt-2">
            This chart illustrates how the current funds from AngatBuhay are distributed across your key ongoing initiatives.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};