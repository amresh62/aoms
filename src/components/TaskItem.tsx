import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Task, TaskStatus } from '../types/types';
import { fetchWithCredentials } from '../utils/api';


interface Props {
  task: Task;
  onUpdate: () => void;
}

const TaskItem: React.FC<Props> = ({ task, onUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>(task.status as TaskStatus);

  const handleStatusChange = async (newStatus: TaskStatus) => {
    try {
      const response = await fetchWithCredentials(`/api/offboarding/task/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStatus)
      });
      if (response.ok) {
        onUpdate();
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleUpdateClick = () => {
    handleStatusChange(selectedStatus);
  };

  return (
    <Card className="task-item mb-3">
      <Card.Body>
        <Card.Title>{task.name}</Card.Title>
        <Card.Text>
          <strong>Status:</strong> {task.status}<br />
          <strong>Department:</strong> {task.department}<br />
          {task.assignedTo && <><strong>Assigned to:</strong> {task.assignedTo.firstName} {task.assignedTo.lastName}<br /></>}
        </Card.Text>
        <Form.Select 
          value={selectedStatus} 
          onChange={(e) => setSelectedStatus(e.target.value as TaskStatus)}
          className="mb-2"
        >
          {Object.values(TaskStatus).map((status: TaskStatus) => (
            <option key={status.toString()} value={status}>{status}</option>
          ))}
        </Form.Select>
        <Button variant="primary" onClick={handleUpdateClick}>Update</Button>
      </Card.Body>
    </Card>
  );
};

export default TaskItem;
