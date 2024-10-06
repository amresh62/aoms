import React from 'react';
import { ExitInterview } from '../types/types';

interface Props {
  interviews: ExitInterview[];
  onUpdate: (interview: ExitInterview) => void;
}

const ExitInterviewList: React.FC<Props> = ({ interviews, onUpdate }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Scheduled At</th>
          <th>Conducted At</th>
          <th>Conducted By</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {interviews.map((interview) => (
          <tr key={interview.id}>
            <td>{new Date(interview.scheduledAt).toLocaleString()}</td>
            <td>{interview.conductedAt ? new Date(interview.conductedAt).toLocaleString() : 'Not conducted'}</td>
            <td>{interview.conductedBy ? `${interview.conductedBy.firstName} ${interview.conductedBy.lastName}` : 'Not assigned'}</td>
            <td>
              <button onClick={() => onUpdate(interview)}>Update</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExitInterviewList;