import React from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { useChangeOrders } from '../../hooks/useChangeOrders';
import { formatCurrency } from '../../lib/utils';

interface ChangeOrdersProps {
  projectId: string;
}

export function ChangeOrders({ projectId }: ChangeOrdersProps) {
  const { changeOrders, totalAmount } = useChangeOrders(projectId);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between">
        <h2 className="text-lg font-medium text-white">Change Orders</h2>
        <button className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500">
          <Plus className="mr-2 h-4 w-4" />
          Add Change Order
        </button>
      </div>

      {/* Change Orders Table */}
      <div className="overflow-x-auto">
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