import React from 'react';
import { Edit2, FileText, Plus, Trash2 } from 'lucide-react';
import { useSubcontractors } from '../../hooks/useSubcontractors';
import { formatCurrency } from '../../lib/utils';

interface SubcontractorsProps {
  projectId: string;
}

export function Subcontractors({ projectId }: SubcontractorsProps) {
  const { subcontractors, isLoading } = useSubcontractors(projectId);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-medium text-white">Project Subcontractors</h2>
        <button className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">
          <Plus className="mr-2 h-4 w-4" />
          Add Subcontractor
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                License #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Phone
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                Contract Value
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                Paid to Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Insurance Expiry
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 bg-gray-800">
            {subcontractors.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-700">
                <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                  {sub.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                  {sub.licenseNumber}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                  {sub.contactName}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                  {sub.phone}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-white">
                  {formatCurrency(sub.contractValue)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-white">
                  {formatCurrency(sub.paidToDate)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                  {sub.insuranceExpiry}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                  <div className="flex justify-end space-x-2">
                    <button className="text-gray-400 hover:text-white">
                      <FileText className="h-4 w-4" />
                    </button>
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
          </tbody>
        </table>
      </div>
    </div>
  );
}