import React from 'react';
import { Link } from 'react-router-dom';
import { OffboardingProcess } from '../types/types';
import TaskList from './TaskList';

interface Props {
  process: OffboardingProcess;
}

const OffboardingItem: React.FC<Props> = ({ process }) => {
  return (
    <div className="offboarding-item">
      <h3>{process.employee.firstName} {process.employee.lastName}</h3>
      <p>Status: {process.status}</p>
      <p>Initiation Date: {process.initiationDate}</p>
      <p>Last Working Date: {process.lastWorkingDate}</p>
      <TaskList tasks={process.tasks} onTaskUpdate={() => {}} />
      <Link to={`/offboarding/${process.id}`}>View Details</Link>
    </div>
  );
};

export default OffboardingItem;
