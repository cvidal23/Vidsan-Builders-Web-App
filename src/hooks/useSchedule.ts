import { useQuery } from '@tanstack/react-query';

interface ScheduleEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  projectId?: string;
}

const mockEvents: ScheduleEvent[] = [
  {
    id: '1',
    title: 'Project Planning Meeting',
    start: '2024-03-20T09:00:00',
    end: '2024-03-20T10:30:00',
    description: 'Initial planning meeting for new project',
    projectId: '1',
  },
  // Add more mock events as needed
];

export function useSchedule() {
  const { data: events = mockEvents, isLoading, error } = useQuery({
    queryKey: ['schedule'],
    queryFn: async () => {
      // In production, this would fetch from Firebase
      return mockEvents;
    },
  });

  return { events, isLoading, error };
}