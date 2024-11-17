export interface CSISubScope {
  id: string;
  scopeName: string;
  uom: string;
  lowPrice: number;
  highPrice: number;
  createdAt: string;
}

export interface Takeoff {
  id: string;
  uom: string;
  quantity: number;
  description: string;
  createdAt: string;
}

export interface Proposal {
  id: string;
  name: string;
  projectId: string;
  clientId: string;
  dateCreated: string;
  status: 'Draft' | 'Finalized' | 'Sent';
  folderId?: string;
  googleDocId?: string;
  googleSheetId?: string;
  csiSubScopes: CSISubScope[];
  takeoffs: Takeoff[];
  exclusions: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProposalFormData {
  name: string;
  projectId: string;
  clientId: string;
  csiSubScopes: Omit<CSISubScope, 'id' | 'createdAt'>[];
  takeoffs: Omit<Takeoff, 'id' | 'createdAt'>[];
  exclusions: string[];
  notes: string;
}