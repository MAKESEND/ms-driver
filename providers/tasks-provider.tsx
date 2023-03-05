import { createContext, useContext } from 'react';

// TODO: create either pickup or dropoff task context
type Task = any;
type Tasks = Task[];

export const TasksContext = createContext<
  [tasks: Tasks, setTasks: React.Dispatch<React.SetStateAction<Tasks>>] | null
>(null);

export const useTasks = () => {
  const ctx = useContext(TasksContext);

  if (!ctx) throw new Error('useTasks can only be used in TasksProvider');

  return ctx;
};
