import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  Users,
  DollarSign,
  FileEdit,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Dashboard', to: '/', icon: Home },
  { name: 'Projects', to: '/projects', icon: Building2 },
  { name: 'Schedule', to: '/schedule', icon: Calendar },
  { name: 'Invoices', to: '/invoices', icon: FileText },
  { name: 'Proposals', to: '/proposals', icon: FileEdit },
  { name: 'Transactions', to: '/transactions', icon: DollarSign },
  { name: 'Reports', to: '/reports', icon: BarChart3 },
  { name: 'User Management', to: '/users', icon: Users },
];

interface SidebarProps {
  show: boolean;
  onToggle: () => void;
}

export function Sidebar({ show, onToggle }: SidebarProps) {
  return (
    <div
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex flex-col glass transition-all duration-300',
        show ? 'w-64' : 'w-20'
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-purple/10 px-4">
        {show ? (
          <img src="/vidsan-logo.png" alt="Vidsan Builders" className="h-8" />
        ) : (
          <img src="/vidsan-logo-small.png" alt="VB" className="h-8" />
        )}
      </div>

      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-purple/20 text-purple-light'
                    : 'text-gray-400 hover:bg-purple/10 hover:text-purple-light'
                )
              }
            >
              <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {show && <span className="truncate">{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-purple/10 p-4">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded-lg bg-purple/10 px-3 py-2 text-sm font-medium text-purple-light hover:bg-purple/20"
        >
          {show ? (
            <>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Collapse
            </>
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}