import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Task } from '../types/types';
import TaskItem from './TaskItem';

interface Props {
  tasks: Task[] | null | undefined;
  onTaskUpdate: (taskId: number) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onTaskUpdate }) => {
  if (!tasks || !Array.isArray(tasks)) {
    return <p className="text-center">No tasks available.</p>;
  }

  return (
    <Container className="task-list">
      <Row>
        <Col>
          <h2 className="mb-4">Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-center">No tasks found.</p>
          ) : (
            tasks.map(task => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onUpdate={() => onTaskUpdate(task.id)}
              />
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TaskList;
