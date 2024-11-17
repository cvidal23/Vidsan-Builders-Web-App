import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Lock, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useCostBreakdown } from '../../hooks/useCostBreakdown';
import { formatCurrency } from '../../lib/utils';
import { toast } from 'react-hot-toast';

interface CostBreakdownProps {
  projectId: string;
}

export default function CostBreakdown({ projectId }: CostBreakdownProps) {
  const { costItems, projectTotals, updateCostItem, deleteCostItem } = useCostBreakdown(projectId);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [editingItem, setEditingItem] = useState<string | null>(null);

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const collapseAll = () => {
    setExpandedItems([]);
  };

  const handleEdit = (itemId: string) => {
    setEditingItem(itemId);
  };

  const handleSave = async (item: any) => {
    try {
      await updateCostItem(item.id, item);
      setEditingItem(null);
      toast.success('Item updated successfully');
    } catch (error) {
      toast.error('Failed to update item');
    }
  };

  const handleDelete = async (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteCostItem(itemId);
        toast.success('Item deleted successfully');
      } catch (error) {
        toast.error('Failed to delete item');
      }
    }
  };

  return (
    <div className="flex flex-col">
      {/* Summary Section */}
      <div className="sticky top-0 z-10 bg-[#232830] p-6">
        <div className="mb-6 grid grid-cols-4 gap-4">
          <div className="rounded-lg bg-[#2A303C] p-4">
            <p className="text-sm font-medium text-gray-400">Total Cost</p>
            <p className="mt-1 text-2xl font-semibold text-white">
              {formatCurrency(projectTotals.totalCost)}
            </p>
          </div>
          <div className="rounded-lg bg-[#2A303C] p-4">
            <p className="text-sm font-medium text-gray-400">Expected Profit</p>
            <p className="mt-1 text-2xl font-semibold text-green-500">
              {formatCurrency(projectTotals.expectedProfit)}
            </p>
          </div>
          <div className="rounded-lg bg-[#2A303C] p-4">
            <p className="text-sm font-medium text-gray-400">Total Expenses</p>
            <p className="mt-1 text-2xl font-semibold text-yellow-500">
              {formatCurrency(projectTotals.expenses)}
            </p>
          </div>
          <div className="rounded-lg bg-[#2A303C] p-4">
            <p className="text-sm font-medium text-gray-400">Projected Profit</p>
            <p className="mt-1 text-2xl font-semibold text-purple-500">
              {formatCurrency(projectTotals.projectedProfit)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={collapseAll}
              className="inline-flex items-center rounded-md bg-gray-700 px-3 py-2 text-sm font-medium text-white hover:bg-gray-600"
            >
              <ChevronUp className="mr-2 h-4 w-4" />
              Collapse All
            </button>
            <button
              onClick={() => {/* Export to PDF */}}
              className="inline-flex items-center rounded-md bg-gray-700 px-3 py-2 text-sm font-medium text-white hover:bg-gray-600"
            >
              Export PDF
            </button>
            <button
              onClick={() => {/* Export to Excel */}}
              className="inline-flex items-center rounded-md bg-gray-700 px-3 py-2 text-sm font-medium text-white hover:bg-gray-600"
            >
              Export Excel
            </button>
          </div>
          <button
            onClick={() => {/* Add line item */}}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Line Item
          </button>
        </div>
      </div>

      {/* Cost Items Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-[#2A303C]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                CSI Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Scope
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                Original Cost
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                Sub Adjustment
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                Fee %
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                Fee
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                Cost + Fee
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                Expected Profit
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                Expenses
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                ETC
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                Projected Profit
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 bg-[#232830]">
            {costItems.map((item) => (
              <React.Fragment key={item.id}>
                <tr className="hover:bg-[#2A303C]">
                  <td className="whitespace-nowrap px-6 py-4">
                    <Link
                      to={`/projects/${projectId}/csi/${item.csiCode}`}
                      className="inline-flex items-center text-sm font-medium text-white"
                    >
                      {expandedItems.includes(item.id) ? (
                        <ChevronDown className="mr-2 h-4 w-4" />
                      ) : (
                        <ChevronUp className="mr-2 h-4 w-4" />
                      )}
                      {item.csiCode}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-white">
                    {item.scope}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-white">
                    {formatCurrency(item.originalCost)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-white">
                    {formatCurrency(item.subAdjustment)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-white">
                    {item.feePercentage}%
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-white">
                    {formatCurrency(item.fee)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-white">
                    {formatCurrency(item.totalCost)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-white">
                    {formatCurrency(item.expectedProfit)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-white">
                    {formatCurrency(item.expenses)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-white">
                    {formatCurrency(item.etc)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-white">
                    {formatCurrency(item.projectedProfit)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                    <div className="flex justify-end space-x-2">
                      {item.isLocked ? (
                        <Lock className="h-4 w-4 text-gray-400" />
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
                {expandedItems.includes(item.id) &&
                  item.subItems?.map((subItem) => (
                    <tr key={subItem.id} className="bg-[#1F2937]">
                      <td className="whitespace-nowrap px-6 py-4 pl-12 text-sm text-gray-300">
                        {subItem.csiCode}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {subItem.scope}
                      </td>
                      {/* Add remaining cells for sub-items */}
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}