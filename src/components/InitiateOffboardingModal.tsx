import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Department, Employee } from '../types/types';
import { fetchWithCredentials } from '../utils/api';



interface Props {
  show: boolean;
  onClose: () => void;
  onInitiate: () => void;
}

const InitiateOffboardingModal: React.FC<Props> = ({ show, onClose, onInitiate }) => {
  const [employee, setEmployee] = useState<Employee>({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    department: Department.HR
  });
  const [lastWorkingDate, setLastWorkingDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetchWithCredentials(`/api/offboarding/initiate?lastWorkingDate=${lastWorkingDate}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
      });
      
      if (response.ok) {
        onInitiate();
        onClose();
      }
    } catch (error) {
      console.error('Error initiating offboarding:', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Initiate Offboarding</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={employee.firstName}
                  onChange={(e) => setEmployee({ ...employee, firstName: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={employee.lastName}
                  onChange={(e) => setEmployee({ ...employee, lastName: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={employee.email}
              onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Select
              value={employee.department}
              onChange={(e) => setEmployee({ ...employee, department: e.target.value as Department })}
            >
              {Object.values(Department).map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Working Date</Form.Label>
            <Form.Control
              type="date"
              value={lastWorkingDate}
              onChange={(e) => setLastWorkingDate(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Initiate Offboarding
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InitiateOffboardingModal;
