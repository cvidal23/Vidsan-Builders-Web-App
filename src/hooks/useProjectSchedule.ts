import { useQuery } from '@tanstack/react-query';

interface ScheduleEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
}

const mockEvents: ScheduleEvent[] = [
  {
    id: '1',
    title: 'Foundation Work',
    start: '2024-03-20T09:00:00',
    end: '2024-03-25T17:00:00',
    description: 'Laying foundation and initial concrete work',
  },
  // Add more mock events as needed
];

export function useProjectSchedule(projectId: string) {
  const { data: events = mockEvents, isLoading, error } = useQuery({
    queryKey: ['projectSchedule', projectId],
    queryFn: async () => {
      // In production, this would fetch from Firebase
      return mockEvents;
    },
  });

  return { events, isLoading, error };
}