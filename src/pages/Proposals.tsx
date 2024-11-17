import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, Trash2, FileSpreadsheet } from 'lucide-react';
import { useProposals } from '../hooks/useProposals';
import { formatDate } from '../lib/utils';

export default function Proposals() {
  const navigate = useNavigate();
  const { proposals, isLoading, exportProposal, deleteProposal } = useProposals();

  const handleExport = async (proposalId: string, format: 'google-doc' | 'google-sheet') => {
    await exportProposal(proposalId, format);
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Proposals
        </h1>
        <button
          onClick={() => navigate('/proposals/new')}
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Proposal
        </button>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Proposal Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Date Created
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
            {proposals.map((proposal) => (
              <tr
                key={proposal.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-blue-600 dark:text-blue-400">
                  {proposal.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                  Project Name
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                  {formatDate(proposal.dateCreated)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      proposal.status === 'Finalized'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : proposal.status === 'Sent'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}
                  >
                    {proposal.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleExport(proposal.id, 'google-doc')}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      title="Export to Google Docs"
                    >
                      <FileText className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleExport(proposal.id, 'google-sheet')}
                      className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                      title="Export to Google Sheets"
                    >
                      <FileSpreadsheet className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteProposal(proposal.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      title="Delete Proposal"
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
  );
}