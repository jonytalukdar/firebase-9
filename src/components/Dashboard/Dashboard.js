import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth-conext';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-3">Profile</h2>
          <h1 className="text-center">Welcome to dashboard</h1>
          <div className="text-center w-100 mt-3">
            <Link to="/update">profile update</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="text-center w-100 mt-3">
        <Button variant="link" onClick={logout}>
          Log Out
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
