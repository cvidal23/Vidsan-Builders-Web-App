import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatCurrency } from './utils';

interface CSIDetailData {
  projectId: string;
  csiCode: string;
  title: string;
  contractNo: string;
  summary: {
    ETC: number;
    Fee: number;
    TotalBudget: number;
  };
  expenses: Array<{
    id: string;
    itemNo: string;
    csiCode: string;
    invoice: string;
    vendor: string;
    type: string;
    total: number;
  }>;
  subcontractorSOV: Array<{
    id: string;
    itemNo: string;
    payment: string;
    description: string;
    datePaid: string;
    checkNumber: string;
    popNumber: string;
    signedWaiver: boolean;
    total: number;
  }>;
}

export function generatePDF(data: CSIDetailData): void {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  // Add header
  doc.setFontSize(16);
  doc.text(`CSI Detail: ${data.csiCode} - ${data.title}`, 14, 20);

  // Add project info
  doc.setFontSize(12);
  doc.text(`Project No: ${data.projectId}`, 14, 30);
  doc.text(`Contract No: ${data.contractNo}`, 14, 37);

  // Add summary
  doc.text('Summary:', 14, 47);
  doc.text(`ETC: ${formatCurrency(data.summary.ETC)}`, 14, 54);
  doc.text(`Fee: ${formatCurrency(data.summary.Fee)}`, 14, 61);
  doc.text(`Total Budget: ${formatCurrency(data.summary.TotalBudget)}`, 14, 68);

  // Add expenses table
  doc.text('Expenses:', 14, 78);
  autoTable(doc, {
    startY: 85,
    head: [
      [
        'Item #',
        'CSI Code',
        'Invoice',
        'Vendor',
        'Type',
        'Total',
      ],
    ],
    body: data.expenses.map((expense) => [
      expense.itemNo,
      expense.csiCode,
      expense.invoice,
      expense.vendor,
      expense.type,
      formatCurrency(expense.total),
    ]),
    theme: 'grid',
    headStyles: { fillColor: [59, 130, 246] },
    styles: { fontSize: 10 },
  });

  // Add SOV table
  const finalY = (doc as any).lastAutoTable.finalY || 85;
  doc.text('Schedule of Values:', 14, finalY + 10);
  
  autoTable(doc, {
    startY: finalY + 17,
    head: [
      [
        'Item #',
        'Payment',
        'Description',
        'Date Paid',
        'Check #',
        'POP #',
        'Signed Waiver',
        'Total',
      ],
    ],
    body: data.subcontractorSOV.map((sov) => [
      sov.itemNo,
      sov.payment,
      sov.description,
      sov.datePaid,
      sov.checkNumber,
      sov.popNumber,
      sov.signedWaiver ? '✓' : '✗',
      formatCurrency(sov.total),
    ]),
    theme: 'grid',
    headStyles: { fillColor: [59, 130, 246] },
    styles: { fontSize: 10 },
  });

  // Save the PDF
  doc.save(`csi-detail-${data.projectId}-${data.csiCode}.pdf`);
}

export function exportCSIDetailPDF(data: CSIDetailData): void {
  generatePDF(data);
}