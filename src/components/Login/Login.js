import React, { useContext, useRef } from 'react';
import { Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth-conext';

const Login = () => {
  const { login, error, isLoading } = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    login(enteredEmail, enteredPassword);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center">Log In</h2>
          <div className="text-center">
            {error && <Alert variant="danger">{error}</Alert>}
            {isLoading && <Spinner animation="grow" />}
          </div>
          <Form onSubmit={submitHandler}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>
            <Form.Group id="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} />
            </Form.Group>
            <Button className="w-100" type="submit">
              Log In
            </Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mb-3">
          <Link to="/forgot">Forgot Password?</Link>
        </div>
      </Card>
      <div className="w-100 text-center mt-3">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
