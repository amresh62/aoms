import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OffboardingItem from '../../components/OffboardingItem';
import { OffboardingProcess } from '../../types/types';

const OffboardingItemPage: React.FC = () => {
  const [proces, setProces] = useState<OffboardingProcess | null>(null);
  const { id } = useParams<{ id: string }>();
  const ApiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchOffboardingProcess = async () => {
      try {
        const response = await fetch(`${ApiUrl}/api/offboarding/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProces(data);
        } else {
          console.error('Failed to fetch offboarding process');
        }
      } catch (error) {
        console.error('Error fetching offboarding process:', error);
      }
    };

    fetchOffboardingProcess();
  }, [ApiUrl, id]);

  if (!proces) {
    return <div>Loading...</div>;
  }

  return <OffboardingItem process={proces} />;
};
export default OffboardingItemPage;
