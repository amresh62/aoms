import React from 'react';

const Unauthorized: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1>Unauthorized Access</h1>
      <p>You do not have permission to view this page.</p>
    </div>
  );
};

export default Unauthorized;