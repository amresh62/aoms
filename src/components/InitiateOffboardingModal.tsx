import React, { useState } from 'react';
import { Department, Employee } from '../types/types';

const ApiUrl=process.env.REACT_APP_API_URL;

interface Props {
  onClose: () => void;
  onInitiate: () => void;
}

const InitiateOffboardingModal: React.FC<Props> = ({ onClose, onInitiate }) => {
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
      const response = await fetch(`${ApiUrl}/api/offboarding/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employee, lastWorkingDate })
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
    <div className="modal">
      <h2>Initiate Offboarding</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={employee.firstName}
          onChange={(e) => setEmployee({ ...employee, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={employee.lastName}
          onChange={(e) => setEmployee({ ...employee, lastName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={employee.email}
          onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
        />
        <select
          value={employee.department}
          onChange={(e) => setEmployee({ ...employee, department: e.target.value as Department })}
        >
          {Object.values(Department).map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <input
          type="date"
          value={lastWorkingDate}
          onChange={(e) => setLastWorkingDate(e.target.value)}
        />
        <button type="submit">Initiate Offboarding</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default InitiateOffboardingModal;