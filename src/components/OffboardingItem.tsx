import React from 'react';
import { OffboardingProcess } from '../types/types';
import TaskList from './TaskList';

interface Props {
  process: OffboardingProcess;
}

const OffboardingItem: React.FC<Props> = ({ process }) => {
  return (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="mb-0">{process.employee.firstName} {process.employee.lastName}</h2>
        <span className={`badge badge-${process.status.toLowerCase() === 'completed' ? 'success' : 'warning'}`}>{process.status}</span>
      </div>
      <div className="card-body">
        <div className="row mb-4">
          <div className="col-md-3">
            <strong>Department:</strong> {process.employee.department}
          </div>
          <div className="col-md-3">
            <strong>Position:</strong> {process.employee.department}
          </div>
          <div className="col-md-3">
            <strong>Initiation Date:</strong> {new Date(process.initiationDate).toLocaleDateString()}
          </div>
          <div className="col-md-3">
            <strong>Last Working Date:</strong> {new Date(process.lastWorkingDate).toLocaleDateString()}
          </div>
        </div>
        <div className="task-section">
          <TaskList tasks={process.tasks} onTaskUpdate={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default OffboardingItem;
