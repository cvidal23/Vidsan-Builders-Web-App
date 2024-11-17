import React from 'react';
import { Calendar, Filter } from 'lucide-react';

interface TransactionFiltersProps {
  filters: {
    dateRange: string;
    category: string;
    project: string;
    status: string;
  };
  onChange: (filters: any) => void;
}

export function TransactionFilters({ filters, onChange }: TransactionFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800">
      <div className="flex items-center">
        <Filter className="mr-2 h-5 w-5 text-gray-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Filters:
        </span>
      </div>

      <div className="relative">
        <select
          value={filters.dateRange}
          onChange={(e) => onChange({ ...filters, dateRange: e.target.value })}
          className="rounded-md border-gray-300 bg-white pr-8 pl-3 py-2 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-700"
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
          <option value="custom">Custom Range</option>
        </select>
        <Calendar className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>

      <select
        value={filters.category}
        onChange={(e) => onChange({ ...filters, category: e.target.value })}
        className="rounded-md border-gray-300 bg-white px-3 py-2 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-700"
      >
        <option value="all">All Categories</option>
        <option value="materials">Materials</option>
        <option value="labor">Labor</option>
        <option value="overhead">Overhead</option>
        {/* Add more categories */}
      </select>

      <select
        value={filters.project}
        onChange={(e) => onChange({ ...filters, project: e.target.value })}
        className="rounded-md border-gray-300 bg-white px-3 py-2 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-700"
      >
        <option value="all">All Projects</option>
        {/* Add project options */}
      </select>

      <select
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
        className="rounded-md border-gray-300 bg-white px-3 py-2 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-700"
      >
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="categorized">Categorized</option>
      </select>
    </div>
  );
}