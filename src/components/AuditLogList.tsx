import React from 'react';
import { AuditLog } from '../types/types';

interface Props {
  logs: AuditLog[];
}

const AuditLogList: React.FC<Props> = ({ logs }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Action</th>
          <th>Performed By</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log.id}>
            <td>{new Date(log.timestamp).toLocaleString()}</td>
            <td>{log.action}</td>
            <td>{`${log.performedBy.firstName} ${log.performedBy.lastName}`}</td>
            <td>{log.details}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AuditLogList;