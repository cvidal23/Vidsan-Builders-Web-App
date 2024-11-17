import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { Transaction } from '../../types/transaction';

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export function TransactionTable({ transactions, isLoading }: TransactionTableProps) {
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow dark:bg-gray-800">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-700/50">
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Category
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Project
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                {new Date(transaction.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                {transaction.description}
              </td>
              <td className="px-6 py-4">
                <select
                  value={transaction.category}
                  onChange={() => {}}
                  className="rounded-md border-gray-300 bg-white text-sm shadow-sm dark:border-gray-600 dark:bg-gray-700"
                >
                  <option value="materials">Materials</option>
                  <option value="labor">Labor</option>
                  <option value="overhead">Overhead</option>
                  {/* Add more categories */}
                </select>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-900 dark:text-white">
                {formatCurrency(transaction.amount)}
              </td>
              <td className="px-6 py-4">
                <select
                  value={transaction.projectId || ''}
                  onChange={() => {}}
                  className="rounded-md border-gray-300 bg-white text-sm shadow-sm dark:border-gray-600 dark:bg-gray-700"
                >
                  <option value="">Select Project</option>
                  {/* Add project options */}
                </select>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    transaction.status === 'Categorized'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                  }`}
                >
                  {transaction.status}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                <div className="flex justify-end space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}