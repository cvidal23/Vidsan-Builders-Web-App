export interface CostItem {
  id: string;
  csiCode: string;
  scope: string;
  originalCost: number;
  subAdjustment: number;
  feePercentage: number;
  fee: number;
  totalCost: number;
  expectedProfit: number;
  expenses: number;
  etc: number;
  projectedProfit: number;
  isLocked?: boolean;
  subItems?: CostItem[];
}

export interface ProjectTotals {
  totalCost: number;
  expectedProfit: number;
  expenses: number;
  projectedProfit: number;
}