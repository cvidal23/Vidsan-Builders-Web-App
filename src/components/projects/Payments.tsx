import React, { useState } from 'react';
import { Edit2, Trash2, Plus, Calendar } from 'lucide-react';
import { usePayments } from '../../hooks/usePayments';
import { useChangeOrders } from '../../hooks/useChangeOrders';
import { formatCurrency } from '../../lib/utils';

interface PaymentsProps {
  projectId: string;
}

export function Payments({ projectId }: PaymentsProps) {
  const { payments, totals } = usePayments(projectId);
  const { changeOrders, totalAmount } = useChangeOrders(projectId);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <div className="space-y-0">
      {/* Search and Filter Section */}
      <div className="mb-6 flex items-center gap-4 p-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search work..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 pl-10 text-white placeholder-gray-400"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>

        <div className="relative">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white"
          />
          <Calendar className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>

        <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">
          Search
        </button>

        <button className="ml-auto inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500">
          <Plus className="mr-2 h-4 w-4" />
          Add Payment
        </button>
      </div>

      {/* Payments Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Description of work
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                Scheduled Value
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                Paid Value
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                % Work Completed
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Date Paid
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Check#
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                % Work Left
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                Balance to Finish
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 bg-gray-800">
            {payments.map((payment, index) => (
              <tr key={payment.id} className="hover:bg-gray-700">
                <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-sm text-white">
                  {payment.description}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-white">
                  {formatCurrency(payment.scheduledValue)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-white">
                  {formatCurrency(payment.paidValue)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-white">
                  {payment.workCompleted}%
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                  {payment.datePaid}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                  {payment.checkNumber}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-white">
                  {100 - payment.workCompleted}%
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-white">
                  {formatCurrency(payment.balanceToFinish)}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      payment.status === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                  <div className="flex justify-end space-x-2">
                    <button className="text-blue-400 hover:text-blue-300">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="text-red-400 hover:text-red-300">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* Totals Row */}
            <tr className="bg-gray-900">
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">
                Total
              </td>
              <td className="px-6 py-4"></td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-white">
                {formatCurrency(totals.scheduledValue)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-white">
                {formatCurrency(totals.paidValue)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-white">
                {((totals.workCompleted / payments.length) || 0).toFixed(2)}%
              </td>
              <td colSpan={3}></td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-white">
                {formatCurrency(totals.balanceToFinish)}
              </td>
              <td colSpan={2}></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Change Orders Table */}
      <div className="mt-0">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Change Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Description
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Date Paid
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 bg-gray-800">
            {changeOrders.map((order) => (
              <React.Fragment key={order.id}>
                {/* Change Order Header */}
                <tr className="bg-gray-900">
                  <td
                    colSpan={6}
                    className="px-6 py-3 text-sm font-medium text-white"
                  >
                    Change Order {order.orderNumber}
                  </td>
                </tr>

                {/* Change Order Items */}
                {order.items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4 text-sm text-white">
                      {item.description}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-white">
                      {formatCurrency(item.amount)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                      {order.datePaid || '-'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          item.status === 'Approved'
                            ? 'bg-green-100 text-green-800'
                            : item.status === 'Rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-400 hover:text-blue-300">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button className="text-red-400 hover:text-red-300">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}

            {/* Total Row */}
            <tr className="bg-gray-900">
              <td colSpan={2} className="px-6 py-4 text-sm font-medium text-white">
                Total
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-white">
                {formatCurrency(totalAmount)}
              </td>
              <td colSpan={3}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}