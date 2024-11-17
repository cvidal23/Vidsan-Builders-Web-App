import React, { useState } from 'react';
import { FileText, FileSpreadsheet, Plus, RefreshCw } from 'lucide-react';
import { useTransactions } from '../hooks/useTransactions';
import { formatCurrency } from '../lib/utils';
import { TransactionFilters } from '../components/transactions/TransactionFilters';
import { TransactionTable } from '../components/transactions/TransactionTable';
import { TransactionSummary } from '../components/transactions/TransactionSummary';
import { usePlaidLink } from 'react-plaid-link';

export default function Transactions() {
  const [filters, setFilters] = useState({
    dateRange: 'all',
    category: 'all',
    project: 'all',
    status: 'all',
  });

  const { transactions, totals, isLoading, syncTransactions, exportTransactions } = useTransactions(filters);

  const { open, ready } = usePlaidLink({
    token: null, // Get from your backend
    onSuccess: (public_token, metadata) => {
      // Handle success
      syncTransactions(public_token);
    },
    onExit: (err, metadata) => {
      // Handle exit
    },
  });

  const handleSync = () => {
    if (ready) {
      open();
    }
  };

  const handleExport = async (type: 'pdf' | 'excel') => {
    await exportTransactions(type, filters);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Transactions
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={handleSync}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync Transactions
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="inline-flex items-center rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-500"
          >
            <FileText className="mr-2 h-4 w-4" />
            Export PDF
          </button>
          <button
            onClick={() => handleExport('excel')}
            className="inline-flex items-center rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-500"
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export Excel
          </button>
          <button className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500">
            <Plus className="mr-2 h-4 w-4" />
            Add Manual Transaction
          </button>
        </div>
      </div>

      <TransactionSummary totals={totals} />
      <TransactionFilters filters={filters} onChange={setFilters} />
      <TransactionTable transactions={transactions} isLoading={isLoading} />
    </div>
  );
}