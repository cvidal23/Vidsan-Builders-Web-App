import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { Payment, PaymentTotals } from '../types/payment';

// Mock data for development
const mockPayments: Payment[] = [
  {
    id: '1',
    projectId: '1',
    description: 'Initial Payment',
    scheduledValue: 50000,
    paidValue: 25000,
    workCompleted: 50,
    datePaid: '2024-03-15',
    checkNumber: '1234',
    balanceToFinish: 25000,
    status: 'Paid',
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
  },
  // Add more mock payments as needed
];

export function usePayments(projectId: string) {
  const queryClient = useQueryClient();

  const { data: payments = mockPayments, isLoading } = useQuery({
    queryKey: ['payments', projectId],
    queryFn: async () => {
      // In production, fetch from Firebase
      return mockPayments;
    },
  });

  const addPayment = useMutation({
    mutationFn: async (data: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>) => {
      // In production, add to Firebase
      return { id: Math.random().toString(), ...data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['payments', projectId]);
      toast.success('Payment added successfully');
    },
    onError: () => {
      toast.error('Failed to add payment');
    },
  });

  const updatePayment = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Payment> }) => {
      // In production, update in Firebase
      return { id, ...data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['payments', projectId]);
      toast.success('Payment updated successfully');
    },
    onError: () => {
      toast.error('Failed to update payment');
    },
  });

  const deletePayment = useMutation({
    mutationFn: async (id: string) => {
      // In production, delete from Firebase
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['payments', projectId]);
      toast.success('Payment deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete payment');
    },
  });

  const totals: PaymentTotals = payments.reduce(
    (acc, payment) => ({
      scheduledValue: acc.scheduledValue + payment.scheduledValue,
      paidValue: acc.paidValue + payment.paidValue,
      workCompleted: acc.workCompleted + payment.workCompleted,
      balanceToFinish: acc.balanceToFinish + payment.balanceToFinish,
    }),
    {
      scheduledValue: 0,
      paidValue: 0,
      workCompleted: 0,
      balanceToFinish: 0,
    }
  );

  return {
    payments,
    totals,
    isLoading,
    addPayment: (data: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>) =>
      addPayment.mutateAsync(data),
    updatePayment: (id: string, data: Partial<Payment>) =>
      updatePayment.mutateAsync({ id, data }),
    deletePayment: (id: string) => deletePayment.mutateAsync(id),
  };
}