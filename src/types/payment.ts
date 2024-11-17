export interface Payment {
  id: string;
  projectId: string;
  description: string;
  scheduledValue: number;
  paidValue: number;
  workCompleted: number;
  datePaid: string;
  checkNumber: string;
  balanceToFinish: number;
  status: 'Pending' | 'Paid' | 'Overdue';
  createdAt: string;
  updatedAt: string;
}

export interface PaymentFormData {
  description: string;
  scheduledValue: number;
  paidValue: number;
  workCompleted: number;
  datePaid: string;
  checkNumber: string;
}

export interface PaymentTotals {
  scheduledValue: number;
  paidValue: number;
  workCompleted: number;
  balanceToFinish: number;
}