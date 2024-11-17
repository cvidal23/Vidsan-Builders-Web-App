import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { TransactionTotals } from '../../types/transaction';

interface TransactionSummaryProps {
  totals: TransactionTotals;
}

export function TransactionSummary({ totals }: TransactionSummaryProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <div className="flex items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
            <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Transactions
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {formatCurrency(totals.total)}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <div className="flex items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
            <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-300" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Income
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {formatCurrency(totals.income)}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <div className="flex items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900">
            <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-300" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Expenses
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {formatCurrency(totals.expenses)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}