import React from 'react';
import { Card } from 'react-bootstrap';
import { Task } from '../types/types';

interface Props {
  tasks: Task[];
}

const TaskSummary: React.FC<Props> = ({ tasks }) => {
  const countByStatus = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card style={{ width: '18rem', marginRight: '1rem' }}>
      <Card.Body>
        <Card.Title>
          <h4 className='text-primary'>Task</h4>
          </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Summary</Card.Subtitle>
        <Card.Text>
        {Object.entries(countByStatus).map(([status, count]) => (
        <div key={status}>
          <span>{status}: </span>
          <span>{count}</span>
        </div>
      ))}
        </Card.Text>
      </Card.Body>
    </Card>
    
  );
};

export default TaskSummary;