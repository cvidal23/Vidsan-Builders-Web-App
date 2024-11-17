import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectHeader } from './ProjectHeader';
import { ProjectTabs, ProjectTab } from './ProjectTabs';
import CostBreakdown from './CostBreakdown';
import { ChangeOrders } from './ChangeOrders';
import { Payments } from './Payments';
import { ProjectSchedule } from './ProjectSchedule';
import { ProjectInvoices } from './ProjectInvoices';
import { Subcontractors } from './Subcontractors';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<ProjectTab>('cost-breakdown');

  if (!id) return null;

  return (
    <div>
      {/* Project header and tabs */}
      <ProjectHeader projectId={id} />
      <ProjectTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Tab content */}
      <div className="mt-6 rounded-lg bg-[#232830] shadow">
        {activeTab === 'cost-breakdown' && <CostBreakdown projectId={id} />}
        {activeTab === 'change-orders' && <ChangeOrders projectId={id} />}
        {activeTab === 'payments' && <Payments projectId={id} />}
        {activeTab === 'schedule' && <ProjectSchedule projectId={id} />}
        {activeTab === 'invoices' && <ProjectInvoices projectId={id} />}
        {activeTab === 'subcontractors' && <Subcontractors projectId={id} />}
      </div>
    </div>
  );
}