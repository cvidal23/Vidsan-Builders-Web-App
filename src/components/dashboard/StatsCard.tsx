import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  name: string;
  value: string;
  icon: LucideIcon;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
}

export function StatsCard({ name, value, icon: Icon, change, changeType }: StatsCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow dark:bg-gray-800 sm:p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon
            className="h-6 w-6 text-gray-400 dark:text-gray-500"
            aria-hidden="true"
          />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
              {name}
            </dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                {value}
              </div>
              <div
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  changeType === 'positive'
                    ? 'text-green-600 dark:text-green-400'
                    : changeType === 'negative'
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {change}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
}