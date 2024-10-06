import React, { useEffect, useState } from 'react';
import TaskFilter from '../components/TaskFilter';
import TaskList from '../components/TaskList';
import { Task } from '../types/types';

const ApiUrl=process.env.REACT_APP_API_URL;
const TaskManagement: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState({});

  const fetchTasks = React.useCallback(async () => {
    const response = await fetch(`${ApiUrl}/api/offboarding/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters)
    });
    const data = await response.json();
    setTasks(data);
  }, [filters]);
  
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="task-management">
      <h1>Task Management</h1>
      <TaskFilter onFilterChange={setFilters} />
      <TaskList tasks={tasks} onTaskUpdate={fetchTasks} />
    </div>
  );
};
export default TaskManagement;