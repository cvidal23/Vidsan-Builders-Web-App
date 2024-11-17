import { useQuery } from '@tanstack/react-query';

interface ProjectInvoice {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending';
  items: {
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }[];
}

const mockInvoices: ProjectInvoice[] = [
  {
    id: '1',
    number: 'INV-2024-001',
    date: '2024-03-15',
    amount: 25000,
    status: 'Paid',
    items: [
      {
        description: 'Initial Planning and Design',
        quantity: 1,
        rate: 15000,
        amount: 15000,
      },
      {
        description: 'Materials',
        quantity: 1,
        rate: 10000,
        amount: 10000,
      },
    ],
  },
  // Add more mock invoices as needed
];

export function useProjectInvoices(projectId: string) {
  const { data: invoices = mockInvoices, isLoading, error } = useQuery({
    queryKey: ['projectInvoices', projectId],
    queryFn: async () => {
      // In production, this would fetch from Firebase
      return mockInvoices;
    },
  });

  return { invoices, isLoading, error };
}