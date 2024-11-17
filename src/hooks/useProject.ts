import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Project {
  id: string;
  name: string;
  address: string;
  projectNumber: string;
  contractNumber: string;
  taxRate: number;
  totalSqFeet: number;
  pricePerSqFeet: number;
}

// Mock data for development
const mockProject: Project = {
  id: '1',
  name: '2374 Tulip Rd San Jose',
  address: '2374 Tulip Rd, San Jose, CA 95128',
  projectNumber: '27',
  contractNumber: '27',
  taxRate: 8.84,
  totalSqFeet: 2408,
  pricePerSqFeet: 158.25,
};

export function useProject(projectId: string) {
  const { data: project = mockProject, isLoading, error } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      // In production, this would fetch from Firebase
      return mockProject;
    },
  });

  return { project, isLoading, error };
}