import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { generatePDF } from '../lib/pdf';

interface CSIDetailData {
  projectId: string;
  csiCode: string;
  title: string;
  contractNo: string;
  summary: {
    ETC: number;
    Fee: number;
    TotalBudget: number;
  };
  expenses: Array<{
    id: string;
    itemNo: string;
    csiCode: string;
    invoice: string;
    vendor: string;
    type: string;
    total: number;
  }>;
  subcontractorSOV: Array<{
    id: string;
    itemNo: string;
    payment: string;
    description: string;
    datePaid: string;
    checkNumber: string;
    popNumber: string;
    signedWaiver: boolean;
    total: number;
  }>;
}

// Mock data for development
const mockData: CSIDetailData = {
  projectId: '27',
  csiCode: '01.1',
  title: 'Temporary Toilets',
  contractNo: '27',
  summary: {
    ETC: 150000,
    Fee: 15000,
    TotalBudget: 200000,
  },
  expenses: [
    {
      id: '1',
      itemNo: 'EXP-001',
      csiCode: '01.1',
      invoice: 'INV-2024-001',
      vendor: 'Home Depot',
      type: 'Materials',
      total: 1500,
    },
  ],
  subcontractorSOV: [
    {
      id: '1',
      itemNo: 'SOV-001',
      payment: 'Payment 1',
      description: 'Initial work',
      datePaid: '2024-03-15',
      checkNumber: 'CHK-001',
      popNumber: 'POP-001',
      signedWaiver: true,
      total: 5000,
    },
  ],
};

const mockSubcontractors = [
  { id: '1', name: 'James H Construction' },
  { id: '2', name: 'Smith Builders' },
];

export function useCSIDetail(projectId: string, csiCode: string) {
  const queryClient = useQueryClient();
  const [selectedSubcontractor, setSelectedSubcontractor] = useState(mockSubcontractors[0].id);

  // Fetch CSI detail data
  const { data } = useQuery({
    queryKey: ['csiDetail', projectId, csiCode],
    queryFn: async () => {
      // In production, this would fetch from Firebase
      return mockData;
    },
  });

  // Fetch subcontractors
  const { data: subcontractors = mockSubcontractors } = useQuery({
    queryKey: ['subcontractors', projectId],
    queryFn: async () => {
      // In production, this would fetch from Firebase
      return mockSubcontractors;
    },
  });

  // Add expense mutation
  const addExpenseMutation = useMutation({
    mutationFn: async (newExpense: Omit<CSIDetailData['expenses'][0], 'id'>) => {
      // In production, this would add to Firebase
      return { id: Math.random().toString(), ...newExpense };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['csiDetail', projectId, csiCode]);
      toast.success('Expense added successfully');
    },
  });

  // Add SOV mutation
  const addSOVMutation = useMutation({
    mutationFn: async (newSOV: Omit<CSIDetailData['subcontractorSOV'][0], 'id'>) => {
      // In production, this would add to Firebase
      return { id: Math.random().toString(), ...newSOV };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['csiDetail', projectId, csiCode]);
      toast.success('Schedule of Values added successfully');
    },
  });

  // Delete expense mutation
  const deleteExpenseMutation = useMutation({
    mutationFn: async (expenseId: string) => {
      // In production, this would delete from Firebase
      return expenseId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['csiDetail', projectId, csiCode]);
      toast.success('Expense deleted successfully');
    },
  });

  // Delete SOV mutation
  const deleteSOVMutation = useMutation({
    mutationFn: async (sovId: string) => {
      // In production, this would delete from Firebase
      return sovId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['csiDetail', projectId, csiCode]);
      toast.success('Schedule of Values deleted successfully');
    },
  });

  // Export to PDF
  const exportPDF = async () => {
    if (!data) {
      toast.error('No data available to export');
      return;
    }
    
    try {
      generatePDF(data);
      toast.success('PDF exported successfully');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Failed to export PDF');
    }
  };

  return {
    data,
    subcontractors,
    selectedSubcontractor,
    setSelectedSubcontractor,
    addExpense: (expense: Omit<CSIDetailData['expenses'][0], 'id'>) =>
      addExpenseMutation.mutateAsync(expense),
    addSOV: (sov: Omit<CSIDetailData['subcontractorSOV'][0], 'id'>) =>
      addSOVMutation.mutateAsync(sov),
    deleteExpense: (expenseId: string) => deleteExpenseMutation.mutateAsync(expenseId),
    deleteSOV: (sovId: string) => deleteSOVMutation.mutateAsync(sovId),
    exportPDF,
  };
}