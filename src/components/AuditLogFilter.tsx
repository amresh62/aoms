import React, { useState } from 'react';

interface Props {
  onFilterChange: (filters: any) => void;
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
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        placeholder="Start Date"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        placeholder="End Date"
      />
      <input
        type="text"
        value={action}
        onChange={(e) => setAction(e.target.value)}
        placeholder="Action"
      />
      <button type="submit">Apply Filters</button>
    </form>
  );
};

export default AuditLogFilter;