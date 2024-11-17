import React, { useState } from 'react';
import {
  Building2,
  DollarSign,
  FileSpreadsheet,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { RecentProjects } from '../components/dashboard/RecentProjects';
import { ExpensesChart } from '../components/dashboard/ExpensesChart';
import { formatCurrency } from '../lib/utils';

const revenueData = [
  { name: 'Jan', value: 400000 },
  { name: 'Feb', value: 300000 },
  { name: 'Mar', value: 500000 },
  { name: 'Apr', value: 280000 },
  { name: 'May', value: 590000 },
  { name: 'Jun', value: 320000 },
];

const stats = [
  {
    name: 'Total Projects',
    value: '12',
    icon: Building2,
    change: '+2.1%',
    changeType: 'positive' as const,
  },
  {
    name: 'Total Revenue',
    value: '$2.4M',
    icon: DollarSign,
    change: '+12.5%',
    changeType: 'positive' as const,
  },
  {
    name: 'Not Categorized',
    value: '41',
    icon: AlertCircle,
    change: '-5%',
    changeType: 'negative' as const,
  },
  {
    name: 'Errors',
    value: '44',
    icon: AlertCircle,
    change: '+4.3%',
    changeType: 'negative' as const,
  },
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const years = ['2024', '2023', '2022'];

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedProject, setSelectedProject] = useState('All Projects');

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center gap-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="rounded-md border-gray-300 bg-white px-3 py-2 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-700"
        >
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="rounded-md border-gray-300 bg-white px-3 py-2 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-700"
        >
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="rounded-md border-gray-300 bg-white px-3 py-2 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-700"
        >
          <option value="All Projects">All Projects</option>
          <option value="Project 1">Project 1</option>
          <option value="Project 2">Project 2</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.name} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-96 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Revenue Overview
          </h3>
          <div className="mt-2 h-80">
            <RevenueChart data={revenueData} />
          </div>
        </div>

        <div className="h-96 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Expenses Categories
          </h3>
          <div className="mt-2 h-80">
            <ExpensesChart />
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentProjects
          projects={[
            { id: 1, name: 'Office Renovation', lastUpdated: '2h ago', status: 'Active' },
            { id: 2, name: 'Retail Store Expansion', lastUpdated: '4h ago', status: 'Active' },
            { id: 3, name: 'Warehouse Construction', lastUpdated: '6h ago', status: 'Active' },
          ]}
        />

        {/* Financial Summary */}
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Financial Summary
          </h3>
          <div className="mt-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Income</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatCurrency(1340882.56)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Expenses</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatCurrency(1337572.46)}
              </span>
            </div>
            <div className="flex justify-between border-t pt-4">
              <span className="font-medium text-gray-900 dark:text-white">Net Profit</span>
              <span className="font-medium text-green-600 dark:text-green-400">
                {formatCurrency(3310.10)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}