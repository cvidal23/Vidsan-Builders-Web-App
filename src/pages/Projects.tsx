import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Plus } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

const projects = [
  {
    id: 1,
    projectNumber: 'PRJ-2024-001',
    contractNumber: 'CNT-2024-001',
    name: 'Office Renovation',
    client: 'Tech Corp',
    totalCost: 250000,
    status: 'In Progress',
    progress: 65,
  },
  {
    id: 2,
    projectNumber: 'PRJ-2024-002',
    contractNumber: 'CNT-2024-002',
    name: 'Retail Store Expansion',
    client: 'Retail Co',
    totalCost: 180000,
    status: 'Planning',
    progress: 25,
  },
];

export default function Projects() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Projects</h1>
        <button className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </button>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {projects.map((project) => (
            <li key={project.id}>
              <Link
                to={`/projects/${project.id}`}
                className="block hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                          <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center gap-3">
                          <p className="text-lg font-medium text-gray-900 dark:text-white">
                            {project.name}
                          </p>
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-500/30">
                            {project.projectNumber}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-4">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {project.client}
                          </p>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Contract: {project.contractNumber}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-8">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Total Cost
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatCurrency(project.totalCost)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Status
                        </p>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            project.status === 'In Progress'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <div className="w-48">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Progress
                        </p>
                        <div className="mt-1">
                          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-2 rounded-full bg-blue-600 dark:bg-blue-500"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}