export interface Subcontractor {
  id: string;
  projectId: string;
  name: string;
  licenseNumber: string;
  contactName: string;
  phone: string;
  email: string;
  contractValue: number;
  paidToDate: number;
  insuranceExpiry: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubcontractorFormData {
  name: string;
  licenseNumber: string;
  contactName: string;
  phone: string;
  email: string;
  contractValue: number;
  insuranceExpiry: string;
}