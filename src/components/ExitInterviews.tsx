import React, { useEffect, useState } from 'react';
import ExitInterviewList from '../components/ExitInterviewList';
import ScheduleInterviewModal from '../components/ScheduleInterviewModal';
import { ExitInterview } from '../types/types';

const ApiUrl=process.env.REACT_APP_API_URL;
const ExitInterviews: React.FC = () => {
  const [interviews, setInterviews] = useState<ExitInterview[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchExitInterviews();
  }, []);

  const fetchExitInterviews = async () => {
    const response = await fetch(`${ApiUrl}/api/offboarding/exit-interviews`);
    const data = await response.json();
    setInterviews(data);
  };

  return (
    <div className="exit-interviews">
      <h1>Exit Interviews</h1>
      <button onClick={() => setShowModal(true)}>Schedule New Interview</button>
      <ExitInterviewList interviews={interviews} onUpdate={fetchExitInterviews} />
      {showModal && <ScheduleInterviewModal onClose={() => setShowModal(false)} onSchedule={fetchExitInterviews} />}
    </div>
  );
};

export default ExitInterviews;