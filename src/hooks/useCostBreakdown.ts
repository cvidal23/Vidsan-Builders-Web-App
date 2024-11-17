import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, doc, getDoc, getDocs, query, where, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db, costBreakdownCollection } from '../lib/firebase';
import { CostItem } from '../types/costBreakdown';
import { csiCodes } from '../data/csiCodes';

// Helper function to calculate item costs
function calculateItemCosts(item: Partial<CostItem>): Partial<CostItem> {
  const originalCost = item.originalCost || 0;
  const subAdjustment = item.subAdjustment || 0;
  const feePercentage = item.feePercentage || 0;
  const expenses = item.expenses || 0;

  const fee = (originalCost * feePercentage) / 100;
  const totalCost = originalCost + subAdjustment + fee;
  const expectedProfit = totalCost - expenses;
  const etc = totalCost - expenses;
  const projectedProfit = expectedProfit;

  return {
    ...item,
    fee,
    totalCost,
    expectedProfit,
    etc,
    projectedProfit,
  };
}

// Create initial cost items from CSI codes
function createInitialCostItems(projectId: string): CostItem[] {
  return csiCodes.map(code => ({
    id: code.code,
    projectId,
    csiCode: code.code,
    scope: code.title,
    originalCost: 0,
    subAdjustment: 0,
    feePercentage: 10,
    fee: 0,
    totalCost: 0,
    expectedProfit: 0,
    expenses: 0,
    etc: 0,
    projectedProfit: 0,
    isLocked: false,
    subItems: code.subItems?.map(subItem => ({
      id: subItem.code,
      projectId,
      csiCode: subItem.code,
      scope: subItem.title,
      originalCost: 0,
      subAdjustment: 0,
      feePercentage: 10,
      fee: 0,
      totalCost: 0,
      expectedProfit: 0,
      expenses: 0,
      etc: 0,
      projectedProfit: 0,
      isLocked: false,
    })),
  }));
}

export function useCostBreakdown(projectId: string) {
  const queryClient = useQueryClient();

  // For development, we'll use mock data initially
  const { data: costItems = createInitialCostItems(projectId), isLoading, error } = useQuery({
    queryKey: ['costBreakdown', projectId],
    queryFn: async () => {
      // In production, this would fetch from Firebase
      // For now, return mock data
      return createInitialCostItems(projectId);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ itemId, data }: { itemId: string; data: Partial<CostItem> }) => {
      const updatedData = calculateItemCosts(data);
      // In production, this would update Firebase
      return { id: itemId, ...updatedData };
    },
    onSuccess: (updatedItem) => {
      queryClient.setQueryData(['costBreakdown', projectId], (oldData: CostItem[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.map(item => 
          item.id === updatedItem.id ? { ...item, ...updatedItem } : item
        );
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (itemId: string) => {
      // In production, this would delete from Firebase
      return itemId;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData(['costBreakdown', projectId], (oldData: CostItem[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.filter(item => item.id !== deletedId);
      });
    },
  });

  // Add mutation
  const addMutation = useMutation({
    mutationFn: async (data: Partial<CostItem>) => {
      const calculatedData = calculateItemCosts(data);
      // In production, this would add to Firebase
      return { id: Math.random().toString(), ...calculatedData };
    },
    onSuccess: (newItem) => {
      queryClient.setQueryData(['costBreakdown', projectId], (oldData: CostItem[] | undefined) => {
        if (!oldData) return [newItem];
        return [...oldData, newItem];
      });
    },
  });

  // Calculate project totals
  const projectTotals = costItems.reduce(
    (acc, item) => {
      acc.totalCost += item.totalCost;
      acc.expectedProfit += item.expectedProfit;
      acc.expenses += item.expenses;
      acc.projectedProfit += item.projectedProfit;

      if (item.subItems) {
        item.subItems.forEach(subItem => {
          acc.totalCost += subItem.totalCost;
          acc.expectedProfit += subItem.expectedProfit;
          acc.expenses += subItem.expenses;
          acc.projectedProfit += subItem.projectedProfit;
        });
      }

      return acc;
    },
    {
      totalCost: 0,
      expectedProfit: 0,
      expenses: 0,
      projectedProfit: 0,
    }
  );

  return {
    costItems,
    projectTotals,
    isLoading,
    error,
    updateCostItem: (itemId: string, data: Partial<CostItem>) =>
      updateMutation.mutateAsync({ itemId, data }),
    deleteCostItem: (itemId: string) => deleteMutation.mutateAsync(itemId),
    addCostItem: (data: Partial<CostItem>) => addMutation.mutateAsync(data),
  };
}