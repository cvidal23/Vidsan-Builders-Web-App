import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2 } from 'lucide-react';
import { useProposals } from '../hooks/useProposals';
import type { ProposalFormData } from '../types/proposal';

const proposalSchema = z.object({
  name: z.string().min(1, 'Proposal name is required'),
  projectId: z.string().min(1, 'Project is required'),
  clientId: z.string().min(1, 'Client is required'),
  csiSubScopes: z.array(
    z.object({
      scopeName: z.string().min(1, 'Scope name is required'),
      uom: z.string().min(1, 'UOM is required'),
      lowPrice: z.number().min(0, 'Low price must be greater than or equal to 0'),
      highPrice: z.number().min(0, 'High price must be greater than or equal to 0'),
    })
  ),
  takeoffs: z.array(
    z.object({
      uom: z.string().min(1, 'UOM is required'),
      quantity: z.number().min(0, 'Quantity must be greater than or equal to 0'),
      description: z.string().min(1, 'Description is required'),
    })
  ),
  exclusions: z.array(z.string()),
  notes: z.string(),
});

export default function ProposalForm() {
  const navigate = useNavigate();
  const { createProposal } = useProposals();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      name: '',
      projectId: '',
      clientId: '',
      csiSubScopes: [{ scopeName: '', uom: '', lowPrice: 0, highPrice: 0 }],
      takeoffs: [{ uom: '', quantity: 0, description: '' }],
      exclusions: [''],
      notes: '',
    },
  });

  const {
    fields: csiFields,
    append: appendCsi,
    remove: removeCsi,
  } = useFieldArray({
    control,
    name: 'csiSubScopes',
  });

  const {
    fields: takeoffFields,
    append: appendTakeoff,
    remove: removeTakeoff,
  } = useFieldArray({
    control,
    name: 'takeoffs',
  });

  const {
    fields: exclusionFields,
    append: appendExclusion,
    remove: removeExclusion,
  } = useFieldArray({
    control,
    name: 'exclusions',
  });

  const onSubmit = async (data: ProposalFormData) => {
    try {
      await createProposal(data);
      navigate('/proposals');
    } catch (error) {
      console.error('Error creating proposal:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Proposal Details
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Proposal Name
              </label>
              <input
                type="text"
                {...register('name')}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Project
              </label>
              <select
                {...register('projectId')}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
              >
                <option value="">Select Project</option>
                <option value="1">Project 1</option>
                <option value="2">Project 2</option>
              </select>
              {errors.projectId && (
                <p className="mt-1 text-sm text-red-600">{errors.projectId.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Client
              </label>
              <select
                {...register('clientId')}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
              >
                <option value="">Select Client</option>
                <option value="1">Client 1</option>
                <option value="2">Client 2</option>
              </select>
              {errors.clientId && (
                <p className="mt-1 text-sm text-red-600">{errors.clientId.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* CSI Sub-Scopes */}
        <div className="space-y-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              CSI Sub-Scopes
            </h2>
            <button
              type="button"
              onClick={() =>
                appendCsi({ scopeName: '', uom: '', lowPrice: 0, highPrice: 0 })
              }
              className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Sub-Scope
            </button>
          </div>

          <div className="space-y-4">
            {csiFields.map((field, index) => (
              <div key={field.id} className="flex items-start space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    {...register(`csiSubScopes.${index}.scopeName`)}
                    placeholder="Scope Name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                </div>
                <div className="w-24">
                  <input
                    type="text"
                    {...register(`csiSubScopes.${index}.uom`)}
                    placeholder="UOM"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    {...register(`csiSubScopes.${index}.lowPrice`, {
                      valueAsNumber: true,
                    })}
                    placeholder="Low Price"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    {...register(`csiSubScopes.${index}.highPrice`, {
                      valueAsNumber: true,
                    })}
                    placeholder="High Price"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeCsi(index)}
                  className="mt-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Takeoffs */}
        <div className="space-y-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Takeoffs
            </h2>
            <button
              type="button"
              onClick={() =>
                appendTakeoff({ uom: '', quantity: 0, description: '' })
              }
              className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Takeoff
            </button>
          </div>

          <div className="space-y-4">
            {takeoffFields.map((field, index) => (
              <div key={field.id} className="flex items-start space-x-4">
                <div className="w-24">
                  <input
                    type="text"
                    {...register(`takeoffs.${index}.uom`)}
                    placeholder="UOM"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    {...register(`takeoffs.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                    placeholder="Quantity"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    {...register(`takeoffs.${index}.description`)}
                    placeholder="Description"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeTakeoff(index)}
                  className="mt-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Exclusions and Notes */}
        <div className="space-y-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Exclusions and Notes
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Exclusions
              </label>
              <div className="mt-2 space-y-2">
                {exclusionFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      {...register(`exclusions.${index}`)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => removeExclusion(index)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => appendExclusion('')}
                className="mt-2 text-sm text-blue-600 hover:text-blue-500"
              >
                Add Exclusion
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Notes
              </label>
              <textarea
                {...register('notes')}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/proposals')}
            className="rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Proposal'}
          </button>
        </div>
      </form>
    </div>
  );
}