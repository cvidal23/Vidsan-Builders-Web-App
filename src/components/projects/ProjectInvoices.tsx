import React from 'react';
import { Plus } from 'lucide-react';
import { useProjectInvoices } from '../../hooks/useProjectInvoices';
import { formatCurrency } from '../../lib/utils';

interface ProjectInvoicesProps {
  projectId: string;
}

export function ProjectInvoices({ projectId }: ProjectInvoicesProps) {
  const { invoices } = useProjectInvoices(projectId);

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Project Invoices
        </h2>
        <button className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Invoice Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Amount
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
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-blue-600 dark:text-blue-400">
                  {invoice.number}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                  {invoice.date}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-900 dark:text-white">
                  {formatCurrency(invoice.amount)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      invoice.status === 'Paid'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                  <button className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}