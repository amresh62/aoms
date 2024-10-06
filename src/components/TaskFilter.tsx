import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Department, TaskStatus } from '../types/types';

interface FilterState {
  status: TaskStatus | '';
  department: Department | '';
  assignedTo: string;
}

interface Props {
  onFilterChange: (filters: FilterState) => void;
}

const TaskFilter: React.FC<Props> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    status: '',
    department: '',
    assignedTo: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <Form onSubmit={handleSubmit} className="task-filter mb-4">
      <Row>
        <Col md={3}>
          <Form.Select
            name="status"
            value={filters.status}
            onChange={handleInputChange}
          >
            <option value="">All Statuses</option>
            {Object.values(TaskStatus).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            name="department"
            value={filters.department}
            onChange={handleInputChange}
          >
            <option value="">All Departments</option>
            {Object.values(Department).map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Control
            type="text"
            name="assignedTo"
            placeholder="Assigned To"
            value={filters.assignedTo}
            onChange={handleInputChange}
          />
        </Col>
        <Col md={3}>
          <Button type="submit" variant="primary">Apply Filters</Button>
        </Col>
      </Row>
    </Form>
  );
};
export default TaskFilter;
