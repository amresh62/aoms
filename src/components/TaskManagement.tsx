import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import TaskFilter from '../components/TaskFilter';
import TaskList from '../components/TaskList';
import { Department, Task, TaskStatus } from '../types/types';

const ApiUrl = process.env.REACT_APP_API_URL;

interface FilterState {
  status: TaskStatus | '';
  department: Department | '';
  assignedTo: string;
}

const TaskManagement: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    status: '',
    department: '',
    assignedTo: '',
  });

  const fetchTasks = useCallback(async () => {
    const response = await fetch(`${ApiUrl}/api/offboarding/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
    });
    const data = await response.json();
    setTasks(data);
  }, [filters]);
  
  
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <Container className="task-management mt-4">
      <Row>
        <Col>
          <h1 className="mb-4">Task Management</h1>
          <TaskFilter onFilterChange={handleFilterChange} />
          <TaskList tasks={tasks} onTaskUpdate={fetchTasks} />
        </Col>
      </Row>
    </Container>
  );
};

export default TaskManagement;
