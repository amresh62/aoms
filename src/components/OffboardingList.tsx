import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OffboardingProcess } from '../types/types';
import InitiateOffboardingModal from './InitiateOffboardingModal';

const ApiUrl = process.env.REACT_APP_API_URL;

const OffboardingList: React.FC = () => {
    const [processes, setProcesses] = useState<OffboardingProcess[]>([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const fetchOffboardingProcesses = useCallback(async () => {
        try {
            const response = await fetch(`${ApiUrl}/api/offboarding`);
            const data = await response.json();
            setProcesses(data);
        } catch (error) {
            console.error('Error fetching offboarding processes:', error);
        }
    }, []);

    useEffect(() => {
        fetchOffboardingProcesses();
    }, [fetchOffboardingProcesses]);

    const handleRowClick = (id: string) => {
        navigate(`/offboarding/${id}`);
    };

    const handleInitiateOffboarding = () => {
        console.log('Initiate Offboarding clicked');
        setShowModal(true);
        console.log('Show modal:', showModal);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInitiateSuccess = () => {
        setShowModal(false);
        fetchOffboardingProcesses();
    };

    return (
        <div className="container mt-4">
            
            <button className="btn btn-primary mb-3" onClick={handleInitiateOffboarding}>Initiate New Offboarding</button>
            <table className="table table-hover table-bordered table-warning">
                <thead className="thead-light">
                    <tr>
                        <th>Employee Name</th>
                        <th>Status</th>
                        <th>Start Date</th>
                        <th>Last Working Date</th>
                    </tr>
                </thead>
                <tbody>
                    {processes.map(process => (
                        <tr key={process.id} onClick={() => handleRowClick(process.id.toString())} style={{cursor: 'pointer'}}>
                            <td>{process.employee.firstName} {process.employee.lastName}</td>
                            <td>{process.status}</td>
                            <td>{new Date(process.initiationDate).toLocaleDateString()}</td>
                            <td>{new Date(process.lastWorkingDate).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && <InitiateOffboardingModal show={showModal} onClose={handleCloseModal} onInitiate={handleInitiateSuccess} />}
        </div>
    );
};
export default OffboardingList;
