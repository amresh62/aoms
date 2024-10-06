import React from 'react';
import { Card } from 'react-bootstrap';
import { OffboardingProcess } from '../types/types';

interface Props {
  processes: OffboardingProcess[];
}

const OffboardingSummary: React.FC<Props> = ({ processes }) => {
  const countByStatus = processes.reduce((acc, process) => {
    acc[process.status] = (acc[process.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card style={{ width: '18rem', marginRight: '1rem' }}>
      <Card.Body>
        <Card.Title>
        <h2 className='text-primary'>Offboarding</h2>
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

export default OffboardingSummary;