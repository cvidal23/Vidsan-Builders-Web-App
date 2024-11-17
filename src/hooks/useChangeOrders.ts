import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { ChangeOrder } from '../types/changeOrder';

// Mock data for development
const mockChangeOrders: ChangeOrder[] = [
  {
    id: '1',
    projectId: '1',
    orderNumber: 'CO-001',
    title: 'Additional Bathroom Fixtures',
    description: 'Installation of premium fixtures in master bathroom',
    datePaid: '2024-03-15',
    status: 'Approved',
    items: [
      {
        id: '1',
        description: 'Premium Faucets',
        amount: 5000,
        status: 'Approved',
      },
      {
        id: '2',
        description: 'Custom Vanity',
        amount: 8000,
        status: 'Approved',
      },
    ],
    totalAmount: 13000,
    createdAt: '2024-03-10T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
  },
  // Add more mock change orders as needed
];

export function useChangeOrders(projectId: string) {
  const queryClient = useQueryClient();

  const { data: changeOrders = mockChangeOrders, isLoading } = useQuery({
    queryKey: ['changeOrders', projectId],
    queryFn: async () => {
      // In production, fetch from Firebase
      return mockChangeOrders;
    },
  });

  const addChangeOrder = useMutation({
    mutationFn: async (data: Omit<ChangeOrder, 'id' | 'createdAt' | 'updatedAt'>) => {
      // In production, add to Firebase
      return { id: Math.random().toString(), ...data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['changeOrders', projectId]);
      toast.success('Change order added successfully');
    },
    onError: () => {
      toast.error('Failed to add change order');
    },
  });

  const updateChangeOrder = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ChangeOrder> }) => {
      // In production, update in Firebase
      return { id, ...data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['changeOrders', projectId]);
      toast.success('Change order updated successfully');
    },
    onError: () => {
      toast.error('Failed to update change order');
    },
  });

  const deleteChangeOrder = useMutation({
    mutationFn: async (id: string) => {
      // In production, delete from Firebase
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['changeOrders', projectId]);
      toast.success('Change order deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete change order');
    },
  });

  const totalAmount = changeOrders.reduce(
    (total, order) => total + order.totalAmount,
    0
  );

  return {
    changeOrders,
    totalAmount,
    isLoading,
    addChangeOrder: (data: Omit<ChangeOrder, 'id' | 'createdAt' | 'updatedAt'>) =>
      addChangeOrder.mutateAsync(data),
    updateChangeOrder: (id: string, data: Partial<ChangeOrder>) =>
      updateChangeOrder.mutateAsync({ id, data }),
    deleteChangeOrder: (id: string) => deleteChangeOrder.mutateAsync(id),
  };
}