import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { Transaction, TransactionFilters, TransactionTotals } from '../types/transaction';

// Mock data for development
const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-03-15',
    description: 'Home Depot Purchase',
    category: 'materials',
    amount: -2500.00,
    projectId: '1',
    status: 'Categorized',
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
  },
  // Add more mock transactions
];

export function useTransactions(filters: TransactionFilters) {
  const queryClient = useQueryClient();

  const { data: transactions = mockTransactions, isLoading } = useQuery({
    queryKey: ['transactions', filters],
    queryFn: async () => {
      // In production, fetch from Firebase
      return mockTransactions;
    },
  });

  const totals: TransactionTotals = transactions.reduce(
    (acc, transaction) => ({
      total: acc.total + Math.abs(transaction.amount),
      income: acc.income + (transaction.amount > 0 ? transaction.amount : 0),
      expenses: acc.expenses + (transaction.amount < 0 ? Math.abs(transaction.amount) : 0),
    }),
    { total: 0, income: 0, expenses: 0 }
  );

  const syncTransactions = async (publicToken: string) => {
    try {
      // In production, exchange public token and fetch transactions
      toast.success('Transactions synced successfully');
      queryClient.invalidateQueries(['transactions']);
    } catch (error) {
      toast.error('Failed to sync transactions');
    }
  };

  const exportTransactions = async (type: 'pdf' | 'excel', filters: TransactionFilters) => {
    try {
      // In production, generate and download file
      toast.success(`Transactions exported to ${type.toUpperCase()}`);
    } catch (error) {
      toast.error('Failed to export transactions');
    }
  };

  return {
    transactions,
    totals,
    isLoading,
    syncTransactions,
    exportTransactions,
  };
}