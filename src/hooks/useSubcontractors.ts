import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { Subcontractor } from '../types/subcontractor';

// Mock data for development
const mockSubcontractors: Subcontractor[] = [
  {
    id: '1',
    projectId: '1',
    name: 'ABC Construction',
    licenseNumber: 'LIC-123456',
    contactName: 'John Smith',
    phone: '(555) 123-4567',
    email: 'john@abcconstruction.com',
    contractValue: 250000,
    paidToDate: 100000,
    insuranceExpiry: '2024-12-31',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
  },
  {
    id: '2',
    projectId: '1',
    name: 'XYZ Contractors',
    licenseNumber: 'LIC-789012',
    contactName: 'Jane Doe',
    phone: '(555) 987-6543',
    email: 'jane@xyzcontractors.com',
    contractValue: 180000,
    paidToDate: 90000,
    insuranceExpiry: '2024-11-30',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
  },
];

export function useSubcontractors(projectId: string) {
  const queryClient = useQueryClient();

  const { data: subcontractors = mockSubcontractors, isLoading } = useQuery({
    queryKey: ['subcontractors', projectId],
    queryFn: async () => {
      // In production, fetch from Firebase
      return mockSubcontractors;
    },
  });

  const addSubcontractor = useMutation({
    mutationFn: async (data: Omit<Subcontractor, 'id' | 'createdAt' | 'updatedAt'>) => {
      // In production, add to Firebase
      return { id: Math.random().toString(), ...data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['subcontractors', projectId]);
      toast.success('Subcontractor added successfully');
    },
    onError: () => {
      toast.error('Failed to add subcontractor');
    },
  });

  const updateSubcontractor = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Subcontractor> }) => {
      // In production, update in Firebase
      return { id, ...data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['subcontractors', projectId]);
      toast.success('Subcontractor updated successfully');
    },
    onError: () => {
      toast.error('Failed to update subcontractor');
    },
  });

  const deleteSubcontractor = useMutation({
    mutationFn: async (id: string) => {
      // In production, delete from Firebase
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['subcontractors', projectId]);
      toast.success('Subcontractor deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete subcontractor');
    },
  });

  return {
    subcontractors,
    isLoading,
    addSubcontractor: (data: Omit<Subcontractor, 'id' | 'createdAt' | 'updatedAt'>) =>
      addSubcontractor.mutateAsync(data),
    updateSubcontractor: (id: string, data: Partial<Subcontractor>) =>
      updateSubcontractor.mutateAsync({ id, data }),
    deleteSubcontractor: (id: string) => deleteSubcontractor.mutateAsync(id),
  };
}