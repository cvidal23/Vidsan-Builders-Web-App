import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Gas', value: 762.93 },
  { name: 'Software', value: 57.60 },
  { name: 'Office Supplies', value: 5.00 },
  { name: 'Materials', value: 9052.83 },
  { name: 'Payroll Labor', value: 7067.65 },
  { name: 'IRS Payments', value: 4113.80 },
  { name: 'Sub Payment', value: 38150.00 },
  { name: 'Vendor Payment', value: 11838.00 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

export function ExpensesChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(value)}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}