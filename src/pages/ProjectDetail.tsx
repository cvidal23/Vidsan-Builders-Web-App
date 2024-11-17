import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectHeader } from '../components/projects/ProjectHeader';
import { ProjectTabs, ProjectTab } from '../components/projects/ProjectTabs';
import CostBreakdown from '../components/projects/CostBreakdown';
import { ChangeOrders } from '../components/projects/ChangeOrders';
import { Payments } from '../components/projects/Payments';
import { ProjectSchedule } from '../components/projects/ProjectSchedule';
import { ProjectInvoices } from '../components/projects/ProjectInvoices';
import { Subcontractors } from '../components/projects/Subcontractors';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<ProjectTab>('cost-breakdown');

  if (!id) return null;

  return (
    <div className="min-h-screen bg-[#1B2028]">
      {/* Fixed header section */}
      <div className="fixed left-0 right-0 top-16 z-30 bg-[#1B2028]">
        <div className="px-6">
          <ProjectHeader projectId={id} />
          <ProjectTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
      
      {/* Main content with padding to account for fixed header */}
      <div className="pt-[180px]">
        <div className="mx-auto">
          <div className="rounded-lg bg-[#232830] shadow">
            {activeTab === 'cost-breakdown' && <CostBreakdown projectId={id} />}
            {activeTab === 'change-orders' && <ChangeOrders projectId={id} />}
            {activeTab === 'payments' && <Payments projectId={id} />}
            {activeTab === 'schedule' && <ProjectSchedule projectId={id} />}
            {activeTab === 'invoices' && <ProjectInvoices projectId={id} />}
            {activeTab === 'subcontractors' && <Subcontractors projectId={id} />}
          </div>
        </div>
      </div>
    </div>
  );
}