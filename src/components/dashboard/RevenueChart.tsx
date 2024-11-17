import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '../../lib/utils';

interface RevenueData {
  name: string;
  value: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="currentColor"
          className="text-gray-200 dark:text-gray-700"
        />
        <XAxis
          dataKey="name"
          stroke="currentColor"
          className="text-gray-600 dark:text-gray-400"
        />
        <YAxis
          stroke="currentColor"
          className="text-gray-600 dark:text-gray-400"
          tickFormatter={(value) =>
            new Intl.NumberFormat('en', {
              notation: 'compact',
              compactDisplay: 'short',
            }).format(value)
          }
        />
        <Tooltip
          formatter={(value: number) => [formatCurrency(value), 'Revenue']}
          contentStyle={{
            backgroundColor: 'rgb(31, 41, 55)',
            border: 'none',
            borderRadius: '0.375rem',
            color: 'white',
          }}
        />
        <Bar dataKey="value" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
}