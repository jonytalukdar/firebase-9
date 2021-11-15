import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-3">Profile</h2>
          <h1 className="text-center">Welcome to dashboard</h1>
        </Card.Body>
      </Card>
      <div className="text-center w-100 mt-3">
        <Button variant="link">Log Out</Button>
      </div>
    </>
  );
};

export default Dashboard;
