import React, { useState } from 'react';
import { Employee, ExitInterview } from '../types/types';

interface Props {
  onClose: () => void;
  onSchedule: (interview: ExitInterview) => void;
}

const ScheduleInterviewModal: React.FC<Props> = ({ onClose, onSchedule }) => {
  const [scheduledAt, setScheduledAt] = useState('');
  const [conductedBy, setConductedBy] = useState<Employee | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInterview: ExitInterview = {
      id: 0,
      offboardingProcess: { id: 0 } as any,
      scheduledAt,
      conductedAt: null,
      feedback: null,
      conductedBy
    };
    onSchedule(newInterview);
    onClose();
  };

  return (
    <div className="modal">
      <h2>Schedule Exit Interview</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          required
        />
        {/* Add a dropdown or input for selecting conductedBy */}
        <button type="submit">Schedule</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default ScheduleInterviewModal;