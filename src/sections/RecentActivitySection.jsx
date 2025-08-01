import React, { useState, useEffect } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { CheckCircle2, FileClock, DollarSign, AlertCircle, XCircle } from 'lucide-react';
import { getSupabaseApiAuthenticated } from '../api/supabaseClient';

const ActivityItem = ({ icon, title, description, time }) => (
  <div className="flex items-start space-x-4 p-4 border-b">
    <div className="flex-shrink-0 mt-1">{icon}</div>
    <div className="flex-grow">
      <h3 className="font-bold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    <div className="flex-shrink-0 text-xs text-gray-500 whitespace-nowrap">{time}</div>
  </div>
);

// Helper to calculate time ago
const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
};

export default function RecentActivitySection() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivities = async () => {
            setLoading(true);
            try {
                const api = getSupabaseApiAuthenticated();
                // Fetch both programs and reports in parallel
                const [programsRes, reportsRes] = await Promise.all([
                    api.get('/'),
                    api.get('/reports')
                ]);

                const programs = programsRes.data.map(p => ({
                    type: 'program',
                    title: `Proposal '${p.name}'`,
                    status: p.status,
                    date: p.created_at
                }));

                const reports = reportsRes.data.map(r => ({
                    type: 'report',
                    title: `Report '${r.report_type}'`,
                    status: r.status,
                    date: r.created_at
                }));

                // Combine, sort by most recent, and take the latest 5
                const combined = [...programs, ...reports]
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 5);

                setActivities(combined);

            } catch (err) {
                console.error("Error fetching activities:", err);
                setError("Could not load recent activity.");
            } finally {
                setLoading(false);
            }
        };
        fetchActivities();
    }, []);

    const getActivityDetails = (activity) => {
        if (activity.type === 'program') {
            switch (activity.status) {
                case 'Active':
                    return { icon: <CheckCircle2 className="h-6 w-6 text-green-500" />, description: 'Your proposal has been approved by the AngatBuhay admin team.' };
                case 'Rejected':
                    return { icon: <XCircle className="h-6 w-6 text-red-500" />, description: 'Your proposal was not approved. Please check for feedback.' };
                default: // Pending 'P'
                    return { icon: <FileClock className="h-6 w-6 text-yellow-500" />, description: 'Your proposal has been submitted and is awaiting review.' };
            }
        }
        if (activity.type === 'report') {
             switch (activity.status) {
                case 'Approved':
                    return { icon: <DollarSign className="h-6 w-6 text-blue-500" />, description: 'Your financial report has been reviewed and approved.' };
                case 'Rejected':
                     return { icon: <AlertCircle className="h-6 w-6 text-red-500" />, description: 'Your report was flagged. Please review and resubmit.' };
                default: // Pending
                    return { icon: <FileClock className="h-6 w-6 text-yellow-500" />, description: 'You have successfully submitted a financial report. It is now awaiting review.' };
            }
        }
        return {};
    };

  return (
    <SectionWrapper name="recent-activity" title="Recent Activity">
        {loading && <p className="text-center p-4">Loading activities...</p>}
        {error && <p className="text-center p-4 text-red-500">{error}</p>}
        {!loading && !error && (
            <div className="divide-y divide-gray-200">
                {activities.length > 0 ? activities.map((activity, index) => {
                    const { icon, description } = getActivityDetails(activity);
                    return (
                        <ActivityItem
                            key={index}
                            icon={icon}
                            title={activity.title}
                            description={description}
                            time={timeAgo(activity.date)}
                        />
                    );
                }) : (
                    <p className="text-center p-4 text-gray-500">No recent activity to display.</p>
                )}
            </div>
        )}
    </SectionWrapper>
  );
};