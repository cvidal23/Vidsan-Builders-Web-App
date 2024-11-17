// Update the onSubmit function in AddLineItemModal.tsx
const onSubmit = async (data: Partial<CostItem>) => {
  try {
    await onAdd({
      ...data,
      originalCost: Number(data.originalCost) || 0,
      subAdjustment: Number(data.subAdjustment) || 0,
      feePercentage: Number(data.feePercentage) || 10,
      expenses: Number(data.expenses) || 0,
    });
    toast.success('Line item added successfully');
    onClose();
  } catch (error) {
    console.error('Error adding line item:', error);
    toast.error('Failed to add line item. Please try again.');
  }
};