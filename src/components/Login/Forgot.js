import React, { useContext, useRef, useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth-conext';

const Forgot = () => {
  const { forgotPassword, error } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const emailRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;

    try {
      await forgotPassword(enteredEmail);
      setMessage('Check inbox for further update!');
    } catch (error) {
      console.log(error);
      setMessage('');
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center">Reset Password</h2>
          {error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Alert variant="success">{message}</Alert>
          )}

          <Form onSubmit={submitHandler}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control className="mb-2" type="email" ref={emailRef} />
            </Form.Group>
            <Button className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-3">
        <Link to="/login">Login</Link>
      </div>
    </>
  );
};

export default Forgot;
