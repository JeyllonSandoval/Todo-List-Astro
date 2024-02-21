import { API_URL } from '@/services/API';
import type { Task } from '@/types/Task';

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: Task[] = await res.json();
  return data;
}