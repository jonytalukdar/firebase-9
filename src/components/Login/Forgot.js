import React, { useContext, useRef, useState } from 'react';
import { Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth-conext';

const Forgot = () => {
  const { forgotPassword, error, isLoading } = useContext(AuthContext);

  const emailRef = useRef();
  const [message, setMessage] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setMessage('');
      await forgotPassword(emailRef.current.value);
      setMessage('Check your inbox to further update!');
    } catch {
      setMessage('');
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center">Reset Password</h2>

          <div className="text-center">
            {error ? (
              <Alert variant="danger">{error}</Alert>
            ) : (
              <Alert show={message ? true : false} variant="success">
                {message}
              </Alert>
            )}
            {isLoading && <Spinner animation="grow" />}
          </div>

          <Form onSubmit={submitHandler}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control className="mb-3" type="email" ref={emailRef} />
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
