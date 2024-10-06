import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import ExitInterviewList from '../components/ExitInterviewList';
import ScheduleInterviewModal from '../components/ScheduleInterviewModal';
import { ExitInterview } from '../types/types';

const ApiUrl = process.env.REACT_APP_API_URL;
const ExitInterviews: React.FC = () => {
  const [interviews, setInterviews] = useState<ExitInterview[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOffboardingProcessId, setSelectedOffboardingProcessId] = useState<number | null>(null);

  useEffect(() => {
    fetchExitInterviews();
  }, []);

  const fetchExitInterviews = async () => {
    const response = await fetch(`${ApiUrl}/api/offboarding/exit-interviews`);
    const data = await response.json();
    console.log(data);
    setInterviews(data);
    if (data.length > 0 && data[0].offboardingProcess && data[0].offboardingProcess.id) {
      setSelectedOffboardingProcessId(data[0].offboardingProcess.id);
    }
  };
  

  const handleScheduleInterview = () => {
    if (selectedOffboardingProcessId) {
      setShowModal(true);
    } else {
      alert("Please select an Interview first.");
    }
  };

  return (
    <Card>
      <Card.Header>
        <h2 className='text-primary'>Exit Interviews</h2>
      </Card.Header>
      <Card.Body>
        <Button variant="primary" onClick={handleScheduleInterview} className="mb-3">Update Feedback</Button>
        <ExitInterviewList 
          interviews={interviews} 
          onUpdate={fetchExitInterviews}
          id={setSelectedOffboardingProcessId}
        />
        {selectedOffboardingProcessId && (
          <ScheduleInterviewModal 
            show={showModal} 
            onHide={() => setShowModal(false)} 
            onSchedule={fetchExitInterviews} 
            id={selectedOffboardingProcessId}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default ExitInterviews;
