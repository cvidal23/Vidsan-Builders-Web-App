import React from 'react';
import { Calendar, Plus } from 'lucide-react';
import { useProjectSchedule } from '../../hooks/useProjectSchedule';

interface ProjectScheduleProps {
  projectId: string;
}

export function ProjectSchedule({ projectId }: ProjectScheduleProps) {
  const { events } = useProjectSchedule(projectId);

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Project Schedule
        </h2>
        <button className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </button>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="min-h-[600px] p-6">
          <div className="flex items-center justify-center">
            <Calendar className="h-12 w-12 text-gray-400 dark:text-gray-600" />
          </div>
          <p className="mt-4 text-center text-gray-500 dark:text-gray-400">
            Calendar implementation coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}