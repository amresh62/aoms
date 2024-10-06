import React, { useEffect, useState } from 'react';
import AuditLogFilter from '../components/AuditLogFilter';
import AuditLogList from '../components/AuditLogList';
import { AuditLog } from '../types/types';

const ApiUrl = process.env.REACT_APP_API_URL;

const AuditLogs: React.FC = () => {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        const fetchAuditLogs = async () => {
            const response = await fetch(`${ApiUrl}/api/audit-logs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filters)
            });
            const data = await response.json();
            setLogs(data);
        };

        fetchAuditLogs();
    }, [filters]);

    return (
        <div className="audit-logs">
            <h1>Audit Logs</h1>
            <AuditLogFilter onFilterChange={setFilters} />
            <AuditLogList logs={logs} />
        </div>
    );
};
export default AuditLogs;