import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth-conext';

const Dashboard = () => {
  const {
    logout,
    currentUser: { email },
  } = useContext(AuthContext);
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-3">Profile</h2>
          <h1 className="text-center">Welcome {email}</h1>
          <div className="text-center w-100 mt-3">
            <Link to="/update-profile">profile update</Link>
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
