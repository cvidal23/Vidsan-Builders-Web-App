import React, { useState } from 'react';
import { Calendar, Clock, Plus } from 'lucide-react';
import { useSchedule } from '../hooks/useSchedule';

export default function Schedule() {
  const { events } = useSchedule();
  const [view, setView] = useState<'month' | 'week'>('month');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Schedule
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex rounded-md shadow-sm">
            <button
              onClick={() => setView('month')}
              className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-semibold ${
                view === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-700'
              }`}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Month
            </button>
            <button
              onClick={() => setView('week')}
              className={`relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold ${
                view === 'week'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-700'
              }`}
            >
              <Clock className="mr-2 h-4 w-4" />
              Week
            </button>
          </div>
          <button className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow dark:bg-gray-800">
        {/* Calendar component will go here */}
        <div className="min-h-[600px] p-6">
          <p className="text-center text-gray-500 dark:text-gray-400">
            Calendar implementation coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}