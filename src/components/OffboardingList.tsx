import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InitiateOffboardingModal from '../components/InitiateOffboardingModal';
import OffboardingItem from '../components/OffboardingItem';
import { OffboardingProcess } from '../types/types';
const ApiUrl = process.env.REACT_APP_API_URL;
const OffboardingList: React.FC = () => {
    const [processes, setProcesses] = useState<OffboardingProcess[]>([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchOffboardingProcesses();
    }, []);

    const fetchOffboardingProcesses = async () => {
        const response = await fetch(`${ApiUrl}/api/offboarding`);
        const data = await response.json();
        setProcesses(data);
    };

    return (
        <div className="offboarding-list">
            <h1>Offboarding Processes</h1>
            <button onClick={() => setShowModal(true)}>Initiate New Offboarding</button>
            {processes.map(process => (
                <Link key={process.id} to={`/offboarding/${process.id}`}>
                    <OffboardingItem process={process} />
                </Link>
            ))}
            {showModal && <InitiateOffboardingModal onClose={() => setShowModal(false)} onInitiate={fetchOffboardingProcesses} />}
        </div>
    );
};

export default OffboardingList;
