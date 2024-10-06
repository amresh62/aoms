import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import OffboardingSummary from '../components/OffboardingSummary';
import TaskSummary from '../components/TaskSummary';
import { OffboardingProcess, Task } from '../types/types';
import OffboardingList from './OffboardingList';

const ApiUrl = process.env.REACT_APP_API_URL;
const Dashboard: React.FC = () => {
  const [processes, setProcesses] = useState<OffboardingProcess[]>([]);
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchOffboardingProcesses();
    fetchPendingTasks();
  }, []);

  const fetchOffboardingProcesses = async () => {
    const response = await fetch(`${ApiUrl}/api/offboarding`);
    console.log(response);
    const data = await response.json();
    setProcesses(data);
  };

  const fetchPendingTasks = async () => {
    const response = await fetch(`${ApiUrl}/api/offboarding/tasks/pending`);
    const data = await response.json();
    setPendingTasks(data);
  };

  return (

    <Card>
      <Card.Header>
        <h2 className='text-primary'>
          Dashboard
        </h2>
      </Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text>
          <div className='d-flex justify-content-center p-2'>
          <OffboardingSummary processes={processes} />
          <TaskSummary tasks={pendingTasks} />
          </div>
          <hr></hr>
          <OffboardingList/>
        </Card.Text>
      </Card.Body>
    </Card>

  );
};

export default Dashboard;