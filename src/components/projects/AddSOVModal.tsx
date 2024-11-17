import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const sovSchema = z.object({
  itemNo: z.string().min(1, 'Item number is required'),
  payment: z.string().min(1, 'Payment is required'),
  description: z.string().min(1, 'Description is required'),
  datePaid: z.string().optional(),
  checkNumber: z.string().optional(),
  popNumber: z.string().optional(),
  signedWaiver: z.boolean().default(false),
  total: z.number().min(0, 'Total must be greater than or equal to 0'),
});

type SOVFormData = z.infer<typeof sovSchema>;

interface AddSOVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (sov: SOVFormData) => Promise<void>;
  csiCode: string;
  subcontractorId: string;
}

export function AddSOVModal({
  isOpen,
  onClose,
  onAdd,
  csiCode,
  subcontractorId,
}: AddSOVModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SOVFormData>({
    resolver: zodResolver(sovSchema),
    defaultValues: {
      total: 0,
      signedWaiver: false,
    },
  });

  const onSubmit = async (data: SOVFormData) => {
    try {
      await onAdd({
        ...data,
        csiCode,
        subcontractorId,
      });
      reset();
      onClose();
    } catch (error) {
      console.error('Error adding SOV:', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-md rounded-lg bg-[#2A303C] p-6">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-lg font-medium text-white">
              Add Schedule of Values
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
                Payment
              </label>
              <input
                type="text"
                {...register('payment')}
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.payment && (
                <p className="mt-1 text-sm text-red-500">{errors.payment.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">
                Description
              </label>
              <input
                type="text"
                {...register('description')}
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">
                Date Paid
              </label>
              <input
                type="date"
                {...register('datePaid')}
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">
                Check Number
              </label>
              <input
                type="text"
                {...register('checkNumber')}
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">
                POP Number
              </label>
              <input
                type="text"
                {...register('popNumber')}
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
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

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('signedWaiver')}
                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-400">
                Signed Waiver
              </label>
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
                {isSubmitting ? 'Adding...' : 'Add Schedule of Values'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}