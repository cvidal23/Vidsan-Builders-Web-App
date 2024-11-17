import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { formatCurrency } from './utils';
import { Payment, PaymentTotals } from '../types/payment';
import { ChangeOrder } from '../types/changeOrder';

export function exportPaymentsPDF(payments: Payment[], totals: PaymentTotals): void {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  // Add title
  doc.setFontSize(16);
  doc.text('Project Payments', 14, 20);

  // Add totals
  doc.setFontSize(12);
  doc.text(`Total Scheduled Value: ${formatCurrency(totals.scheduledValue)}`, 14, 30);
  doc.text(`Total Paid Value: ${formatCurrency(totals.paidValue)}`, 14, 37);
  doc.text(`Total Balance: ${formatCurrency(totals.balanceToFinish)}`, 14, 44);

  // Add payments table
  autoTable(doc, {
    startY: 55,
    head: [
      [
        'Description',
        'Scheduled Value',
        'Paid Value',
        '% Complete',
        'Date Paid',
        'Check #',
        'Balance',
        'Status',
      ],
    ],
    body: payments.map((payment) => [
      payment.description,
      formatCurrency(payment.scheduledValue),
      formatCurrency(payment.paidValue),
      `${payment.workCompleted}%`,
      payment.datePaid,
      payment.checkNumber,
      formatCurrency(payment.balanceToFinish),
      payment.status,
    ]),
    theme: 'grid',
    headStyles: { fillColor: [59, 130, 246] },
    styles: { fontSize: 10 },
  });

  doc.save('project-payments.pdf');
}

export function exportChangeOrdersPDF(changeOrders: ChangeOrder[]): void {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  // Add title
  doc.setFontSize(16);
  doc.text('Change Orders', 14, 20);

  // Add change orders table
  autoTable(doc, {
    startY: 30,
    head: [
      ['Order #', 'Title', 'Description', 'Date Paid', 'Total Amount', 'Status'],
    ],
    body: changeOrders.map((order) => [
      order.orderNumber,
      order.title,
      order.description,
      order.datePaid || '-',
      formatCurrency(order.totalAmount),
      order.status,
    ]),
    theme: 'grid',
    headStyles: { fillColor: [59, 130, 246] },
    styles: { fontSize: 10 },
  });

  doc.save('change-orders.pdf');
}

export function exportPaymentsExcel(payments: Payment[], totals: PaymentTotals): void {
  const worksheet = XLSX.utils.json_to_sheet([
    {
      'Total Scheduled Value': formatCurrency(totals.scheduledValue),
      'Total Paid Value': formatCurrency(totals.paidValue),
      'Total Balance': formatCurrency(totals.balanceToFinish),
    },
  ]);

  // Add empty row
  XLSX.utils.sheet_add_json(worksheet, [], { origin: 'A3' });

  // Add payments
  XLSX.utils.sheet_add_json(
    worksheet,
    payments.map((payment) => ({
      Description: payment.description,
      'Scheduled Value': payment.scheduledValue,
      'Paid Value': payment.paidValue,
      'Work Completed': `${payment.workCompleted}%`,
      'Date Paid': payment.datePaid,
      'Check #': payment.checkNumber,
      'Balance to Finish': payment.balanceToFinish,
      Status: payment.status,
    })),
    { origin: 'A4' }
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Payments');
  XLSX.writeFile(workbook, 'project-payments.xlsx');
}

export function exportChangeOrdersExcel(changeOrders: ChangeOrder[]): void {
  const worksheet = XLSX.utils.json_to_sheet(
    changeOrders.map((order) => ({
      'Order #': order.orderNumber,
      Title: order.title,
      Description: order.description,
      'Date Paid': order.datePaid || '-',
      'Total Amount': order.totalAmount,
      Status: order.status,
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Change Orders');
  XLSX.writeFile(workbook, 'change-orders.xlsx');
}