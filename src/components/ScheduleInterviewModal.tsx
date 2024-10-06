import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ExitInterview } from '../types/types';

interface Props {
  show: boolean;
  onHide: () => void;
  onSchedule: (interview: ExitInterview) => void;
  id: number;
}

const ApiUrl = process.env.REACT_APP_API_URL;

const ScheduleInterviewModal: React.FC<Props> = ({ show, onHide, onSchedule, id }) => {
  const [conductedBy, setConductedBy] = useState('');
  const [conductedAt, setConductedAt] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setConductedBy("amresh.sinha@example.com");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) {
      console.error('No offboarding process selected');
      return;
    }
    try {
      const response = await fetch(`${ApiUrl}/api/offboarding/exit-interview/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id,feedback,conductedAt}),
      });
      if (response.ok) {
        const updatedInterviewData = await response.json();
        onSchedule(updatedInterviewData);
        onHide();
      } else {
        console.error('Error updating interview:', await response.text());
        // Handle error (e.g., show error message to user)
      }
    } catch (error) {
      console.error('Error updating interview:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Exit Interview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Conducted Date and Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={conductedAt}
              onChange={(e) => setConductedAt(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Feedback</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </Form.Group>
          {/* Add a dropdown or input for selecting conductedBy */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Update Interview</Button>
      </Modal.Footer>
    </Modal>
  );
};export default ScheduleInterviewModal;
