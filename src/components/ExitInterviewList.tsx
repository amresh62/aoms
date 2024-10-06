import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { ExitInterview } from '../types/types';

interface Props {
  interviews: ExitInterview[];
  onUpdate: (interview: ExitInterview) => void;
  id: (id: number) => void;
}

const ExitInterviewList: React.FC<Props> = ({ interviews, onUpdate, id }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Scheduled At</th>
          <th>Conducted At</th>
          <th>Conducted By</th>
          <th>Feedback</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {interviews.map((interview) => (
          <tr key={interview.id}>
            <td>{interview.scheduledAt ? new Date(interview.scheduledAt).toLocaleString() : 'Not scheduled'}</td>
            <td>{interview.conductedAt ? new Date(interview.conductedAt).toLocaleString() : 'Not conducted'}</td>
            <td>{interview.conductedBy ? `${interview.conductedBy.firstName} ${interview.conductedBy.lastName}` : 'Not assigned'}</td>
            <td>{interview.feedback ? interview.feedback : 'Not Updated'}</td>
            <td>
              {/* <Button variant="primary" size="sm" onClick={() => onUpdate(interview)}>Update</Button> */}
              {interview.id && (
                <Button variant="secondary" size="sm" onClick={() => id(interview.id)}>Select</Button>
              )}
            </td>
          </tr>
        ))}

      </tbody>
    </Table>
  );
};

export default ExitInterviewList;
