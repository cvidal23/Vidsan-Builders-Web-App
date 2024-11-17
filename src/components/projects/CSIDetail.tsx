import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Edit2, FileText, Plus, Trash2, Upload, ArrowLeft } from 'lucide-react';
import { useCSIDetail } from '../../hooks/useCSIDetail';
import { formatCurrency } from '../../lib/utils';
import { AddExpenseModal } from './AddExpenseModal';
import { AddSOVModal } from './AddSOVModal';
import { toast } from 'react-hot-toast';

export default function CSIDetail() {
  const { projectId, csiCode } = useParams<{ projectId: string; csiCode: string }>();
  const {
    data,
    subcontractors,
    selectedSubcontractor,
    setSelectedSubcontractor,
    addExpense,
    addSOV,
    deleteExpense,
    deleteSOV,
    exportPDF,
  } = useCSIDetail(projectId!, csiCode!);

  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showSOVModal, setShowSOVModal] = useState(false);

  const handleExportPDF = async () => {
    try {
      await exportPDF();
      toast.success('PDF exported successfully');
    } catch (error) {
      toast.error('Failed to export PDF');
    }
  };

  if (!data) return null;

  return (
    <div className="min-h-screen bg-dark">
      {/* Back button */}
      <div className="sticky top-0 z-20 bg-dark px-6 py-4">
        <Link
          to={`/projects/${projectId}`}
          className="inline-flex items-center text-sm text-gray-400 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Project
        </Link>
      </div>

      {/* Fixed header with summary information */}
      <div className="sticky top-12 z-10 bg-dark-card p-6 shadow-card">
        <div className="mb-6 grid grid-cols-5 gap-4">
          <div className="card p-4">
            <p className="text-sm font-medium text-gray-400">ETC</p>
            <p className="mt-1 text-2xl font-semibold text-white">
              {formatCurrency(data.summary.ETC)}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-sm font-medium text-gray-400">Fee</p>
            <p className="mt-1 text-2xl font-semibold text-green-500">
              {formatCurrency(data.summary.Fee)}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-sm font-medium text-gray-400">Total Contract/Budget</p>
            <p className="mt-1 text-2xl font-semibold text-blue-500">
              {formatCurrency(data.summary.TotalBudget)}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-sm font-medium text-gray-400">Project No.</p>
            <p className="mt-1 text-2xl font-semibold text-white">{data.projectId}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm font-medium text-gray-400">Contract No.</p>
            <p className="mt-1 text-2xl font-semibold text-white">{data.contractNo}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {csiCode} - {data.title}
          </h2>
          <button
            onClick={handleExportPDF}
            className="inline-flex items-center rounded-md bg-purple px-4 py-2 text-sm font-semibold text-white hover:bg-purple-dark"
          >
            <FileText className="mr-2 h-4 w-4" />
            Export as PDF
          </button>
        </div>
      </div>

      {/* Expenses Section */}
      <div className="mt-6 px-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">Expenses</h3>
          <button
            onClick={() => setShowExpenseModal(true)}
            className="inline-flex items-center rounded-md bg-purple px-4 py-2 text-sm font-semibold text-white hover:bg-purple-dark"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg bg-dark-card">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Item #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  CSI Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Invoice/Receipt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Type
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                  Total
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {data.expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-dark-accent">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                    {expense.itemNo}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                    {expense.csiCode}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    <button className="inline-flex items-center text-purple-light hover:text-purple">
                      <Upload className="mr-1 h-4 w-4" />
                      {expense.invoice}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-white">{expense.vendor}</td>
                  <td className="px-6 py-4 text-sm text-white">{expense.type}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-white">
                    {formatCurrency(expense.total)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                    <div className="flex justify-end space-x-2">
                      <button className="text-gray-400 hover:text-white">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
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

      {/* Subcontractor SOV Section */}
      <div className="mt-8 px-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-medium text-white">
              Subcontractor Schedule of Values
            </h3>
            <select
              value={selectedSubcontractor}
              onChange={(e) => setSelectedSubcontractor(e.target.value)}
              className="rounded-md border-gray-700 bg-dark-card px-3 py-2 text-sm text-white focus:border-purple focus:ring-purple"
            >
              {subcontractors.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setShowSOVModal(true)}
            className="inline-flex items-center rounded-md bg-purple px-4 py-2 text-sm font-semibold text-white hover:bg-purple-dark"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Schedule of Values
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg bg-dark-card">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Item #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Date Paid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Check #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  POP #
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">
                  Signed Waiver
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                  Total
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {data.subcontractorSOV.map((sov) => (
                <tr key={sov.id} className="hover:bg-dark-accent">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                    {sov.itemNo}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                    {sov.payment}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">{sov.description}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                    {sov.datePaid}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                    {sov.checkNumber}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                    {sov.popNumber}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                    {sov.signedWaiver ? (
                      <span className="text-green-500">✓</span>
                    ) : (
                      <span className="text-red-500">✗</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-white">
                    {formatCurrency(sov.total)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                    <div className="flex justify-end space-x-2">
                      <button className="text-gray-400 hover:text-white">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteSOV(sov.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
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

      {/* Modals */}
      <AddExpenseModal
        isOpen={showExpenseModal}
        onClose={() => setShowExpenseModal(false)}
        onAdd={addExpense}
        csiCode={csiCode!}
      />
      <AddSOVModal
        isOpen={showSOVModal}
        onClose={() => setShowSOVModal(false)}
        onAdd={addSOV}
        csiCode={csiCode!}
        subcontractorId={selectedSubcontractor}
      />
    </div>
  );
}