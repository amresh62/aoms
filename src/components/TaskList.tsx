import React from 'react';
import { Task } from '../types/types';
import TaskItem from './TaskItem';

interface Props {
  tasks: Task[] | null | undefined;
  onTaskUpdate: (taskId: number) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onTaskUpdate }) => {
  if (!tasks || !Array.isArray(tasks)) {
    return <p>No tasks available.</p>;
  }

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onUpdate={() => onTaskUpdate(task.id)}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
