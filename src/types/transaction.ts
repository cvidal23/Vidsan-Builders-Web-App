export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  projectId?: string;
  status: 'Pending' | 'Categorized';
  createdAt: string;
  updatedAt: string;
}

export interface TransactionFilters {
  dateRange: string;
  category: string;
  project: string;
  status: string;
}

export interface TransactionTotals {
  total: number;
  income: number;
  expenses: number;
}