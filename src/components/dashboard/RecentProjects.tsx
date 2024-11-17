import React from 'react';
import { Building2 } from 'lucide-react';

interface RecentProject {
  id: number;
  name: string;
  lastUpdated: string;
  status: 'Active' | 'Completed' | 'On Hold';
}

interface RecentProjectsProps {
  projects: RecentProject[];
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
      <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
        Recent Projects
      </h3>
      <div className="mt-6 flow-root">
        <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
          {projects.map((project) => (
            <li key={project.id} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                    <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {project.name}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    Last updated {project.lastUpdated}
                  </p>
                </div>
                <div>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                    {project.status}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}