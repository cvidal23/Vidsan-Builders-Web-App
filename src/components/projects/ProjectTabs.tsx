import React from 'react';
import { cn } from '../../lib/utils';

export type ProjectTab = 'cost-breakdown' | 'change-orders' | 'payments' | 'schedule' | 'invoices' | 'subcontractors';

interface ProjectTabsProps {
  activeTab: ProjectTab;
  onTabChange: (tab: ProjectTab) => void;
}

export function ProjectTabs({ activeTab, onTabChange }: ProjectTabsProps) {
  const tabs = [
    { id: 'cost-breakdown', label: 'Cost Break Down' },
    { id: 'change-orders', label: 'Change Orders' },
    { id: 'payments', label: 'Payments' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'subcontractors', label: 'Subcontractors' },
  ] as const;

  return (
    <div className="border-b border-gray-700">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium',
              activeTab === tab.id
                ? 'border-[#00C805] text-[#00C805]'
                : 'border-transparent text-gray-400 hover:border-gray-700 hover:text-gray-200'
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}