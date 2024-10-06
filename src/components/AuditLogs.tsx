import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { AuditLog } from '../types/types';
import AuditLogFilter from './AuditLogFilter';
import AuditLogList from './AuditLogList';

const ApiUrl = process.env.REACT_APP_API_URL;

const AuditLogs: React.FC = () => {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [filters, setFilters] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAuditLogs = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`${ApiUrl}/api/audit-logs`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        startDate: (filters as any).startDate ? new Date((filters as any).startDate).toISOString() : null,
                        endDate: (filters as any).endDate ? new Date((filters as any).endDate).toISOString() : null,
                        action: (filters as any).action
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch audit logs');
                }
                const data = await response.json();
                setLogs(Array.isArray(data) ? data : []);
            } catch (err) {
                setError('An error occurred while fetching audit logs');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }; fetchAuditLogs();
    }, [filters]);

    return (
        <Card>
            <Card.Header>
                <h2 className='text-primary'>
                    Audit Logs
                </h2>
            </Card.Header>
            <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                    <AuditLogFilter onFilterChange={setFilters} />
                    {isLoading && <p>Loading...</p>}
                    {error && <p className="text-danger">{error}</p>}
                    {!isLoading && !error && <AuditLogList logs={logs} />}
                </Card.Text>
            </Card.Body>
        </Card>


    );
};

export default AuditLogs;
