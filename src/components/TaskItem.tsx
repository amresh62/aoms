import React from 'react';
import { Task, TaskStatus } from '../types/types';

const ApiUrl=process.env.REACT_APP_API_URL;
interface Props {
  task: Task;
  onUpdate: () => void;
}

const TaskItem: React.FC<Props> = ({ task, onUpdate }) => {
  const handleStatusChange = async (newStatus: TaskStatus) => {
    try {
      const response = await fetch(`${ApiUrl}/api/offboarding/task/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        onUpdate();
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="task-item">
      <h3>{task.name}</h3>
      <p>Status: {task.status}</p>
      <p>Department: {task.department}</p>
      {task.assignedTo && <p>Assigned to: {task.assignedTo.firstName} {task.assignedTo.lastName}</p>}
      <select 
        value={task.status} 
        onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
      >
        {Object.values(TaskStatus).map((status: TaskStatus) => (
          <option key={status.toString()} value={status}>{status}</option>
        ))}
      </select>
    </div>
  );
};

export default TaskItem;
