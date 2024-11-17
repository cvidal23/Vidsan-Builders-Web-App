import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { Proposal, ProposalFormData } from '../types/proposal';

// Mock data for development
const mockProposals: Proposal[] = [
  {
    id: '1',
    name: 'Office Renovation Proposal',
    projectId: '1',
    clientId: '1',
    dateCreated: '2024-03-15',
    status: 'Draft',
    csiSubScopes: [
      {
        id: '1',
        scopeName: 'Demolition',
        uom: 'SF',
        lowPrice: 5000,
        highPrice: 7000,
        createdAt: '2024-03-15T00:00:00Z',
      },
    ],
    takeoffs: [
      {
        id: '1',
        uom: 'SF',
        quantity: 1000,
        description: 'Interior demolition',
        createdAt: '2024-03-15T00:00:00Z',
      },
    ],
    exclusions: ['Permits', 'Hazardous materials removal'],
    notes: 'Proposal valid for 30 days',
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
  },
];

export function useProposals(projectId?: string) {
  const queryClient = useQueryClient();

  const { data: proposals = mockProposals, isLoading } = useQuery({
    queryKey: ['proposals', projectId],
    queryFn: async () => {
      // In production, fetch from Firebase
      return mockProposals;
    },
  });

  const createProposal = useMutation({
    mutationFn: async (data: ProposalFormData) => {
      // In production, this would be handled by the backend
      const proposal = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        dateCreated: new Date().toISOString(),
        status: 'Draft' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return proposal;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['proposals']);
      toast.success('Proposal created successfully');
    },
    onError: () => {
      toast.error('Failed to create proposal');
    },
  });

  const exportProposal = useMutation({
    mutationFn: async ({
      proposalId,
      format,
    }: {
      proposalId: string;
      format: 'google-doc' | 'google-sheet';
    }) => {
      // In production, this would be handled by the backend
      toast.success(`Exported proposal to ${format}`);
    },
  });

  const deleteProposal = useMutation({
    mutationFn: async (id: string) => {
      // In production, delete from Firebase
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['proposals']);
      toast.success('Proposal deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete proposal');
    },
  });

  return {
    proposals,
    isLoading,
    createProposal: (data: ProposalFormData) => createProposal.mutateAsync(data),
    exportProposal: (proposalId: string, format: 'google-doc' | 'google-sheet') =>
      exportProposal.mutateAsync({ proposalId, format }),
    deleteProposal: (id: string) => deleteProposal.mutateAsync(id),
  };
}