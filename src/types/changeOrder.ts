export interface ChangeOrderItem {
  id: string;
  description: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface ChangeOrder {
  id: string;
  projectId: string;
  orderNumber: string;
  title: string;
  description: string;
  datePaid?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  items: ChangeOrderItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChangeOrderFormData {
  title: string;
  description: string;
  items: {
    description: string;
    amount: number;
  }[];
}