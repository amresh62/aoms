import React, { useState } from 'react';
import { Department, TaskStatus } from '../types/types';

interface Props {
  onFilterChange: (filters: any) => void;
}

const TaskFilter: React.FC<Props> = ({ onFilterChange }) => {
  const [status, setStatus] = useState<TaskStatus | ''>('');
  const [department, setDepartment] = useState<Department | ''>('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ status, department, assignedTo });
  };

  return (
    <form onSubmit={handleSubmit} className="task-filter">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
      >
        <option value="">All Statuses</option>
        {Object.values(TaskStatus).map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value as Department)}
      >
        <option value="">All Departments</option>
        {Object.values(Department).map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Assigned To"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      />
      <button type="submit">Apply Filters</button>
    </form>
  );
};

export default TaskFilter;