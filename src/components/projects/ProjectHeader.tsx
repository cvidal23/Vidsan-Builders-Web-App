import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useProject } from '../../hooks/useProject';

interface ProjectHeaderProps {
  projectId: string;
}

export function ProjectHeader({ projectId }: ProjectHeaderProps) {
  const { project } = useProject(projectId);

  if (!project) return null;

  return (
    <div className="pb-4 pt-6">
      <div className="mb-4">
        <Link
          to="/projects"
          className="inline-flex items-center text-sm text-gray-400 hover:text-white"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Projects
        </Link>
      </div>

      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-white">
          {project.name}
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          {project.address}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-lg bg-[#232830] p-4">
          <p className="text-sm font-medium text-gray-400">Project no.</p>
          <p className="mt-1 text-lg font-semibold text-white">{project.projectNumber}</p>
        </div>
        <div className="rounded-lg bg-[#232830] p-4">
          <p className="text-sm font-medium text-gray-400">Contract no.</p>
          <p className="mt-1 text-lg font-semibold text-white">{project.contractNumber}</p>
        </div>
        <div className="rounded-lg bg-[#232830] p-4">
          <p className="text-sm font-medium text-gray-400">Total Sq. Feet</p>
          <p className="mt-1 text-lg font-semibold text-white">{project.totalSqFeet}</p>
        </div>
        <div className="rounded-lg bg-[#232830] p-4">
          <p className="text-sm font-medium text-gray-400">Price per Sq. Feet</p>
          <p className="mt-1 text-lg font-semibold text-white">${project.pricePerSqFeet}</p>
        </div>
      </div>
    </div>
  );
}