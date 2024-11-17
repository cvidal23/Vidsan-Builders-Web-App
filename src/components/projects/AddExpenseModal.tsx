import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const expenseSchema = z.object({
  itemNo: z.string().min(1, 'Item number is required'),
  invoice: z.string().min(1, 'Invoice number is required'),
  vendor: z.string().min(1, 'Vendor name is required'),
  type: z.string().min(1, 'Type is required'),
  total: z.number().min(0, 'Total must be greater than or equal to 0'),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (expense: ExpenseFormData) => Promise<void>;
  csiCode: string;
}

export function AddExpenseModal({
  isOpen,
  onClose,
  onAdd,
  csiCode,
}: AddExpenseModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      total: 0,
    },
  });

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      await onAdd({
        ...data,
        csiCode,
      });
      reset();
      onClose();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-md rounded-lg bg-[#2A303C] p-6">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-lg font-medium text-white">
              Add Expense
            </Dialog.Title>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400">
                Item Number
              </label>
              <input
                type="text"
                {...register('itemNo')}
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.itemNo && (
                <p className="mt-1 text-sm text-red-500">{errors.itemNo.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">
                Invoice/Receipt Number
              </label>
              <input
                type="text"
                {...register('invoice')}
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.invoice && (
                <p className="mt-1 text-sm text-red-500">{errors.invoice.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">
                Vendor
              </label>
              <input
                type="text"
                {...register('vendor')}
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.vendor && (
                <p className="mt-1 text-sm text-red-500">{errors.vendor.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">
                Type
              </label>
              <input
                type="text"
                {...register('type')}
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.type && (
                <p className="mt-1 text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">
                Total
              </label>
              <input
                type="number"
                step="0.01"
                {...register('total', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.total && (
                <p className="mt-1 text-sm text-red-500">{errors.total.message}</p>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Adding...' : 'Add Expense'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}