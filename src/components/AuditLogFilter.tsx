import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

interface FilterParams {
  startDate: string;
  endDate: string;
  action: string;
}

interface Props {
  onFilterChange: (filters: FilterParams) => void;
}

const AuditLogFilter: React.FC<Props> = ({ onFilterChange }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [action, setAction] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ startDate, endDate, action });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="align-items-end">
        <Col md={3} className="mb-3">
          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3} className="mb-3">
          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3} className="mb-3">
          <Form.Group controlId="action">
            <Form.Label>Action</Form.Label>
            <Form.Control
              type="text"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              placeholder="Enter action"
            />
          </Form.Group>
        </Col>
        <Col md={3} className="mb-3">
          <Button variant="primary" type="submit">
            Apply Filters
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AuditLogFilter;
