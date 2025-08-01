import React, { useState, useEffect } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { getSupabaseApiAuthenticated } from '../api/supabaseClient';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function DashboardSection() {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const api = getSupabaseApiAuthenticated();
                const { data: programs } = await api.get('/');

                // --- Process data for Bar Chart ---
                const programsByYear = programs.reduce((acc, program) => {
                    const year = new Date(program.created_at).getFullYear();
                    if (!acc[year]) {
                        acc[year] = 0;
                    }
                    acc[year]++;
                    return acc;
                }, {});

                const barLabels = Object.keys(programsByYear).sort();
                const barValues = barLabels.map(year => programsByYear[year]);

                // --- Process data for Doughnut Chart ---
                const activePrograms = programs.filter(p => p.status === 'Active');
                const doughnutLabels = activePrograms.map(p => p.name);
                const doughnutValues = activePrograms.map(p => p.budget);

                setChartData({
                    bar: {
                        labels: barLabels,
                        datasets: [{
                            label: 'Programs Implemented',
                            data: barValues,
                            backgroundColor: '#1fafbb',
                            borderRadius: 5,
                        }],
                    },
                    doughnut: {
                        labels: doughnutLabels,
                        datasets: [{
                            label: 'Fund Allocation',
                            data: doughnutValues,
                            backgroundColor: ['#1fafbb', '#f550a1', '#ffe5c1', '#facc15', '#4ade80'],
                            borderColor: ['#ffffff'],
                            borderWidth: 2,
                        }],
                    }
                });

            } catch (err) {
                console.error("Error fetching chart data:", err);
                setError("Could not load dashboard charts.");
            } finally {
                setLoading(false);
            }
        };
        fetchChartData();
    }, []);


  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Number of Programs Implemented Per Year' },
    },
  };

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      title: { display: true, text: 'Fund Allocation for Active Programs' },
    },
    cutout: '60%',
  };

  return (
    <SectionWrapper name="dashboard" title="Dashboard">
        {loading && <p className="text-center p-8">Loading dashboard data...</p>}
        {error && <p className="text-center p-8 text-red-500">{error}</p>}
        {!loading && chartData && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-gray-50 p-4 rounded-lg">
                    <Bar options={barChartOptions} data={chartData.bar} />
                </div>
                <div className="lg:col-span-1 bg-gray-50 p-4 rounded-lg">
                    {chartData.doughnut.labels.length > 0 ? (
                        <Doughnut data={chartData.doughnut} options={doughnutChartOptions} />
                    ) : (
                        <div className="flex items-center justify-center h-full text-center text-gray-500">
                            <p>No active programs with budgets to display for fund allocation.</p>
                        </div>
                    )}
                </div>
            </div>
        )}
    </SectionWrapper>
  );
};